import { Button, Flex,Text } from '@chakra-ui/react';
import * as React from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { useMetamask } from './context/metamask.context';
import { ADDR_DICT } from './context/constant';
import { useEffect } from 'react';


export const PostList =() =>{

    const{provider,chain} = useMetamask();
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    var postList=[]
    
    const showloop=async()=>{
        for(let i=1;i<5;i++){
            var currentdata = await PostContractInterface.getPost(i);
            postList.push(currentdata);
        }
    }
    showloop();
    return(
<div>
    
</div>
    )
}