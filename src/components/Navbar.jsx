import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import { Link, useNavigate } from 'react-router-dom';
import NavbarSm from './NavbarSm';

const Navbar = () => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuth) {
            dispatch(logout());
            navigate('/');
        }
    }

    return (
        <>
            <Flex display={['none', 'none', 'flex', 'flex']} bgColor='blackAlpha.900' color='white' p={['.3rem', '.5rem', '.6rem', '.7rem']} justifyContent='space-between' alignItems='center'>
                <Link to='/notes'>
                    <Text letterSpacing={['.3rem']} fontSize={['1.1rem']}>NOTES APP</Text>
                </Link>

                <Flex gap={['1.1rem', '1.1rem', '1.1rem', '1.1rem']} justifyContent='center' alignItems='center'>
                    <Link to='/notes'>
                        <Button borderRadius='none' bgColor='green.500' colorScheme='green'>NOTES</Button>
                    </Link>
                    <Link to='/'>
                        <Button onClick={handleClick} borderRadius='none' bgColor='green.500' colorScheme='green'>{isAuth ? 'LOGOUT' : 'LOGIN'}</Button>
                    </Link>
                </Flex>
            </Flex>

            <Flex display={['flex', 'flex', 'none', 'none']} w='100%' bgColor='blackAlpha.900' color='white' p={['.3rem', '.5rem', '.6rem', '.7rem']} justifyContent='space-between' alignItems='center'>
                <Link to='/notes'>
                    <Text letterSpacing={['.3rem']} fontSize={['1.1rem']}>NOTES APP</Text>
                </Link>

                <NavbarSm />
            </Flex>
        </>
    )
}

export default Navbar;