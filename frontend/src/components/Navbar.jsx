import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Container
            maxW={"1140px"}
            px={4}
        >
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDir={
                    { base: "column", sm: "row" }
                }
            >
                <Text
                    bgGradient='linear(to-l,rgb(46, 157, 208),rgb(26, 75, 181))'
                    bgClip='text'
                    fontSize={{base: "2xl", sm: "3xl", md: "4xl" }}
                    fontWeight='bold'
                    textTransform={"uppercase"}
                    textAlign={'center'}
                >   
                    <Link to={'/'}>Product Store 🛒</Link> 
                </Text>
                <HStack spacing={2} alignItems={'center'}>
                    <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon/>
                    </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
                    </Button>
                </HStack>
            </Flex>

        </Container>
    )
}

export default Navbar
