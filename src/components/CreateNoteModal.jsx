import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from '../redux/notes/notes.actions';

const initFormData = {
    title: '',
    note: ''
}

function CreateNoteModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCreateNote = (e) => {
        e.preventDefault();

        if (formData.title !== '' && formData.content !== '') {
            dispatch(createNote(formData));
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);

        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="green" >Create your note</Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent mt='8rem'>
                    <ModalHeader>Create note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input borderRadius='none' name='title' value={formData.title} onChange={handleChange} ref={initialRef} placeholder='Title' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Content</FormLabel>
                            <Textarea borderRadius='none' name='note' value={formData.note} onChange={handleChange} placeholder='Write something...' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleCreateNote} colorScheme='green' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onClose} colorScheme="red">Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateNoteModal;