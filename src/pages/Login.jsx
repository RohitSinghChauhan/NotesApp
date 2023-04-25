import { useEffect, useState } from 'react';
import { Button, Flex, Stack, Text, FormControl, Input, Spinner } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/auth/auth.actions';
import { Link, useNavigate } from 'react-router-dom';

const initFormData = {
    email: '',
    password: ''
}

const Login = () => {
    const [formData, setFormData] = useState(initFormData);
    const { loading, error, isAuth } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate('/notes');
        }
    }, [isAuth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email !== '' && formData.password !== '') {
            dispatch(login(formData))
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);
    }

    return (
        <Flex h='100vh' direction={['column', 'column', 'row', 'row']} justifyContent={'space-between'} alignItems={'center'}>
            <Flex bgImage='url(https://cdn.dribbble.com/userupload/3718455/file/original-d72e75b18103b3f189196430c68d0af8.png?compress=1&resize=1200x901)'
                h='100%' w={['98%', '98%', '60%', '60%']} direction='column' gap={['1.6rem', '1.6rem', '1.6rem', '1.6rem']} justifyContent='center' alignItems='center'>
                {loading && <Spinner color='red.500' />}
                {!loading && <>
                    <Text fontSize={['1.6rem', '2.5rem', '3rem', '3.2rem']} color='blackAlpha.700'>Login to your account</Text>
                    <Flex w={['98%', '80%', '90%', '60%']} direction='column' gap={['1rem', '1rem', '1rem', '1rem']}>
                        <FormControl>
                            <Input name='email' type='email' value={formData.email} onChange={handleChange} bgColor='whitesmoke' placeholder='Enter email' />
                        </FormControl>
                        <FormControl>
                            <Input name='password' type='password' value={formData.password} onChange={handleChange} bgColor='whitesmoke' placeholder='Enter password' />
                        </FormControl>
                        <Button onClick={handleSubmit} bgColor='blackAlpha.700' colorScheme='green' color='whitesmoke'>Log In</Button>
                    </Flex></>}
                {error && <Alert w={['95%', '90%', '90%', '90%']} status='error'>
                    <AlertIcon />
                    <AlertTitle fontSize={['.7rem', '.7rem', '1rem', '1rem']}>Something went wrong,</AlertTitle>
                    <AlertDescription fontSize={['.7rem', '.7rem', '1rem', '1rem']}>Please try again.</AlertDescription>
                </Alert>}
            </Flex>

            <Flex h={['80%', '100%', '100%', '100%']} w={['100%', '100%', '40%', '40%']} direction='column' justifyContent='center' alignItems='center' backgroundColor='#0093E9' backgroundImage='linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'>
                <Stack textAlign='center'>
                    <Text fontSize={['2.1rem', '3.5rem', '3.5rem', '3.5rem']} color='white'>New Here?</Text>
                    <Text color='white'>Sign up and get started now</Text>
                    <Link to='/signup'>
                        <Button w={['28vw', '28vw', '9vw', '9vw']}>Sign Up</Button>
                    </Link>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Login;