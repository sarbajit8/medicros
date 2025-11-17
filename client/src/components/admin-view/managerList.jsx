import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { upsertManagerDailyLog, fetchManagerDailyLog } from '@/store/admin/managerList-slice';
import { useToast } from '@/hooks/use-toast';
import {deleteManagerPartyRowById, editManagerPartyRowById, fetchManagerPartyCollectionByDate, upsertManagerPartyCollection } from '@/store/admin/managerTableList-slice';
import { fetchPaymentRemarksByEmployeeAndDate, upsertPaymentRemarks } from '@/store/admin/paymentRemarks-slice';

const ManagerList = () => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [pricePerKm, setPricePerKm] = useState("");
  const [market, setMarket] = useState("");
  const { toast } = useToast();
  const { data: partyData } = useSelector((state) => state.managerTableList);
  const { data: rmkData } = useSelector((state) => state.remarks);

  const [editIndex, setEditIndex] = useState(null); // index of row being edited
  const [editedRow, setEditedRow] = useState(null); // data of the row being edited


  const [entries, setEntries] = useState([
    { partyname: '', billamount: '', collectedamount: '', mop: '' },
  ]);
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
    accounremarks: remarksData.accounts, // For remarks
    accountamount: remarksData.accountamount, // For amount
    casshremarks: remarksData.cash,
    qrremarks: remarksData.qr,
    btremarks: remarksData["bank transfer"],
    msremarks: remarksData.director,
    ppremarks: remarksData["phone pay"],
    cpremarks: remarksData["cdm payment"],
    chequestatus: remarksData.cheque || "pending",
  };

  console.log("Payload to submit:", payload);  // Debugging statement

  dispatch(upsertPaymentRemarks(payload)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      toast({ title: "All remarks submitted successfully." });

      // Clear the remark input fields after successful submission
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
      dispatch(fetchPaymentRemarksByEmployeeAndDate({ employeeId, date: selectedDate }));
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
  


  const [logFormData, setLogFormData] = useState({
    employeeId: employeeId,
    date: selectedDate,
    startkm: "",
    endkm: "",
    startimg:'',
    endimg:'',
    starttime: "",
    endtime: "",
    pricePerKm: "",
    fuel: "",
    lunch: "",
    totalamount: "",
    market: "",
  });

  const handleSubmitCollection = () => {
    const formData = {
      employeeId,
      date: selectedDate,
      entries,
    };
  
    dispatch(upsertManagerPartyCollection(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Party Collection Submitted",
        });
  
        // ✅ Reset the entries after successful submission
        setEntries([{ partyname: '', billamount: '', collectedamount: '', mop: '' }]);
        dispatch(fetchManagerPartyCollectionByDate({ employeeId, date: selectedDate }));

      } else {
        toast({
          title: "Error",
          description: "Failed to submit party collection.",
          variant: "destructive",
        });
      }
    });
  };


  const [popupImage, setPopupImage] = useState("");

  const { logData } = useSelector((state) => state.managerList);

  useEffect(() => {
    if (employeeId && selectedDate) {
      dispatch(fetchManagerDailyLog({ employeeId, date: selectedDate }));
    }
  }, [employeeId, selectedDate, dispatch]);

  useEffect(() => {
    setLogFormData((prev) => ({ ...prev, date: selectedDate }));
  }, [selectedDate]);

  useEffect(() => {
    if (employeeId && selectedDate) {
      dispatch(fetchManagerPartyCollectionByDate({ employeeId, date: selectedDate }));
    }
  }, [employeeId, selectedDate, dispatch]);
  
  useEffect(() => {
    if (logData && Object.keys(logData).length > 0) {
      setLogFormData({
        employeeId: employeeId,
        date: selectedDate,
        startkm: logData.startkm || '',
        endkm: logData.endkm || '',
        startimg: logData.startimg || '',
        endimg: logData.endimg || '',
        starttime: logData.starttime || '',
        endtime: logData.endtime || '',
        pricePerKm: logData.pricePerKm || '',
        fuel: logData.fuel || '',
        lunch: logData.lunch || '',
        totalamount: logData.totalamount || '',
        market: logData.market || '',
      });
      setPricePerKm(logData.pricePerKm || '');
      setMarket(logData.market || '');
    } else {
      setLogFormData({
        employeeId: employeeId,
        date: selectedDate,
        startkm: '',
        endkm: '',
        startimg:'',
        endimg:'',
        starttime: '',
        endtime: '',
        pricePerKm: '',
        fuel: '',
        lunch: '',
        totalamount: '',
        market: '',
      });
      setPricePerKm('');
      setMarket('');
    }
  }, [logData, employeeId, selectedDate]);

  const handleAddPricePerKm = () => {
    const updated = { ...logFormData, pricePerKm };
    dispatch(upsertManagerDailyLog(updated)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({
            title: "Data Added Successfully",
          });      } else {
            toast({
                title: "Error",
                description: "Failed to update Price per KM.",
                variant: "destructive",
              });      }
    });
  };
  
  const handleAddMarket = () => {
    const updated = { ...logFormData, market };
    dispatch(upsertManagerDailyLog(updated)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
            toast({
                title: "Data Added Successfully",
              });      } else {
                toast({
                    title: "Error",
                    description: "Failed to update Price per KM.",
                    variant: "destructive",
                  });      }
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

  const handleEditSave = (entryId) => {
    dispatch(editManagerPartyRowById({
      entryId,
      employeeId,
      date: selectedDate,
      updatedEntry: editedRow,
    })).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: "Entry updated successfully" });
        setEditIndex(null);
        setEditedRow(null);
      } else {
        toast({ title: "Error", description: "Update failed", variant: "destructive" });
      }
    });
  };
  const handleDeleteEntry = (entryId) => {
    console.log(entryId,"hhhhhhhhhhhhhhhhhhhhh");
    
    dispatch(deleteManagerPartyRowById({
      entryId,
       employeeId,
        date: selectedDate
      })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({ title: "Entry deleted successfully" });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete entry.",
          variant: "destructive",
        });
      }
    });
  };


  const kmTraveled = logFormData.endkm && logFormData.startkm ? logFormData.endkm - logFormData.startkm : 0;

  const isLogEmpty = Object.values(logFormData).every((val, i) => i < 2 || val === '');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Select Date:</label>
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-1"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">ManagerList</h1>

      <div className="bg-white shadow-xl rounded-xl p-6 border">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-blue-700">
            Date: {new Date(selectedDate).toLocaleDateString()}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-2">
  <p className="font-semibold text-gray-700">Start KM:</p>
  <p>{logFormData.startkm}</p>

  {logFormData.startimg && (
    <div>
      <button
        onClick={() => setPopupImage(logFormData.startimg)}
        className="text-blue-600 underline text-sm"
      >
        Show Start Image
      </button>
    </div>
  )}

  <p className="font-semibold text-gray-700">End KM:</p>
  <p>{logFormData.endkm}</p>

  {logFormData.endimg && (
    <div>
      <button
        onClick={() => setPopupImage(logFormData.endimg)}
        className="text-blue-600 underline text-sm"
      >
        Show End Image
      </button>
    </div>
  )}

  <p className="font-semibold text-gray-700">KM Travelled:</p>
  <p>{kmTraveled} km</p>
</div>
{popupImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="bg-white rounded shadow-xl p-4 max-w-xs w-full text-center">
      <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
      <img src={popupImage} alt="Preview" className="w-full h-auto object-contain rounded" />
      <button
        onClick={() => setPopupImage("")}
        className="mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
)}

          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Start Time:</p>
            <p>{logFormData.starttime}</p>
            <p className="font-semibold text-gray-700">End Time:</p>
            <p>{logFormData.endtime}</p>

            <div className="flex items-end gap-2">
              <div>
                <p className="font-semibold text-gray-700">Price per KM:</p>
                <input
                  type="number"
                  min="0"
                  value={pricePerKm}
                  onChange={(e) => setPricePerKm(e.target.value)}
                  placeholder="₹/km"
                  className="border border-gray-300 rounded px-2 py-1 w-24"
                />
              </div>
              <button
                onClick={handleAddPricePerKm}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Fuel:</p>
            <p>₹{logFormData.fuel}</p>
           <div>
              <p className="font-semibold text-gray-700">Lunch:</p>
              <p>₹{logFormData.lunch}</p>
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  min="0"
                  value={logFormData.lunch}
                  onChange={(e) =>
                    setLogFormData((prev) => ({ ...prev, lunch: e.target.value }))
                  }
                  placeholder="Enter lunch amount"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <button
                  onClick={() => {
                    const km = parseFloat(logFormData.endkm) - parseFloat(logFormData.startkm);
                    const price = parseFloat(logFormData.pricePerKm);
                    const fuel = !isNaN(km * price) ? km * price : 0;
                    const lunch = parseFloat(logFormData.lunch) || 0;
          
                    const updated = {
                      ...logFormData,
                      fuel: fuel.toFixed(2),
                      totalamount: (fuel + lunch).toFixed(2),
                    };
          
                    dispatch(upsertManagerDailyLog(updated)).then((res) => {
                      if (res.meta.requestStatus === 'fulfilled') {
                        toast({ title: "Lunch & Total updated" });
                      } else {
                        toast({
                          title: "Error",
                          description: "Failed to update expenses",
                          variant: "destructive",
                        });
                      }
                    });
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
            <p className="font-semibold text-gray-700">Total Expenses:</p>
            <p>₹{logFormData.totalamount}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="text-center">
            <p className="font-semibold text-gray-700">Market:</p>
            <input
              type="text"
              placeholder="Enter Market Name"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mt-1 text-center"
            />
            <div className="mt-2">
              <button
                onClick={handleAddMarket}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Market
              </button>
            </div>
          </div>
        </div>

        {!isLogEmpty && (
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
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Party Name</label>
                    <input
                      type="text"
                      value={entry.partyname}
                      onChange={(e) => handleInputChange(index, 'partyname', e.target.value)}
                      placeholder="Enter Party Name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bill Amount</label>
                    <input
                      type="number"
                      min="0"
                      value={entry.billamount}
                      onChange={(e) => handleInputChange(index, 'billamount', e.target.value)}
                      placeholder="₹"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Collected Amount</label>
                    <input
                      type="number"
                      min="0"
                      value={entry.collectedamount}
                      onChange={(e) => handleInputChange(index, 'collectedamount', e.target.value)}
                      placeholder="₹"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mode of Payment</label>
                    <select
                      value={entry.mop}
                      onChange={(e) => handleInputChange(index, 'mop', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select Mode</option>
                      <option value="cash">Cash</option>
                      <option value="qr">QR</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="director">Director</option>
                      <option value="phone pay">Phone Pay</option>
                      <option value="cdm payment">CDM Payment</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitCollection}
               className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
              >
             Submit Entry
               </button>

               {partyData?.entries?.length > 0 && (
  <div className="mt-10">
  <h3 className="text-md font-bold text-gray-800 mb-2">Collected Entries</h3>
  <div className="w-60 sm:w-full overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
        <thead className="bg-blue-100 text-gray-800">
          <tr>
            <th className="text-left px-4 py-2 border">S.No</th>
            <th className="text-left px-4 py-2 border">Party Name</th>
            <th className="text-left px-4 py-2 border">Bill Amount</th>
            <th className="text-left px-4 py-2 border">Collected Amount</th>
            <th className="text-left px-4 py-2 border">Mode of Payment</th>
            <th className="text-left px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {partyData.entries.map((entry, idx) => (
            <tr key={entry._id || idx} className="border-t">
              <td className="px-4 py-2 border">{idx + 1}</td>

              {editIndex === idx ? (
                <>
                  <td className="px-4 py-2 border">
                    <input
                      value={editedRow.partyname}
                      onChange={(e) => handleEditChange('partyname', e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      value={editedRow.billamount}
                      onChange={(e) => handleEditChange('billamount', e.target.value)}
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      value={editedRow.collectedamount}
                      onChange={(e) => handleEditChange('collectedamount', e.target.value)}
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={editedRow.mop}
                      onChange={(e) => handleEditChange('mop', e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="cash">Cash</option>
                      <option value="qr">QR</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="director">Director</option>
                      <option value="phone pay">Phone Pay</option>
                      <option value="cdm payment">CDM Payment</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEditSave(entry._id)}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border break-words max-w-xs">{entry.partyname}</td>
                  <td className="px-4 py-2 border">₹{entry.billamount}</td>
                  <td className="px-4 py-2 border">₹{entry.collectedamount}</td>
                  <td className="px-4 py-2 border">{entry.mop}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEditClick(idx, entry)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
      </div>
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

export default ManagerList;
