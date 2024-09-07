'use client'
import { Box, Image, Button, Input, SimpleGrid, Stack, Text, Flex, Card, Grid, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { writeContract, waitForTransactionReceipt, readContract, multicall } from '@wagmi/core'
import { readFileSync } from 'fs'
import { useAccount, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'

import nftContract from '@/artifacts/nft-stake/KryptoPunks.sol/KryptoPunks.json'
import stakingContract from '@/artifacts/nft-stake/NFTStakingVault.sol/NFTStakingVault.json'
import { SEPOLIA_CHAIN_ID, WALLETCONNECT_CONFIG } from '@/utils/web3'
import IPFSupload from '@/utils/nftUplaod'
import { idInStake } from './util'
import {
  stakingContractAddress,
  nftContractAddress,
  ownerAddress,
  networkDeployedTo,
} from '@/constants/contracts-config'

const baseURI = 'ipfs://Qmf6eLbpEWqkr6ZF5hdK8kFEBgU6q34tj2SyNjivANBmMY'

const nftContractConfig = {
  abi: nftContract.abi,
  address: nftContractAddress,
}
const stakeContractConfig = {
  abi: stakingContract.abi,
  address: stakingContractAddress,
}

const NftStake = () => {
  const { address: accountAddress } = useAccount()

  const [info, setInfo] = useState({})
  const [userNfts, setUserNfts] = useState([])
  const [mintIng, setMintIng] = useState(false)
  const [mintAmount, setMintAmount] = useState(0)
  const [staking, setStaking] = useState(false)
  const [unStaking, setUnStaking] = useState(false)
  const [claiming, setClaiming] = useState(false)

  console.log('tokensOfOwner==', accountAddress)
  //获取信息
  const getInfo = async () => {
    const [totalSupplyRes, tokensOfOwnerRes, stakeTokensOfOwnerRes, totalRewardRes] = await multicall(
      WALLETCONNECT_CONFIG,
      {
        contracts: [
          {
            ...nftContractConfig,
            functionName: 'totalSupply',
          },
          {
            ...nftContractConfig,
            functionName: 'tokensOfOwner',
            args: [accountAddress],
          },
          {
            ...stakeContractConfig,
            functionName: 'tokensOfOwner',
            args: [accountAddress],
          },
          {
            ...stakeContractConfig,
            functionName: 'getTotalRewardEarned',
            args: [accountAddress],
          },
        ],
      }
    )
    console.log('res==', totalSupplyRes, totalSupplyRes, tokensOfOwnerRes, stakeTokensOfOwnerRes, totalRewardRes)

    const _totalSupply = Number(totalSupplyRes?.result)
    const _userNftIds = tokensOfOwnerRes?.result ?? []
    const _stakedNftIds = stakeTokensOfOwnerRes?.result ?? []
    const _totalReward = formatUnits(totalRewardRes?.result, 18)

    console.log(99, _totalSupply, _userNftIds, _stakedNftIds, _totalReward)

    setInfo({
      totalSupply: _totalSupply,
      tokensOfOwner: _userNftIds,
      stakedNftIds: _stakedNftIds,
      totalReward: _totalReward,
    })

    //根据不同的nft id，查找对应的图片信息，这里暂时写死
    const _userNfts = await Promise.all(
      [..._stakedNftIds, ..._userNftIds].map(async (nft) => {
        // const metadata = await axios.get(
        //   baseURI.replace("ipfs://", "https://ipfs.io/ipfs/") +
        //     "/" +
        //     nft.toString() +
        //     baseExtension
        // );
        return {
          id: nft,
          name: `图片标题：${nft}`,
          description: `图片描述：${nft}`,
          imgUrl: baseURI.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        }
      })
    )
    setUserNfts(_userNfts)
  }

  const handleMintAmountChange = (e) => {
    setMintAmount(e.target.value)
  }
  const handleNftMint = async () => {
    // 获取图片相关metadata信息
    // const fileContent = 'Hello, world!'
    // // 创建一个 File 对象
    // const file = new File([fileContent], 'hello.txt', {
    //   type: 'text/plain',
    //   lastModified: new Date(),
    // })
    // const metadata = await IPFSupload(
    //   {
    //     name: '',
    //     description: '',
    //     imgUri: baseURI,
    //   },
    //   file
    // )
    try {
      setMintIng(true)
      const hash = await writeContract(WALLETCONNECT_CONFIG, {
        abi: nftContract.abi,
        address: nftContractAddress,
        functionName: 'mint',
        args: [mintAmount],
      })
      const receipt = await waitForTransactionReceipt(WALLETCONNECT_CONFIG, { hash })
      console.log('receipt', receipt)

      if (receipt?.status == 'success') {
        console.log(receipt)
        setMintIng(false)
        getInfo()
      }
    } catch (error) {
      // wendy TODO  抛出错误信息
      console.log(error)
      setMintIng(false)
    }
  }
  const handleStake = async (id) => {
    // 进行approve

    try {
      setStaking(true)
      const approveHash = await writeContract(WALLETCONNECT_CONFIG, {
        ...nftContractConfig,
        functionName: 'approve',
        args: [stakingContractAddress, id],
      })
      const approveReceipt = await waitForTransactionReceipt(WALLETCONNECT_CONFIG, { hash: approveHash })
      console.log('approveReceipt==', approveReceipt)

      if (approveReceipt.status === 'success') {
        const hash = await writeContract(WALLETCONNECT_CONFIG, {
          ...stakeContractConfig,
          functionName: 'stake',
          args: [[id]],
        })
        const receipt = await waitForTransactionReceipt(WALLETCONNECT_CONFIG, { hash })
        console.log('receipt', receipt)
        if (receipt?.status == 'success') {
          console.log(receipt)
          setStaking(false)
          getInfo()
        }
      }
    } catch (error) {
      console.log(error)
      setStaking(false)
    }
  }
  const handleUnstake = async (id) => {
    try {
      setUnStaking(true)
      const hash = await writeContract(WALLETCONNECT_CONFIG, {
        ...stakeContractConfig,
        functionName: 'unstake',
        args: [[id]],
      })
      const receipt = await waitForTransactionReceipt(WALLETCONNECT_CONFIG, { hash })
      if (receipt?.status == 'success') {
        console.log(receipt)
        setUnStaking(false)
        getInfo()
      }
    } catch (error) {
      console.log(error)
      setUnStaking(false)
    }
  }
  const handleClaim = async (id) => {
    try {
      setClaiming(true)
      const hash = await writeContract(WALLETCONNECT_CONFIG, {
        ...stakeContractConfig,
        functionName: 'claim',
        args: [info.stakedNftIds],
      })
      const receipt = await waitForTransactionReceipt(WALLETCONNECT_CONFIG, { hash })
      if (receipt?.status == 'success') {
        console.log(receipt)
        setClaiming(false)
        getInfo()
      }
    } catch (error) {
      console.log(error)
      setClaiming(false)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  const InfoItem = ({ title, content }) => (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      shadow='md'
      bg='white'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <Text fontSize='xl' fontWeight='bold'>
        {title}
      </Text>
      <Text fontSize='lg' mt={2}>
        {content}
      </Text>
    </Box>
  )
  const ItemCard = ({ id, imgUrl, name, description }) => (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
      <img src={imgUrl} alt={name} boxSize='150px' objectFit='cover' />
      <Stack spacing={3} mt={3}>
        <Text fontWeight='bold' fontSize='lg'>
          {name}
        </Text>
        <Text>{description}</Text>
      </Stack>
      <Stack direction='row' spacing={2} mt={3}>
        {idInStake(id, info?.stakedNftIds) ? (
          <Button isLoading={unStaking} colorScheme='red' onClick={() => handleUnstake(id)}>
            Unstake
          </Button>
        ) : (
          <Button isLoading={staking} colorScheme='blue' onClick={() => handleStake(id)}>
            Stake
          </Button>
        )}
        <Button isLoading={claiming} colorScheme='green' onClick={() => handleClaim(id)}>
          Claim
        </Button>
      </Stack>
    </Box>
  )

  return (
    <div>
      <Flex width='100%'>
        {/* 左半侧：4个卡片 */}
        <Box flex='1' p={4} h='100%' overflowY='auto'>
          <VStack spacing={4} align='stretch' h='100%'>
            <InfoItem title='Minted Count' content={info?.totalSupply} />
            <InfoItem title='I Stake' content={info.stakedNftIds?.length} />
            <InfoItem title='Token Reward' content={info?.totalReward} />
          </VStack>
        </Box>
        {/* 右半侧：图片、描述、输入框和按钮 */}
        <Box flex='1' p={4} h='100%' display='flex' flexDirection='column' alignItems='center'>
          <img
            src='https://ipfs.io/ipfs/Qmf6eLbpEWqkr6ZF5hdK8kFEBgU6q34tj2SyNjivANBmMY'
            alt='Placeholder Image'
            mb={4}
          />
          <Text mb={4} textAlign='center'>
            This is a description of the image. It provides context and additional information.
          </Text>
          <Flex width='100%' maxWidth='md' mb={4}>
            <Input onChange={handleMintAmountChange} placeholder='Enter text here' flex='1' mr={2} />
            <Button isLoading={mintIng} onClick={handleNftMint} colorScheme='blue'>
              mint nft
            </Button>
          </Flex>
        </Box>
      </Flex>
      <div>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {userNfts.map((item, index) => (
            <ItemCard key={index} {...item} />
          ))}
        </SimpleGrid>
      </div>
    </div>
  )
}

export default NftStake
