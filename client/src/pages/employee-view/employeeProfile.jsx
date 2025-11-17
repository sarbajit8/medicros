import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeaveApplication from '@/components/employee-view/leaveApplication';
import SalarySlip from './salary';
import EmployeeMyProfile from '@/components/employee-view/employeeMyProfile';
import WarningNotice from '@/components/employee-view/warningNotice';
import RulesRegulations from '@/components/employee-view/rulesRegulations';
import LegalNotice from '@/components/employee-view/legalNotice';

const EmployeeProfile = () => {
  return (
    <div className='flex flex-col'>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 px-4">
        <div className='flex flex-col rounded-lg border bg-background p-4 sm:p-6 shadow-sm'>
          <Tabs defaultValue="orders">
            
            {/* Horizontal Scrollable TabsList */}
            <div className="overflow-x-auto">
              <TabsList className="flex w-max min-w-full gap-2 sm:gap-4">
                <TabsTrigger value="orders">Leave Application</TabsTrigger>
                <TabsTrigger value="address">Salary Slip</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="rule">Rules & Regulation</TabsTrigger>
                <TabsTrigger value="legal">Legal Notice</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='orders'>
              <LeaveApplication />
            </TabsContent>
            <TabsContent value='address'>
              <SalarySlip />
            </TabsContent>
            <TabsContent value='profile'>
              <EmployeeMyProfile />
            </TabsContent>
            <TabsContent value='warning'>
              <WarningNotice />
            </TabsContent>
            <TabsContent value='rule'>
              <RulesRegulations />
            </TabsContent>
            <TabsContent value='legal'>
              <LegalNotice />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
