import { Box, Button, IconButton, Input } from '@chakra-ui/react';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react';
import {AiOutlineFileImage} from 'react-icons/ai'
import { useMetamask } from './context/metamask.context';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import {ethers} from 'ethers';

const CreatePost =() =>{

    const[textcontent,setTextcontent]=useState('');
    const toast = useToast()
    const{provider} = useMetamask();
    const PostContractInterface = new ethers.Contract('0xDF7D3D9B7437e985fab0295C0A26f559adE07163',PostContentABI.abi,provider?.getSigner());


    const addPost =() =>{
        try{
            PostContractInterface.addPost(textcontent,'abc');
            toast({
            title: 'Post created.',
            description: "Refresh your page to see latest post",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })}
          catch(err){
            toast({
                title: 'Wrong Network',
                description: "Change to Ropsten, Rinkeby or Polygon Mumbai",
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
          }
    }


    return(
        <Box flexDirection={"column"} alignContent={"flex-end"} textAlign={"end"}>
            <Textarea onChange={e => setTextcontent(e.target.value)} placeholder= '#wagmi tell what youre buidling'/>
            <Button mr={"20px"}  marginTop={"20px"} variant={"solid"} colorScheme={"purple"}><AiOutlineFileImage/> &nbsp; Add Image</Button>
            <Button onClick={() => addPost()} marginTop={"20px"} variant={"solid"} colorScheme={"purple"}>Create Post</Button>
        </Box>
    )
}

export default CreatePost