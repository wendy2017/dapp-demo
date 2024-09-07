'use client'
import {
  Button,
  Input,
  Card,
  CardBody,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import {
  stakeTokenAddress,
  rewardTokenAddress,
  stakeRewardAddress,
  stakeTokenAbi,
  stakeRewardAbi,
} from '@/constants/stakeReward'
import { formatUnits, parseUnits } from 'viem'
import { readContract, writeContract } from '@wagmi/core'
import { WALLETCONNECT_CONFIG } from '@/utils/web3'

const StakeReward = () => {
  const [approveAmount, setApproveAmout] = useState(0)
  const [stakeAmount, setStakeAmout] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [totalStakedTokens, setTotalStakedTokens] = useState(0)
  const [earnedReward, setEarnedReward] = useState(0)

  const { address: accountAddress } = useAccount()
  // 自定义钩子：读取合约总供应量
  const useRead = ({ address, abi, functionName, args }) => {
    const { data, error, isLoading } = useReadContract({
      address,
      abi,
      functionName,
      args,
    })
    return {
      data,
      error,
      isLoading,
    }
  }
  const useContractTransaction = ({ address, abi, functionName, args }) => {
    const { writeContract, isPending, data } = useWriteContract()
    console.log('dd==', address, abi, functionName, args)
    const execute = async () => {
      try {
        await writeContract({ address, abi, functionName, args })
      } catch (error) {
        console.log(error)
      }
    }
    return { execute, isPending, data }
  }

  const { data: stakeSupply } = useRead({
    address: stakeTokenAddress,
    abi: stakeTokenAbi,
    functionName: 'totalSupply',
  })
  const { data: rewardSupply } = useRead({
    address: rewardTokenAddress,
    abi: stakeTokenAbi,
    functionName: 'totalSupply',
  })

  const getStakedAmount = async () => {
    try {
      const result = await readContract(WALLETCONNECT_CONFIG, {
        address: stakeRewardAddress,
        abi: stakeRewardAbi,
        functionName: 'totalStakedTokens',
      })
      setTotalStakedTokens(result)
    } catch (error) {
      console.log(error)
    }
  }
  const getRewardAmount = async () => {
    try {
      const result = await readContract(WALLETCONNECT_CONFIG, {
        address: stakeRewardAddress,
        abi: stakeRewardAbi,
        functionName: 'rewards',
        args: [accountAddress],
      })
      console.log(777, accountAddress, result)
      setEarnedReward(formatUnits(result || 0, 18))
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = async () => {
    try {
      const tx = await writeContract(WALLETCONNECT_CONFIG, {
        address: stakeRewardAddress,
        abi: stakeRewardAbi,
        functionName: 'stake',
        args: [stakeAmount ? parseUnits(stakeAmount, 18) : 0], // 根据代币小数位数调整
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleStake = async () => {
    try {
      const tx = await writeContract(WALLETCONNECT_CONFIG, {
        address: stakeTokenAddress,
        abi: stakeTokenAbi,
        functionName: 'approve',
        args: [stakeRewardAddress, approveAmount ? parseUnits(approveAmount, 18) : 0], // 根据代币小数位数调整
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleWithdraw = async () => {
    try {
      const tx = await writeContract(WALLETCONNECT_CONFIG, {
        address: stakeRewardAddress,
        abi: stakeRewardAbi,
        functionName: 'withdrawStakedTokens',
        args: [withdrawAmount ? parseUnits(withdrawAmount, 18) : 0], // 根据代币小数位数调整
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleReward = async () => {
    try {
      const tx = await writeContract(WALLETCONNECT_CONFIG, {
        address: stakeRewardAddress,
        abi: stakeRewardAbi,
        functionName: 'getReward',
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStakedAmount()
    getRewardAmount()
  }, [])

  return (
    <div>
      <Card>
        <CardBody>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Staked Supply:</Text>
            <Text>{formatUnits(stakeSupply || 0, 18)}</Text>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Reward Supply:</Text>
            <Text>{formatUnits(rewardSupply || 0, 18)}</Text>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Staked Amount:</Text>
            <Text>{formatUnits(totalStakedTokens || 0, 18)}</Text>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Reward Rate:</Text>
            <Text>1e18</Text>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Earned Reward:</Text>
            <Text>{earnedReward}</Text>
          </Flex>
        </CardBody>
      </Card>

      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Stake</Tab>
          <Tab>Withdraw</Tab>
          <Tab>getReward</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex>
              <Input
                placeholder='approving'
                onChange={(e) => {
                  console.log(2222, e)
                  setApproveAmout(e.target.value)
                }}
              />
              <Button colorScheme='blue' onClick={handleApprove}>
                Approve
              </Button>
            </Flex>
            <Flex>
              <Input
                placeholder='staking'
                onChange={(e) => {
                  setStakeAmout(e.target.value)
                }}
              />
              <Button colorScheme='blue' onClick={handleStake}>
                stake
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex>
              <Input
                placeholder='withdraw'
                onChange={(e) => {
                  setWithdrawAmount(e.target.value)
                }}
              />
              <Button colorScheme='blue' onClick={handleWithdraw}>
                Withdraw{' '}
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex>
              <Button colorScheme='blue' onClick={handleReward}>
                get reward
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
export default StakeReward
