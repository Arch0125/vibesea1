import { Button, Flex,Text } from '@chakra-ui/react';
import * as React from 'react';
import {ethers} from 'ethers';
import PostContentABI from './smartcontracts/artifacts/contracts/PostContract.sol/PostContract.json'
import { useMetamask } from './context/metamask.context';
import { ADDR_DICT } from './context/constant';
import { useEffect,useState } from 'react';


export const PostList =() =>{

    const{provider,chain} = useMetamask();
    const PostContractInterface = new ethers.Contract(ADDR_DICT[3],PostContentABI.abi,provider?.getSigner());
    const postList=[];
    const[posts,setPosts]=useState([]);
    
    const showloop=async()=>{
        setPosts([]);
        for(let i=1;i<6;i++){
            var post = await PostContractInterface.getPost(i);
            postList.push(post);
            setPosts((posts)=>[...posts,post])
        }
        console.log(posts)
    }
    return(
<div>
<ul>
      {
        Object.keys(posts).map((post, index) => (
          <li key={`${posts[index].name}-${index}`}>
            <h4>{posts[index].content}</h4>
          </li>
        ))
      }
      </ul>
    <button onClick={showloop} >Showlist</button>
</div>
    )
}