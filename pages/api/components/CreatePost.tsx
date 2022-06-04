import { Box, Button, IconButton, Input } from '@chakra-ui/react';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react';
import {AiOutlineFileImage} from 'react-icons/ai'
import { useMetamask } from './context/metamask.context';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import {ethers} from 'ethers';
import { ADDR_DICT } from './context/constant';

const CreatePost =() =>{

    const[textcontent,setTextcontent]=useState('');
    const toast = useToast()
    const{provider,chain} = useMetamask();
    console.log(chain)
    
    
    const addPost =() =>{
        try{
            const PostContractInterface = new ethers.Contract(ADDR_DICT[chain],PostContentABI.abi,provider?.getSigner());
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