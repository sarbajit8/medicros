import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  upsertBsaDailyLog,
  fetchBsaDailyLog
} from '@/store/admin/bsaList-slice';
import {
  deleteBsaPartyRowById,
  editBsaPartyRowById,
  fetchBsaPartyCollectionByDate,
  upsertBsaPartyCollection
} from '@/store/admin/bsaListTable-slice';
import { useToast } from '@/hooks/use-toast';
import { fetchBsaPaymentRemarksByEmployeeAndDate, upsertBsaPaymentRemarks } from '@/store/admin/bsaPaymentRemarks-slice';

const EmployeeBsaList = () => {
  const { employee } = useSelector(state => state.adminEmployee);
    const employeeId = employee?.id;
      const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [market, setMarket] = useState("");
  const [lunch, setLunch] = useState("");
    const { data: rmkData } = useSelector((state) => state.bsaRemarks);
  
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [entries, setEntries] = useState([
    { partyname: '', billamount: '', collectedamount: '', mop: '' }
  ]);
  const { toast } = useToast();

  const { logData } = useSelector((state) => state.bsaList);
  const { data: partyData } = useSelector((state) => state.bsaTableList);

  const [logFormData, setLogFormData] = useState({
    employeeId,
    date: selectedDate,
    market: "",
    lunch: ""
  });

   const [remarksData, setRemarksData] = useState({
      accounts: "",
      accountamount:"",
      cash: "",
      qr: "",
      "bank transfer": "",
      director: "",
      "phone pay": "",
      "cdm payment": "",
      cheque: "",
    });
    const handleSubmitAllRemarks = () => {
      const payload = {
        employeeId,
        date: selectedDate,
        accounremarks: remarksData.accounts,
        accountamount: remarksData.accountamount, // For amount
        casshremarks: remarksData.cash,
        qrremarks: remarksData.qr,
        btremarks: remarksData["bank transfer"],
        msremarks: remarksData.director,
        ppremarks: remarksData["phone pay"],
        cpremarks: remarksData["cdm payment"],
        chequestatus: remarksData.cheque || "pending",
      };
    
      dispatch(upsertBsaPaymentRemarks(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast({ title: "All remarks submitted successfully." });
    
          // ✅ Clear the remark input fields after successful submission
          const updatedData = res.payload?.data;
  
          setRemarksData({
            accounts: updatedData?.accounremarks || "",
            accountamount: updatedData?.accountamount || "",  // Ensure this gets updated
            cash: updatedData?.casshremarks || "",
            qr: updatedData?.qrremarks || "",
            "bank transfer": updatedData?.btremarks || "",
            director: updatedData?.msremarks || "",
            "phone pay": updatedData?.ppremarks || "",
            "cdm payment": updatedData?.cpremarks || "",
            cheque: updatedData?.chequestatus || "",
          });
          
        } else {
          toast({
            title: "Error",
            description: "Failed to submit remarks.",
            variant: "destructive",
          });
        }
      });
    };
    useEffect(() => {
      if (rmkData) {
        setRemarksData({
          accounts: rmkData?.accounremarks || "",
          accountamount:rmkData?.accountamount || "",
          cash: rmkData?.casshremarks || "",
          qr: rmkData?.qrremarks || "",
          "bank transfer": rmkData?.btremarks || "",
          director: rmkData?.msremarks || "",
          "phone pay": rmkData?.ppremarks || "",
          "cdm payment": rmkData?.cpremarks || "",
          cheque: rmkData?.chequestatus || "",
        });
      }
    }, [rmkData]);
    
    useEffect(() => {
      if (employeeId && selectedDate) {
        dispatch(fetchBsaPaymentRemarksByEmployeeAndDate({ employeeId, date: selectedDate }));
      }
    }, [employeeId, selectedDate, dispatch]);
    
   
    // ⬇️ Moved below entries definition
    const totalsByMop = (partyData?.entries || []).reduce((acc, curr) => {
      const mop = curr.mop?.toLowerCase();
      if (mop) {
        acc[mop] = (acc[mop] || 0) + Number(curr.collectedamount || 0);
      }
      return acc;
    }, {});
    
  useEffect(() => {
    if (employeeId && selectedDate) {
      dispatch(fetchBsaDailyLog({ employeeId, date: selectedDate }));
      dispatch(fetchBsaPartyCollectionByDate({ employeeId, date: selectedDate }));
    }
  }, [employeeId, selectedDate]);

  useEffect(() => {
    if (logData) {
      setLogFormData({
        employeeId,
        date: selectedDate,
        market: logData.market || "",
        lunch: logData.lunch || ""
      });
      setMarket(logData.market || "");
      setLunch(logData.lunch || "");
    }else{
      setLogFormData({
        employeeId,
        date: selectedDate,
        market: "",
        lunch: ""
      });
      setMarket("");
      setLunch("");

    }
  }, [logData]);

  const handleAddMarket = () => {
    dispatch(upsertBsaDailyLog({ ...logFormData, market })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: 'Market updated successfully' });
      } else {
        toast({ title: 'Error', description: 'Failed to update market', variant: 'destructive' });
      }
    });
  };

  const handleAddLunch = () => {
    dispatch(upsertBsaDailyLog({ ...logFormData, lunch })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: 'Lunch updated successfully' });
      } else {
        toast({ title: 'Error', description: 'Failed to update lunch', variant: 'destructive' });
      }
    });
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addRow = () => {
    setEntries([...entries, { partyname: '', billamount: '', collectedamount: '', mop: '' }]);
  };

  const removeRow = () => {
    if (entries.length > 1) {
      setEntries(entries.slice(0, -1));
    }
  };

  const handleSubmitCollection = () => {
    const formData = { employeeId, date: selectedDate, entries };
    dispatch(upsertBsaPartyCollection(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: 'Party Collection Submitted' });
        setEntries([{ partyname: '', billamount: '', collectedamount: '', mop: '' }]);
        dispatch(fetchBsaPartyCollectionByDate({ employeeId, date: selectedDate }));
      } else {
        toast({ title: 'Error', description: 'Failed to submit collection.', variant: 'destructive' });
      }
    });
  };

  const handleEditClick = (index, entry) => {
    setEditIndex(index);
    setEditedRow({ ...entry });
  };

  const handleEditChange = (field, value) => {
    setEditedRow(prev => ({ ...prev, [field]: value }));
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedRow(null);
  };

  const handleEditSave = (entryId) => {
    dispatch(editBsaPartyRowById({
      entryId,
      employeeId,
      date: selectedDate,
      updatedEntry: editedRow
    })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: 'Entry updated successfully' });
        setEditIndex(null);
        setEditedRow(null);
      } else {
        toast({ title: 'Error', description: 'Update failed', variant: 'destructive' });
      }
    });
  };

  const handleDeleteEntry = (entryId) => {
    dispatch(deleteBsaPartyRowById({ entryId, employeeId, date: selectedDate })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: 'Entry deleted successfully' });
      } else {
        toast({ title: 'Error', description: 'Failed to delete entry.', variant: 'destructive' });
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <div className="mb-6">
        <label className="font-semibold text-gray-700">Select Date:</label>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-1 ml-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={today}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-gray-700">Lunch:</p>
          <p>₹{lunch}</p>
          {/* <input
            type="number"
            value={lunch}
            onChange={(e) => setLunch(e.target.value)}
            className="border px-3 py-1 rounded w-full"
          /> */}
          {/* <button onClick={handleAddLunch} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Add Lunch</button> */}
        </div>

        <div>
          <p className="font-semibold text-gray-700">BLOCK:</p>
          <p>{logData?.market}</p>
          {/* <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="border px-3 py-1 rounded w-full"
          /> */}
          {/* <button onClick={handleAddMarket} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Add Market</button> */}
        </div>
      </div>

      {logFormData.market && (
        <>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-bold text-gray-800">Party Collection</h3>
              <div className="flex items-center space-x-3">
                <button onClick={addRow} type="button" className="text-green-600 hover:text-green-800">
                  <PlusCircle className="w-6 h-6" />
                </button>
                <button
                  onClick={removeRow}
                  type="button"
                  className={`text-red-600 hover:text-red-800 ${entries.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={entries.length === 1}
                >
                  <MinusCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input type="text" placeholder="Party Name" className="border rounded px-3 py-2" value={entry.partyname} onChange={(e) => handleInputChange(index, 'partyname', e.target.value)} />
                <input type="number" placeholder="Bill Amount" className="border rounded px-3 py-2" value={entry.billamount} onChange={(e) => handleInputChange(index, 'billamount', e.target.value)} />
                <input type="number" placeholder="Collected Amount" className="border rounded px-3 py-2" value={entry.collectedamount} onChange={(e) => handleInputChange(index, 'collectedamount', e.target.value)} />
                <select className="border rounded px-3 py-2" value={entry.mop} onChange={(e) => handleInputChange(index, 'mop', e.target.value)}>
                  <option value="">Mode of Payment</option>
                  <option value="cash"> Cash</option>
                  <option value="qr">QR</option>
                  <option value="bank transfer">Bank Transfer</option>
                  <option value="director">Director</option>
                  <option value="phone pay">Phone Pay</option>
                  <option value="cdm payment">CDM Payment</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
            ))}

            <button onClick={handleSubmitCollection} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit Entries</button>
          </div>

          {partyData?.entries?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-md font-bold text-gray-800 mb-2">Collected Entries</h3>
              <div className="w-60 sm:w-full overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded">
                  <thead className="bg-blue-100 text-gray-800">
                    <tr>
                      <th className="px-4 py-2 border">S.No</th>
                      <th className="px-4 py-2 border">Party Name</th>
                      <th className="px-4 py-2 border">Bill Amount</th>
                      <th className="px-4 py-2 border">Collected Amount</th>
                      <th className="px-4 py-2 border">MOP</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partyData.entries.map((entry, idx) => (
                      <tr key={entry._id || idx}>
                        <td className="border px-4 py-2">{idx + 1}</td>
                        {editIndex === idx ? (
                          <>
                            <td className="border px-4 py-2"><input value={editedRow.partyname} onChange={(e) => handleEditChange('partyname', e.target.value)} className="border px-2 py-1 rounded w-full" /></td>
                            <td className="border px-4 py-2"><input value={editedRow.billamount} onChange={(e) => handleEditChange('billamount', e.target.value)} type="number" className="border px-2 py-1 rounded w-full" /></td>
                            <td className="border px-4 py-2"><input value={editedRow.collectedamount} onChange={(e) => handleEditChange('collectedamount', e.target.value)} type="number" className="border px-2 py-1 rounded w-full" /></td>
                            <td className="border px-4 py-2">
                              <select value={editedRow.mop} onChange={(e) => handleEditChange('mop', e.target.value)} className="border px-2 py-1 rounded w-full">
                                <option value="cash">Cash</option>
                                <option value="qr">QR</option>
                                <option value="bank transfer">Bank Transfer</option>
                                <option value="director">Director</option>
                                <option value="phone pay">Phone Pay</option>
                                <option value="cdm payment">CDM Payment</option>
                                <option value="cheque">Cheque</option>
                              </select>
                            </td>
                            <td className="border px-4 py-2 space-x-2">
                              <button onClick={() => handleEditSave(entry._id)} className="text-green-600 hover:underline">Save</button>
                              <button onClick={handleEditCancel} className="text-gray-600 hover:underline">Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border px-4 py-2">{entry.partyname}</td>
                            <td className="border px-4 py-2">₹{entry.billamount}</td>
                            <td className="border px-4 py-2">₹{entry.collectedamount}</td>
                            <td className="border px-4 py-2">{entry.mop}</td>
                            <td className="border px-4 py-2 space-x-2">
                              <button onClick={() => handleEditClick(idx, entry)} className="text-blue-600 hover:underline">Edit</button>
                              <button onClick={() => handleDeleteEntry(entry._id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
  <tr className="bg-gray-100 font-semibold">
    <td className="border px-4 py-2 text-center" colSpan={2}>
      Total
    </td>
    <td className="border px-4 py-2 text-left">
      ₹{partyData.entries.reduce((acc, curr) => acc + Number(curr.billamount || 0), 0)}
    </td>
    <td className="border px-4 py-2 text-left">
      ₹{partyData.entries.reduce((acc, curr) => acc + Number(curr.collectedamount || 0), 0)}
    </td>
    <td className="border px-4 py-2" colSpan={2}></td>
  </tr>
</tfoot>
          
                </table>
              </div>
            </div>
          )}
        </>
      )}
<div className="mt-10">
  <h3 className="text-md font-bold text-gray-800 mb-2">Payment Remarks</h3>
  <div className="w-60 sm:w-full overflow-x-auto"> 
<table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
  <thead className="bg-blue-100 text-gray-800">
    <tr>
      <th className="px-4 py-2 border">S.No</th>
      <th className="px-4 py-2 border">Amount</th>
      <th className="px-4 py-2 border">To The</th>
      <th className="px-4 py-2 border">Remarks</th>
    </tr>
  </thead>
  <tbody>
  {[
    "accounts",
    "cash",
    "qr",
    "bank transfer",
    "director",
    "phone pay",
    "cdm payment",
    "cheque",
  ].map((label, idx) => (
    <tr key={label}>
      <td className="border px-4 py-2 text-center">{idx + 1}</td>
      <td className="border px-4 py-2 text-center">
        {label === "accounts" ? (
          // Special case for "accounts" to allow input
          <input
            type="number"
            value={remarksData.accountamount || ""}  // Ensure the amount is correctly displayed
            onChange={(e) => {
              // Update both accountamount and accounremarks when the accountamount changes
              const updatedAmount = e.target.value;
              setRemarksData({
                ...remarksData,
                accountamount: updatedAmount,  // Update the amount
              });
            }}
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter Account Amount"
          />
        ) : (
          `₹${totalsByMop[label] || 0}`
        )}
      </td>
      <td className="border px-4 py-2 text-center capitalize">{label}</td>
      <td className="border px-4 py-2">
        {label === "cheque" ? (
          <select
            value={remarksData.cheque}
            onChange={(e) =>
              setRemarksData({ ...remarksData, cheque: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">-- Select Status --</option>
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>
        ) : (
          <input
            type="text"
            value={remarksData[label]}
            onChange={(e) =>
              setRemarksData({ ...remarksData, [label]: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
            placeholder="Remarks..."
          />
        )}
      </td>
    </tr>
  ))}
</tbody>

  {/* ✅ Add this: Total row */}
<tfoot>
  <tr className="bg-gray-100 font-semibold">
    <td className="border px-4 py-2 text-center" colSpan={1}>
      Total
    </td>
    <td className="border px-4 py-2 text-center">
      ₹{
        Object.values(totalsByMop).reduce(
          (acc, val) => acc + Number(val || 0),
          0
        ) + (parseFloat(remarksData.accountamount) || 0) // Add accountamount to the total
      }
    </td>
    <td className="border px-4 py-2 text-center" colSpan={2}></td>
  </tr>
</tfoot>

</table>

    <div className="text-right mt-4">
      <button
        onClick={handleSubmitAllRemarks}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit All Remarks
      </button>
    </div>
  </div>
</div>


    </div>
  );
};


export default EmployeeBsaList