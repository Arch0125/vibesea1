import { Box, Button, Divider, Flex,Text } from '@chakra-ui/react';
import * as React from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { useMetamask } from './context/metamask.context';
import { ADDR_DICT } from './context/constant';
import { useEffect,useState } from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'


export const PostList =() =>{

    const{provider,chain} = useMetamask();
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    const postList=[];
    const[posts,setPosts]=useState([]);

    useEffect(()=>{
        showloop();
    },[])
    
    const showloop=async()=>{
        setPosts([]);
        for(let i=1;i<7;i++){
            var post = await PostContractInterface.getPost(i);
            postList.push(post);
            setPosts((posts)=>[...posts,post])
        }
    }
    return(
<div>
      {
        Object.keys(posts).map((post, index) => (
            <Flex marginBottom={"20px"}>
            <Box textAlign={"start"} width={"55vw"} height={"fit-content"} borderColor={"gray.200"} borderWidth={"2px"} padding={"20px"} bgColor={"white"} rounded={"20px"} >
                
                <Text marginBottom={"10px"}><Avatar  size={"xs"} bg={"gray.300"} /> &nbsp; {(posts[index].owner).slice(0,5)+"..."+(posts[index].owner).slice(39)}</Text>
                <Divider/>
                <Box mb={"10px"} rounded={"2xl"} overflowWrap={"break-word"} marginTop={"10px"} bgColor={"gray.50"} px={"20px"} py={"10px"} width={"100%"}>{posts[index].content}</Box>
                <Divider/>
                <Button color={"purple"} variant={"solid"} mt={"10px"} height={"fit-content"} padding={"5px"} width={"20%"} >Tip</Button>
            </Box>
            </Flex>
        ))
      }
    <button onClick={showloop} >Showlist</button>
</div>
    )
}