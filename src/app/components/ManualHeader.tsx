'use client';
import React from 'react'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react';


export default function ManualHeader() {
    const {enableWeb3,account,isWeb3Enabled,Moralis,deactivateWeb3,isWeb3EnableLoading}=useMoralis()
    useEffect(()=>{
        console.log(isWeb3Enabled)
        if(isWeb3Enabled) return
        if(typeof window!=="undefined"){
            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }
        }
    },[isWeb3Enabled])

    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            console.log(`Account changed to ${account}`)
            if(account==null){
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    },[])
  return (
    <div>
        {account?<div>Connected to {account.slice(0,6)}...{account.slice(account.length-4)}</div>:(<button onClick={async () => {
            const response=await enableWeb3()
            if(typeof window!=="undefined"&&response){
                window.localStorage.setItem("connected","inject")
            }
        }}
        disabled={isWeb3EnableLoading}>Connect</button>)}
    </div>
  )
}
