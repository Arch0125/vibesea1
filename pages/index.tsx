import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Navbar } from './api/components/Navbar'


interface Props{
  walletAddress:string,
  checkIfWalletIsConnected:Function,
}

const Home: NextPage<Props> = (props:Props) => {

  return (
    <Flex bgColor={"black"} height={"100vh"} >
      <Navbar/>
    </Flex>
  )
}

export default Home
