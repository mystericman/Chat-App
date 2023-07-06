import React from 'react'
import { useState } from "react";
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setPicLoading(true);
        if(pics === undefined) {
            toast({
                title: "Please select an Image!",
                status: "Warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dpwsfcly9");
            fetch("https://api.cloudinary.com/v1_1/dpwsfcly9/image/upload", {
                method: 'post',
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        }else {
            toast({
                title: "Please select an Image!",
                status: "Warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

    const submitHandler = async() => {
        setPicLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords do not match.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try{
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                { name, email, password, pic },
                config
            );
            toast({
                title: "Registration Sucessful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            history.push("/chats");

        } catch(error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };

  return (
    <VStack spacing = "5px">
        <FormControl id = "first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder = 'Enter Your Name'
                onChange = {(e) => setName(e.target.value)}
            />
        </FormControl>
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
          <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                  <Input
                      type = { show ? "text" : "password"}
                      placeholder='Confirm Password'
                      onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button h="1.75rem" size = "sm" onClick = {handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>

          <FormControl id="pic">
              <FormLabel>Upload your Picture</FormLabel>
              <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
              />
          </FormControl>
          <Button
            colorScheme = "blue"
            width = "100%"
            style = {{marginTop: 15}}
            onClick = {submitHandler}
            isLoading = {picLoading}
          >
                Sign Up
          </Button>

    </VStack>
  )
}

export default Signup