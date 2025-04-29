import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Image, Heading, Text, HStack, Button, useColorModeValue, IconButton, useToast, useDisclosure,Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = (product) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const TextColor = useColorModeValue("gray.800", "white")
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const handleUpdateProduct = async (pid, product) => {
        const res = await updateProduct(pid, product)
        if (res.success) {
            toast({
                title: res.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: res.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        onClose()
    }

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (success) {
            toast({
                title: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        >
            <Image src={product.image} alt={product.name} h={'48'} w={'full'} objectFit={'cover'} />
            <Box p={4}>
                <Heading as={'h3'} fontSize={'md'}>
                    {product.name}
                </Heading>
                <Text mt={2} fontSize={'sm'} color={TextColor}>
                    ${product.price}
                </Text>
            </Box>
            <HStack spacing={4} justifyContent={'center'}>
                <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme='blue'></IconButton>
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'></IconButton>
            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit '{product.name}'</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                            placeholder='Product Name'
                            value={updatedProduct.name || product.name}
                            name='name'
                            type='text'
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input placeholder='Price'
                            value={updatedProduct.price || product.price}
                            name='price' type='number'
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input placeholder='Image URL'
                            value={updatedProduct.image || product.image}
                            name='image'
                            type='text'
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)} colorScheme='blue' mr={3}>
                            Update
                        </Button>
                        <Button onClick={onClose} >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCard
