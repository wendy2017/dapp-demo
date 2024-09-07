'use client'

import { Input,Button,Table, Thead,Tbody,Th,Tr,Td, TableProps,Flex,Center,Box, Spacer } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { parseEther } from 'viem';
import { getBalance, readContract } from 'viem/actions';
import { useReadContract ,useBalance,useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi';
import { contractAddress,contractAbi } from './constants';


export default function ToDo() {
    const [msg, setMsg] = useState('')

    const { address, isConnected, chainId } = useAccount();
    const { data: balanceData } = useBalance({ address: contractAddress });


    const { data: hash, writeContract, writeContractAsync,isPending } = useWriteContract()
    const { isSuccess: isAddSuccess } = useWaitForTransactionReceipt({
        hash,
    })
  
    const {data:todoList,refetch}  = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getTodoList"
    })
    const handleAddTodo = async () => {
        console.log('add tood ')
        await writeContractAsync({
            address: contractAddress,
            abi: contractAbi,
            functionName: "published",
            args: [msg.trim()],
            value: parseEther("0.1"),

        })
    }
    const handleInputChange = (e) => {
        setMsg(e.target.value);
    }
   

    useEffect(() => {
        if (isAddSuccess) {
            refetch()
            refetchBalance()
        }
    },[isAddSuccess,refetch])

    return (
        <div>
            <div>合约账户余额：{balanceData?.formatted} {balanceData?.symbol}</div>
            <Flex>
                <Box p='2'>
                    <Input placeholder='请输入消息内容' value={msg}  onInput={handleInputChange}/>
                </Box>
                <Spacer />
                <Button onClick={handleAddTodo} colorScheme='blue'>添加TODO</Button>
            </Flex>
                           
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>编号</Th>
                    <Th>接收者</Th>
                    <Th isNumeric>待办事项</Th>
                </Tr>
                </Thead>
                <Tbody> 
                    {
                        todoList?.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.id}</Td>
                                <Td>{item.author}</Td>
                                <Td>{item.message}</Td>
                            </Tr>
                        ))
                    }
                
                </Tbody>
            
            </Table>


            
        </div>
    )
}
