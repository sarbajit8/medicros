import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeaveApplication from '../employee-view/leaveApplication';
import SalarySlip from '@/pages/employee-view/salary';
import EmployeeMyProfile from '../employee-view/employeeMyProfile';
import WarningNotice from '../employee-view/warningNotice';
import RulesRegulations from '../employee-view/rulesRegulations';
import LegalNotice from '../employee-view/legalNotice';
import OtherNotification from './otherNotification';
import { useDispatch, useSelector } from 'react-redux';
import { getAlertByUserId } from '@/store/admin/alert-slice';
import OtherHeader from './OtherHeader';

const OtherDashboard = () => {
    const { employee } = useSelector(state => state.adminEmployee);

  const { alerts } = useSelector((state) => state.alert);
  const unreadCount = alerts.filter(alert => alert.status === 'unread').length;
const dispatch = useDispatch();

useEffect(() => {
  if (employee?.id) {
    dispatch(getAlertByUserId(employee.id));
  }
}, [dispatch, employee?.id]);

  return (
      <div className='flex flex-col'>
          <OtherHeader />
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

                {/* ✅ Notification tab with unread badge */}
                <TabsTrigger value="notifications" className="relative">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </TabsTrigger>
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
            <TabsContent value='notifications'>
              <OtherNotification />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OtherDashboard;
