import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Gallery from '@/pages/shopping-view/gallery'
import { Button } from '../ui/button'

const EmployeeSalaryTile = (
  {salary,
   setCurrentEditedId,
   setOpenCreateGalleryDialog,
   setFormData,
   handleDelete
  }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className='relative'>
            <img src={salary?.image} 
            alt={salary?.title} 
            className='w-full h-[300px] object-cover rounded-t-lg'
            />
          </div>
          <CardContent>
            <h2 className='text-xl font-bold mb-2'>{salary?.title} </h2>
            <p>{salary?.date ? salary.date.split("T")[0] : 'N/A'}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
            onClick={()=>{
              setOpenCreateGalleryDialog(true);
              setCurrentEditedId(salary?._id);
              setFormData(salary)
            }}
            
            >Edit</Button>
            <Button
            onClick={()=>{
              handleDelete(salary?._id)
            }}
            >Delete</Button>
          </CardFooter>
            
        </div>
    </Card>
  )
}

export default EmployeeSalaryTile