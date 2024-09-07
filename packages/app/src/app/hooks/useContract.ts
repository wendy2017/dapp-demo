'use client'

import type { Abi } from 'viem'
// import { wagmiConfig } from '../config'
// wendy TODO contractAddress先写死
// import useNetworkData from './useNetworkData'
import { contractAbi, contractAddress } from '@/constants/index'
// wendy TODO  后续统一封装
// import { handleError } from '@/lib/utils/errors'
import { useReadContract, useWriteContract } from 'wagmi'
import type { Config, UseReadContractParameters, UseWriteContractParameters } from 'wagmi'

type UseContractReadParameters = Omit<UseReadContractParameters, 'abi' | 'address' | 'functionName' | 'args'>

export function useContractRead<T = unknown>(
  functionName: string,
  args: Array<any> = [],
  options?: UseContractReadParameters
) {
  //   const { contract } = useNetworkData()
  return useReadContract<Abi, string, Array<any>, Config, T>({
    abi: contractAbi as Abi,
    address: contractAddress,
    functionName: functionName,
    args,
    query: {} as any,
    ...options,
  })
}

type useContractWriteParameters = Pick<UseWriteContractParameters, 'mutation'>['mutation']

export function useContractWrite(functionName: string, options?: useContractWriteParameters) {
  //   const { contract } = useNetworkData()
  const { writeContractAsync, writeContract, ...rest } = useWriteContract({
    mutation: {
      onError: (error) => {
        // handleError(error)
      },
      onSettled: (data) => {
        console.log(data)
      },
      ...options,
    },
  })

  const write = async (args: Array<any> = []) => {
    await writeContractAsync({
      abi: contractAbi as Abi,
      address: contractAddress,
      args,
      functionName,
    })
  }
  return { write, ...rest }
}
