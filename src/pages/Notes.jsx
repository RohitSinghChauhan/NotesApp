import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, SimpleGrid, Text, Button, Spacer, Spinner, useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from '../redux/notes/notes.actions';
import CreateNoteModal from '../components/CreateNoteModal';
import EditNoteModal from '../components/EditNoteModal';
import DeleteAlert from '../components/DeleteAlert';

const Notes = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { notes } = useSelector(store => store.notes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    function handleEdit(noteToUpdate) {
        const { _id } = noteToUpdate;

        setLoading(true);

        fetch(`https://notesapp-api-ygsd.onrender.com/notes/update/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify(noteToUpdate),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                dispatch(getNotes());
                setLoading(false);

                toast({
                    title: 'Note edited successfully!',
                    description: "",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                setLoading(false);
                console.log(err)
            });
    }

    function handleDelete(id) {
        setLoading(true);

        axios.delete(`https://notesapp-api-ygsd.onrender.com/notes/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                dispatch(getNotes())
                setLoading(false)

                toast({
                    title: 'Note deleted successfully!',
                    description: "",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Navbar />

            <Flex direction='column' m='auto' h={['90vh', '90vh', '90vh', '90vh']} w={['95vw', '95vw', '95vw', '95vw']} gap={['1rem', '1rem', '1rem', '1rem']} alignItems='center'>
                <Box mt={['.8rem', '.8rem', '.8rem', '1rem']}>
                    <CreateNoteModal />
                </Box>

                {loading && <Flex w='100vw' h='100vh' justifyContent='center' alignItems='center'><Spinner color='red.500' /></Flex>}

                {!loading &&
                    <SimpleGrid columns={['1', '2', '3', '3']} spacing={4} w={['100%', '100%', '100%', '100%']}>
                        {notes?.map((item) => (
                            <Flex key={item._id} gap={['1.2rem']} direction='column' boxShadow='rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset' p='1rem' justifyContent='space-between' alignItems='center'>
                                <Box p='.2rem' bgColor='green.300' color='white'>
                                    <Text>Public</Text>
                                </Box>

                                <Box>
                                    <Text color='black'>Title: <Text as='b' color='crimson'>{item.title}</Text></Text>
                                    <Spacer />
                                    <Text as='i'>{item.note}</Text>
                                </Box>
                                <Flex gap={['1rem', '1rem', '1rem', '1.5rem']}>

                                    <EditNoteModal handleEdit={(formData) => {
                                        const noteToUpdate = { ...formData, _id: item._id, userID: item.userID }
                                        handleEdit(noteToUpdate)
                                    }} />

                                    <DeleteAlert handleDelete={() => handleDelete(item._id)} />

                                </Flex>
                            </Flex>
                        ))}
                    </SimpleGrid>}
            </Flex>
        </>
    )
}

export { Notes };