import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const history= useHistory();
    const handleClick = () => setShow(!show);
    const submitHandler = async() => {
        setLoading(true);
        if(!email || !password){
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Succesful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

  return (
    <VStack spacing = "5px">
        <FormControl id = "email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder = 'Enter Your Email'
                onChange = {(e) => setEmail(e.target.value)}
            />
        </FormControl>
          <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                  <Input
                      type = { show ? "text" : "password"}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button h="1.75rem" size = "sm" onClick = {handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>
          <Button
            colorScheme = "blue"
            width = "100%"
            style = {{marginTop: 15}}
            onClick = {submitHandler}
            isLoading = {loading}
          >
                Log In
          </Button>
          <Button
              variant="solid"
              colorScheme="red"
              width="100%"
              onClick={() => {
                  setEmail("guest&example.com");
                  setPassword("123456");
              }}
          >
              Get Guest User Credentials
          </ Button>
    </VStack>
  )
}

export default Login