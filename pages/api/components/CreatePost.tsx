import { Box, Button, IconButton, Input } from '@chakra-ui/react';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react';
import {AiOutlineFileImage} from 'react-icons/ai'
import { useMetamask } from './context/metamask.context';

const CreatePost =() =>{

    const toast = useToast()
    const{provider} = useMetamask();

    const showToast =() =>{
        toast({
            title: 'Post created.',
            description: "Refresh your page to see latest post",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })

          console.log(provider)
    }

    const[textcontent,setTextcontent]=useState('');

    return(
        <Box flexDirection={"column"} alignContent={"flex-end"} textAlign={"end"}>
            <Textarea onChange={e => setTextcontent(e.target.value)} placeholder= '#wagmi tell what youre buidling'/>
            <Button mr={"20px"}  marginTop={"20px"} variant={"solid"} colorScheme={"purple"}><AiOutlineFileImage/> &nbsp; Add Image</Button>
            <Button onClick={() => showToast()} marginTop={"20px"} variant={"solid"} colorScheme={"purple"}>Create Post</Button>
        </Box>
    )
}

export default CreatePost