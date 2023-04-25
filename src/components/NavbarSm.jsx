import React from 'react'
import { Button, Drawer, DrawerBody, DrawerContent, Text, DrawerOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai'

const NavbarSm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState('right');

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
            <Button bg='transparent' onClick={onOpen}>
                <RxHamburgerMenu size='1.6rem' />
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size='xs'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <Button ml='65vw' onClick={onClose}><AiOutlineClose /></Button>
                        <Stack>
                            <Link to='/'>
                                <Button onClick={handleClick} bgColor='green.400' color='white' w='100%' mt='1.5rem'>{isAuth ? 'Log Out' : 'Log In'}</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button w='100%' bgColor='green.400' color='white' mt='1.5rem'>Sign up</Button>
                            </Link>
                        </Stack>

                        <Stack mt='65vh'>
                            <Text as='i'>@Copyright 2023-24</Text>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavbarSm