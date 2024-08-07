import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, Text, FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const initFormData = {
    email: '',
    password: ''
}

const Signup = () => {
    const [formData, setFormData] = useState(initFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email !== '' && formData.password !== '') {
            setLoading(true);

            // Construct the query string
            const queryParams = new URLSearchParams({
                email: formData.email,
                password: formData.password
            }).toString();

            // Update the URL to include the query parameters
            const url = `https://notesapp-api-ygsd.onrender.com/user/signup?${queryParams}`;
            console.log('URL=', url);

            axios.post(url)
                .then(res => {
                    setLoading(false);

                    toast({
                        title: 'Signed up successfully, Please Login now!',
                        description: "",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });

                    navigate('/');
                })
                .catch(err => {
                    setLoading(false);
                    setError(true);
                    console.log(err);
                });
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);
    };

    return (
        <>
            <Navbar />

            <Flex bgImage='https://images.unsplash.com/photo-1490598000245-075175152d25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' bgPosition='center' h='92vh' w={['100%', '100%', '100%', '100%']} direction='column' gap={['1.6rem', '1.6rem', '1.6rem', '1.6rem']} justifyContent='center' alignItems='center'>

                {loading ? <><Text as='b' >Please wait...</Text><Spinner color='red.500' /></> :
                    <>
                        <Text fontSize={['1.6rem', '2.5rem', '3rem', '3.2rem']} color='white' >Create your account now</Text>
                        <Flex w={['60%', '60%', '50%', '50%']} direction='column' gap={['1rem', '1rem', '1rem', '1rem']}>
                            <FormControl>
                                <Input name='email' type='email' value={formData.email} onChange={handleChange} placeholder='Enter email' />
                            </FormControl>
                            <FormControl>
                                <Input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Enter password' />
                            </FormControl>
                            <Button onClick={handleSubmit} bgColor='blackAlpha.800' colorScheme='green' color='whitesmoke'>Sign Up</Button>
                        </Flex>
                    </>}

                {error && <Alert w={['95%', '90%', '90%', '90%']} status='error'>
                    <AlertIcon />
                    <AlertTitle fontSize={['.7rem', '.7rem', '1rem', '1rem']}>Something went wrong,</AlertTitle>
                    <AlertDescription fontSize={['.7rem', '.7rem', '1rem', '1rem']}>Please try again.</AlertDescription>
                </Alert>}
            </Flex>

        </>
    )
}

export default Signup