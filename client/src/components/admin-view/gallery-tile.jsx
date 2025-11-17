import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Gallery from '@/pages/shopping-view/gallery'
import { Button } from '../ui/button'

const AdminGalleryTile = (
  {gallery,
   setCurrentEditedId,
   setOpenCreateGalleryDialog,
   setFormData,
   handleDelete
  }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className='relative'>
            <img src={gallery?.image} 
            alt={gallery?.title} 
            className='w-full h-[300px] object-cover rounded-t-lg'
            />
          </div>
          <CardContent>
            <h2 className='text-xl font-bold mb-2 break-words max-w-[200px]'>{gallery?.title} </h2>
          </CardContent>
          <CardContent>
            <h2 className='text-sm font-bold mb-2'>{gallery?.designation} </h2>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
            onClick={()=>{
              setOpenCreateGalleryDialog(true);
              setCurrentEditedId(gallery?._id);
              setFormData(gallery)
            }}
            
            >Edit</Button>
            <Button
            onClick={()=>{
              handleDelete(gallery?._id)
            }}
            >Delete</Button>
          </CardFooter>
            
        </div>
    </Card>
  )
}

export default AdminGalleryTile