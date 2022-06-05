import { Box, Button, Divider, Flex,Input,InputGroup,Text } from '@chakra-ui/react';
import * as React from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { useMetamask } from './context/metamask.context';
import { ADDR_DICT } from './context/constant';
import { useEffect,useState } from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react';
import { RiRefreshLine} from "react-icons/ri";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure,InputRightElement } from '@chakra-ui/react';
  

export const PostList =() =>{

    const toast = useToast();
    const{provider,chain,walletAddress} = useMetamask();
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    const postList=[];
    const { isOpen, onOpen, onClose } = useDisclosure()
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
        console.log(postlength)
        setPosts([]);
        for(let i=1;i<=parselength;i++){
            var post = await PostContractInterface.getPost(i);
            postList.push(post);
            setPosts((posts)=>[...posts,post])
        }
    }

    const TipModal =(props) =>{
        const { isOpen, onOpen, onClose } = useDisclosure()
        const[amount,setAmount]=useState(0);
        var toaddr = (JSON.stringify(props.text)).toUpperCase();
        const sendTip =  async()=>{
            if((JSON.stringify(walletAddress)).toUpperCase()== toaddr){
                toast({
                    title: 'Transaction Failed.',
                    description: "You cannot tip yourself",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                  console.log('Same')
                
            }else{
               const tx = await provider?.getSigner().sendTransaction({
                to: props.text,
                value: ethers.utils.parseEther(amount)
              }); 
            }
            
        }

            return (
                <>
                <Button color={"purple"} variant={"solid"} mt={"10px"} height={"fit-content"} padding={"5px"} width={"20%"} onClick={onOpen}>Tip</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Tip the Creator</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"} mb={"20px"} >
                        <Text fontWeight={"bold"} >Youre Paying to :</Text>
                        <Badge>{props.text}</Badge>
                        <Text>Enter your tip :</Text>
                        <InputGroup>
                        <Input onChange={e=>setAmount(e.target.value)} placeholder='Enter Amount'/>
                        <InputRightElement  >
                        <Button onClick={sendTip} > &nbsp; Pay &nbsp; </Button>
                        </InputRightElement>
                        </InputGroup>
                    </ModalBody>
                    </ModalContent>
                </Modal>
                </>)
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
                            <TipModal text={posts[index].owner} />
                        </Box>
                        
                    </Flex>
                ))
            }
        </Flex>
        </>
    )
}