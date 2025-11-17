import CommonForm from '@/components/common/form'
import React, { useState } from 'react'
import bannerTwo from '../../assets/rm10.jpg';
import { loginFormControls } from '@/config';
import { Link } from 'react-router-dom';
import { loginUser } from '@/store/admin/employee-slice';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import Upperbar from '@/components/shopping-view/upperbar';
import Topbar from '@/components/shopping-view/topbar';
import ShoppingHeader from '@/components/shopping-view/header';

const initialState = {
    email : '',
    password : ''
  }

const EmployeeLogin = () => {

      const [formData, setFormData] = useState(initialState)
      const dispatch = useDispatch();
      const {toast} = useToast();


   
     function onSubmit(event){
       event.preventDefault();
       console.log(formData, "lofin jjjjjjjjjjjjjjjjjjjjjjjjjj");
       
       dispatch(loginUser(formData)).then(data=>{
        if(data?.payload?.success){
         toast({
           title: data?.payload?.message
         })
        }else{
         toast({
           title: data?.payload?.message,
           variant : "destructive"
         })
   
        }
         
       });
   
   
     }
    


  return (
    <div>
      {/* <Upperbar/>
        <Topbar/> */}
        <ShoppingHeader/>
         <div className="flex min-h-screen w-full">
            <div
                className="hidden lg:flex items-center justify-center w-1/2 px-12"
                style={{
                    backgroundImage: `url(${bannerTwo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                <h1 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-blue-600/80 via-blue-500/80 to-blue-800/80 p-4 rounded-lg shadow-lg">
  Welcome to <span className="text-yellow-300">MediCross Remedies</span> Employee Section
</h1>               </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight  text-blue-600'>Sign in to your account</h1>
        <p className='mt-2'>Return to 
            <Link className='font-medium ml-2 text-primary  hover:underline' to="/shop/home">Homepage</Link>
          </p>
        
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
   </div>
</div>


    </div>
  )
}

export default EmployeeLogin