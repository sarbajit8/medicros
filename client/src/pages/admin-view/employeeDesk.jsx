import React from 'react'


import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SalarySlip from '../employee-view/salary'
import AllLeaveApplication from '@/components/admin-view/allLeaveApplication'
import SearchAndCards from '@/components/admin-view/employee-salary'


const EmployeeDesk = () => {


  return (
    <div className='flex flex-col'>
      

      <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
          <Tabs defaultValue="orders">
            {/* <TabsList>
            <TabsTrigger value="orders">Leave Application</TabsTrigger>
            <TabsTrigger value="address">Salary Slip</TabsTrigger>

            </TabsList> */}
            <TabsContent value='orders'>
              <AllLeaveApplication/>
            </TabsContent>
            {/* <TabsContent value='address'>
              <SearchAndCards/>
            </TabsContent> */}

          </Tabs>

        </div>

      </div>
    </div>
  )
}

export default EmployeeDesk



