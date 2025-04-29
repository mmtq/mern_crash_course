import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <Container>
      <VStack>
        <Text
          bgGradient='linear(to-l,rgb(46, 157, 208),rgb(26, 75, 181))'
          bgClip='text'
          fontSize={{ base: "1xl", sm: "2xl", md: "3xl" }}
          fontWeight='bold'
          textTransform={"uppercase"}
          textAlign={'center'}
        >Current Products</Text>
        <SimpleGrid
        columns={{
          base:1,
          md:2,
          lg:3
        }}
        spacing={10}
        w={'full'}
        >
        </SimpleGrid>
        <Text
          fontSize='xl'
          textAlign={'center'}
          fontWeight={'bold'}
          color={'gray.500'}
        >
          No Product Found {" "}
          <Link to={"/create"}>
            <Text as={'span'} color={'blue.500'} _hover={{textDecoration:"underline"}}>Create a Product</Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default Home
