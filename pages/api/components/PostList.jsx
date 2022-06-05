import { Box, Button, Divider, Flex,Text } from '@chakra-ui/react';
import * as React from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { useMetamask } from './context/metamask.context';
import { ADDR_DICT } from './context/constant';
import { useEffect,useState } from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { TipModal } from './TipModal';
import { IconButton } from '@chakra-ui/react';
import { RiRefreshLine} from "react-icons/ri";

export const PostList =() =>{

    const{provider,chain} = useMetamask();
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    const postList=[];
    const[posts,setPosts]=useState([]);

    useEffect(()=>{
        try{
          showloop();  
        }
        catch(err){
            console.log("Conect your wallet")
        }
        
    },[])
    
    const showloop=async()=>{
        var postlength = await PostContractInterface.getCount();
        var parselength = postlength.toString()
        setPosts([]);
        for(let i=1;i<=parselength;i++){
            var post = await PostContractInterface.getPost(i);
            postList.push(post);
            setPosts((posts)=>[...posts,post])
        }
    }
    return(
        <>
        <Button marginBottom={"10px"} onClick={showloop} variant={'outline'}>Refresh if post doesn't appear &nbsp; <RiRefreshLine/></Button>
        <Flex flexDirection={"column-reverse"} >
            {
                Object.keys(posts).slice(0).map((post, index) => (
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
        </Flex>
        </>
    )
}