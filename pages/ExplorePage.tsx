import { Box, Flex, Input, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react';
import { BsPencil, BsEasel } from "react-icons/bs";
import {AiOutlineEdit} from 'react-icons/ai'
import CreatePost from './api/components/CreatePost';
import { PostList } from './api/components/PostList';
import { ProfileCard } from './api/components/ProfileCard';


export const ExplorePage =() =>{
    return(
        <Flex flexDirection={"row"} >
            <Flex flexDirection={"column"} width={"70%"} bgColor={"gray.50"} height={"130vh"} textAlign={"center"} alignItems={"center"} >
                <Box bgColor={"white"} height={"fit-content"} width={"80%"} padding={"20px"} borderColor={"gray.200"} borderWidth={"1.5px"} borderRadius={"20px"} >
                <Tabs>
                    <TabList>
                        <Tab><IconButton aria-label='Search database' icon={<AiOutlineEdit/>} /></Tab>
                        <Tab><IconButton aria-label='Search database' icon={<BsEasel/>} /></Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <CreatePost/>
                            
                        </TabPanel>
                        <TabPanel>
                        <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                
                </Box>
                <Box marginTop={"50px"}>
                    <PostList/>
                </Box>
            </Flex>
            <Box flex={"1"} padding={"30px"} height={"100%"}>
                <ProfileCard/>
            </Box>
        </Flex>
    )
}

