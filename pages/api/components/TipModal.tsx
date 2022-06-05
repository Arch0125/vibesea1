import * as React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react';
  import { Flex,Box,Text,Button } from '@chakra-ui/react';

export const TipModal =(addr) =>{
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
            <Button onClick={onOpen}>Open Modal</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
  )
}