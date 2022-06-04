import { Box, Button, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { NotConnectedModal } from './NotConnectedModal';
import { ConnectedModal } from './ConnectedModal';
import { useMetamask } from './context/metamask.context';
import { Select } from '@chakra-ui/react';
import { CHAIN_DICT } from './context/constant';
import { NetworkList } from './NetworkList';
import { ethers } from 'ethers';
import { ADDR_DICT } from './context/constant';
import { useToast } from '@chakra-ui/react'

export const Navbar =() =>{

    const {
        isWalletConnected,
        walletAddress,
        connectMetamask,
        connectWalletconnect,
        chain,
        changeChain,
        balance,
        signMessage,
        currentWallet,
        provider
      } = useMetamask()

      const toast = useToast();

    return(
        < >
            <Flex padding={"20px"} borderRadius={"20px"} flexDirection={"row"} width={"99%"} bgColor={"blueviolet"} height={"fit-content"} margin={"10px"} >
                <Box width={"50%"}>
                    <Button>OnChain</Button>
                </Box>
                <Box paddingLeft={"40vw"} flexDirection={"row"}>
                
                {isWalletConnected && walletAddress && chain && currentWallet ?(<><ConnectedModal/></>):<NotConnectedModal/>}
                </Box>
            </Flex>
        </>
    )
}

