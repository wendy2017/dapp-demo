'use client'
import { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { contractAddress, contractAbi } from './constants'

export default function AddNumber() {
  const { address } = useAccount()
  const [writeCount, setWriteCount] = useState(0)

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isSuccess: isWriteSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: readCountData, refetch: refetchCount } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getCount',
  })

  const handleAddTransation = async () => {
    try {
      await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'setCount',
        account: address,
      })
    } catch (error) {
      console.error('Write failed:', error)
    }
  }
  useEffect(() => {
    if (readCountData) {
      setWriteCount(readCountData.toString())
    }
  }, [readCountData])

  useEffect(() => {
    if (isWriteSuccess) {
      refetchCount()
    }
  }, [isWriteSuccess, refetchCount])

  return (
    <div>
      <div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '24px',
          }}>
          count (
          <span
            style={{
              color: 'gray',
            }}>
            read Contract
          </span>
          ) :{writeCount ? Number(writeCount) : 0}
        </div>
        <div>
          <div
            style={{
              width: '200px',
              height: '50px',
              backgroundColor: '#0076F7',
              color: 'white',
              borderRadius: '20px',
              textAlign: 'center',
              lineHeight: '50px',
              fontSize: '14px',
              margin: '0 auto',
              cursor: 'pointer',
            }}
            onClick={handleAddTransation}>
            setCount
          </div>
        </div>
      </div>
    </div>
  )
}
