"use client";
import React from 'react'
import {contractAddresses,abi} from "../../../constants"
import { useWeb3Contract,useMoralis } from 'react-moralis'
import { useEffect ,useState} from 'react';
import {ethers} from "ethers"
//@ts-expect-error
import {useNotification} from "@web3uikit/core"
//@ts-expect-error
import {Bell} from "@web3uikit/icons"

export default function LotteryEntrance() {
    const {chainId:chainIdHex,isWeb3Enabled}=useMoralis()
    const chainId=parseInt(chainIdHex as string)
    const [entranceFee,setEntranceFee]=useState("0")
    const [numPlayers,setNumPlayers]=useState("0")
    const [recentWinner,setRecentWinner]=useState("0")
    const [raffleState,setRaffleState]=useState("0")
    //@ts-expect-error
    const raffleAddress=chainId in contractAddresses?contractAddresses[chainId][0]:null
    const dispatch = useNotification()


    const {runContractFunction:enterRaffle,isFetching,isLoading}=useWeb3Contract(
        {
            abi:abi,
            contractAddress:raffleAddress,
            functionName:"enterRaffle",
            params:{},
            msgValue:entranceFee
        }
    )



    const {runContractFunction:getEntranceFee}=useWeb3Contract(
        {
            abi:abi,
            contractAddress:raffleAddress,
            functionName:"getEntranceFee",
            params:{},
        }
    )

    const {runContractFunction:getNumberOfPlayers}=useWeb3Contract(
        {
            abi:abi,
            contractAddress:raffleAddress,
            functionName:"getNumberOfPlayers",
            params:{},
        }
    )

    const {runContractFunction:getRecentWinner}=useWeb3Contract(
        {
            abi:abi,
            contractAddress:raffleAddress,
            functionName:"getRecentWinner",
            params:{},
        }
    )

    const {runContractFunction:getRaffleState}=useWeb3Contract(
        {
            abi:abi,
            contractAddress:raffleAddress,
            functionName:"getRaffleState",
            params:{},
        }
    )

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: <Bell fontSize={20} />,
        })
    }

    const handleSuccess = async (tx:any) => {
        try {
            await tx.wait(1)
            handleNewNotification()
            updateUI()
        } catch (error) {
            console.log(error)
        }
    }

    
    async function updateUI() {
        const entranceFeeFromCall= (await getEntranceFee())?.toString()
        const numPlayersFromCall=(await getNumberOfPlayers())?.toString()
        const recentWinnerFromCall=(await getRecentWinner())?.toString()
        const raffleStateFromCall=(await getRaffleState())?.toString()
        console.log(entranceFeeFromCall)
        setEntranceFee(entranceFeeFromCall as string)
        setNumPlayers(numPlayersFromCall as string)
        setRecentWinner(recentWinnerFromCall as string)
        setRaffleState(raffleStateFromCall as string)
    }
    
    

    useEffect(()=>{
        if(isWeb3Enabled){
            updateUI()
        }

    },[isWeb3Enabled])
  return (
    <>
        { 
        raffleAddress?
        (<div className='p-5'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={async () => {
                await enterRaffle(
                    {
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    }
                )
            }}
            disabled={isFetching||isLoading}>
                {isFetching||isLoading?<div className='w-8 h-8 border-4 border-blue-50 border-t-transparent rounded-full animate-spin'></div>:<div>Enter Raffle</div>}</button>
            <div>Hi From Lottery!</div>
            <div>Lottery Entrance Fee:{ethers.utils.formatUnits(entranceFee,"ether")} ETH</div>
            <div>Number of Players:{numPlayers}</div>
            <div>Recent Winner:{recentWinner}</div>
            <div>Raffle State:{raffleState}</div>
        </div>):
        (<div>Hi from Lottery Entrance! Invalid Raffle address...</div>)
        }
    </>
  )
}
