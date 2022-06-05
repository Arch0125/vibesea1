import { Box,Divider,Flex,Text, Button, Badge, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { useMetamask } from './context/metamask.context';
import { useState,useEffect } from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { ADDR_DICT } from './context/constant';
import { RiRefreshLine} from "react-icons/ri";

export const ProfileCard =() =>{

    const{provider,walletAddress, balance}=useMetamask()
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    const tipList=[];
    const[tips,setTips]=useState([]);

    useEffect(()=>{
        try{
            showTips()
        }
        catch(err){
            console.log("Connect Wallet")
        }
    },[])

    const showTips=async()=>{
        var tiplength = await PostContractInterface.getTipCount();
        var parselength = tiplength.toString()
        setTips([]);
        for(let i=1;i<=parselength;i++){
            var tip = await PostContractInterface.getTip(i);
            if((JSON.stringify(tip.owner)).toUpperCase() == (JSON.stringify(walletAddress)).toUpperCase()){
                tipList.push(tip);  
                setTips((tips)=>[...tips,tip])
            }
        }
        console.log(tips)
    }

    return(
        <Flex flexDirection={"column"} >
            <Box bgColor={"gray.50"} width={"98%"} borderColor={"gray.200"} borderWidth={"1.5px"} rounded={"2xl"} padding={"20px"} >
                <Text fontSize={"2xl"} fontWeight={"bold"} >Your Profile</Text>
                <Text fontSize={"xl"} >{walletAddress?.substring(0,8)}...{walletAddress?.substring(35)}</Text>
                <Divider/>
                <Text mt={"10px"} fontWeight={"semibold"} >Balance : {balance}</Text>
            </Box>
            <Box marginTop={"20px"} height={"fit-content"} maxHeight={"60vh"} bgColor={"gray.50"} width={"98%"} borderColor={"gray.200"} borderWidth={"1.5px"} rounded={"2xl"} padding={"20px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}  >Recent Tips <IconButton bg={"transparent"} _hover={"none"} _active={"none"}  ><RiRefreshLine/></IconButton> </Text>
                {
                    Object.keys(tips).slice(0).map((tip, index) => (
                        <Badge fontWeight={"semibold"} fontSize={"15px"} marginTop={"10px"} >{(tips[index].tipper).slice(0,5)}...{(tips[index].tipper).slice(39)} &nbsp; tipped &nbsp; {tips[index].tipamt} </Badge>
                    ))
                }
            </Box>

        </Flex>
    )
}