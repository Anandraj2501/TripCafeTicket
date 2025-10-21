import Modal from '@mui/material/Modal';
import React from 'react';
import ReviewForm from '../Payment/ReviewForm';
import { div } from 'motion/react-client';
const ReviewModal = ({ open, onClose, review }) => {
    if (!open) return null;


    return (
        <div className='flex justify-center items-center'>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >   
                <div className='container mx-auto sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] px-[2%] sm:px-[5.5%] md:px-[5.5%] lg:px-[5.5%] xl:px-[5.5%] py-10'>
                    <ReviewForm />
                </div>
                
            </Modal>
        </div>
    )
}

export default ReviewModal;