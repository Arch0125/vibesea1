import { Box,Divider,Text } from '@chakra-ui/react';
import * as React from 'react';
import { useMetamask } from './context/metamask.context';

export const ProfileCard =() =>{

    const{provider,walletAddress, balance}=useMetamask()

    return(
        <Box bgColor={"gray.50"} width={"98%"} borderColor={"gray.200"} borderWidth={"1.5px"} rounded={"2xl"} padding={"20px"} >
            <Text fontSize={"2xl"} fontWeight={"bold"} >Your Profile</Text>
            <Text fontSize={"xl"} >{walletAddress?.substring(0,8)}...{walletAddress?.substring(35)}</Text>
            <Divider/>
            <Text mt={"10px"} fontWeight={"semibold"} >Balance : {balance}</Text>
        </Box>
    )
}