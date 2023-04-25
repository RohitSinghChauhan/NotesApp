import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";

const initFormData = {
    title: '',
    note: ''
}
const EditNoteModal = ({ handleEdit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);

    const [formData, setFormData] = useState(initFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleEditNote = (e) => {
        e.preventDefault();

        if (formData.title !== '' && formData.content !== '') {
            handleEdit(formData);
        } else {
            alert('Please fill up the fields!');
        }

        setFormData(initFormData);
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} color='white' bgColor='blackAlpha.700' colorScheme='green'>Edit</Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent mt='8rem'>
                    <ModalHeader>Edit note</ModalHeader>
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
                        <Button onClick={handleEditNote} colorScheme='green' mr={3}>
                            Edit
                        </Button>
                        <Button onClick={onClose} colorScheme="red">Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditNoteModal;