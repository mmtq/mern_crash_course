import { Container, VStack, Heading, Box, useColorModeValue, Button, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: '',
        image: ""
    })
    const toast = useToast()

    const {createProduct} =useProductStore()

    const handleAddProduct = async() => {
        const {success, message}=await createProduct(newProduct)
        console.log(success, message)
        setNewProduct({name: "", price: "", image: ""})
        if(success){
            toast({
                title: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }}

    return (
        <Container>
            <VStack spacing={8}>
                <Heading as={"h1"} size="2xl" textAlign="center" mb={8}>
                    Create Product
                </Heading>
                <Box
                    w={'full'} bg={useColorModeValue('white', 'gray.800')}
                    p={6} rounded={'lg'} shadow={'md'}
                >
                    <VStack>
                        <Input type="text" placeholder='Product Name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        <Input type="number" placeholder='Product Price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        <Input type="text" placeholder='Product Image URL' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                        <Button
                            colorScheme="blue"
                            w="full"
                            onClick={handleAddProduct}
                        >
                            Create
                        </Button>

                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreateProduct
