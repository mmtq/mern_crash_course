import Navbar from "./components/navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateProduct from "./pages/CreateProduct"
import { Box, useColorModeValue} from "@chakra-ui/react"
function App() {

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} minH={"100vh"}>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateProduct />} />
     </Routes>
    </Box>
  )
}

export default App
