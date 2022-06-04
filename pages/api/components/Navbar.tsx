import { Box, Button, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { NotConnectedModal } from './NotConnectedModal';
import { ConnectedModal } from './ConnectedModal';
import { useMetamask } from './context/metamask.context';
import { Select } from '@chakra-ui/react';
import { CHAIN_DICT } from './context/constant';
import { NetworkList } from './NetworkList';
import { ethers } from 'ethers';
import Greeter from './smartcontracts/artifacts/contracts/Greeter.sol/Greeter.json'

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


      const showProvider=()=>{      
        const GreetContract = new ethers.Contract('0x189CA3Ee832f145442d71ca6D278e6dA02d2E528',Greeter.abi,provider);
        console.log(provider)
        console.log(Greeter.abi);
        console.log(GreetContract)
      }

    return(
        < >
            <Flex padding={"20px"} borderRadius={"20px"} flexDirection={"row"} width={"99%"} bgColor={"blueviolet"} height={"fit-content"} margin={"10px"} >
                <Box width={"50%"}>
                    <Button onClick={() => showProvider()} >OnChain</Button>
                </Box>
                <Box paddingLeft={"40vw"} flexDirection={"row"}>
                
                {isWalletConnected && walletAddress && chain && currentWallet ?(<><ConnectedModal/></>):<NotConnectedModal/>}
                </Box>
            </Flex>
        </>
    )
}

