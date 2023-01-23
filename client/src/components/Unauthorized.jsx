import React from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Unauthorized = () => {
    
    const navigate = useNavigate()

    toast.warn('Please login as Admin!', {
        toastId: "unauthorized",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => (navigate("/lists"))
        });
    
  return (
   <>
    <ToastContainer/>
    </>
  )
}

export default Unauthorized