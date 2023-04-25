import React from 'react';
import Navbar from '../components/Navbar';
import { Flex, Text } from '@chakra-ui/react';

const InvalidPage = () => {
    return (
        <>
            <Navbar />
            <Flex direction='column' m='auto' h={['90vh', '90vh', '90vh', '90vh']} w={['95vw', '95vw', '95vw', '95vw']} justifyContent='center' alignItems='center'>
                <Text as='b' >Page not found.</Text>
            </Flex>
        </>
    )
}

export default InvalidPage;