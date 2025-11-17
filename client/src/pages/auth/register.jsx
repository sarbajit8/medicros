
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/common/form.jsx'
import { registerFormControls } from '../../config'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/auth-slice/index.js'
import { useToast } from '@/hooks/use-toast.js'

const initialState = {
  userName : '',
  email : '',
  password : ''
}


const AuthRegister = () => {
    
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,
        })
        navigate('/auth/login')
      }else{
        toast({
          title : data?.payload?.message,
          variant: 'destructive'
        })

      };
      console.log(data);
      
    });
    
  }
  console.log(formData);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-blue-600'>Create new account</h1>
          <p className='mt-2'>Already have account
            <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/login">Login</Link>
          </p>
      </div>
       <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister