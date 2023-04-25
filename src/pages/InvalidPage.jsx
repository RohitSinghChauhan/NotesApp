import React from 'react';
import Navbar from '../components/Navbar';
import { Flex } from '@chakra-ui/react';

const InvalidPage = () => {
    return (
        <>
            <Navbar />
            <Flex direction='column' m='auto' h={['90vh', '90vh', '90vh', '90vh']} w={['95vw', '95vw', '95vw', '95vw']} justifyContent='space-between' alignItems='center'>
                Page not found.
            </Flex>
        </>
    )
}

export default InvalidPage;