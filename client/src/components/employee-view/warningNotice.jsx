import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getWarningsByEmployeeId, deleteWarning } from '@/store/admin/warning-slice';

const WarningNotice = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { employee } = useSelector(state => state.adminEmployee);
  const { warningList } = useSelector(state => state.warning);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchMonth, setSearchMonth] = useState('');

  useEffect(() => {
    if (employee?.id) {
      dispatch(getWarningsByEmployeeId(employee.id));
    }
  }, [dispatch, employee?.id]);

  const filteredWarnings = warningList.filter(warning => {
    const warningDate = new Date(warning.date);
    const year = warningDate.getFullYear();
    const month = warningDate.getMonth() + 1;

    const matchesTitle = warning.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesYear = searchYear ? year.toString() === searchYear : true;
    const matchesMonth = searchMonth ? month.toString() === searchMonth : true;

    return matchesTitle && matchesYear && matchesMonth;
  });

  const handleDelete = (id) => {
    dispatch(deleteWarning(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getWarningsByEmployeeId(employee.id));
        toast({ title: 'Warning deleted successfully' });
      }
    });
  };

  return (
    <Fragment>
      <div className='mb-5 flex justify-between'>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Search by year"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          />
          <select
            value={searchMonth}
            onChange={(e) => setSearchMonth(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          >
            <option value="">Search by month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {filteredWarnings.length > 0 ? (
          filteredWarnings.map((warning) => (
            <Card key={warning._id} className='w-full max-w-sm mx-auto shadow-md border rounded-xl'>
              <CardContent className='py-4 px-5'>
                <h2 className='text-lg font-semibold mb-2 break-words max-w-[200px]'>
                  {warning.title}
                </h2>
                <p className='text-sm text-gray-700 mb-3 break-words max-w-[300px] whitespace-pre-line'>
                  {warning.content}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {warning.date?.split('T')[0]}
                </p>
              </CardContent>
              <CardFooter className='flex justify-end px-5 pb-4'>
                {/* <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleDelete(warning._id)}
                >
                  Delete
                </Button> */}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No warning notices found.</p>
        )}
      </div>
    </Fragment>
  );
};



export default WarningNotice