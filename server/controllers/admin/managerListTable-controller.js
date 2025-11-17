const ManagerPartyCollection = require("../../models/ManageListTable");

// Add or update party collection entries
const upsertManagerPartyCollection = async (req, res) => {
  try {
    const { employeeId, date, entries } = req.body;

    if (!employeeId || !date || !Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "employeeId, date, and at least one entry are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0); // normalize date to midnight

    // Check if document already exists
    let existingDoc = await ManagerPartyCollection.findOne({ employeeId, date: logDate });

    let updatedDoc;

    if (existingDoc) {
      // Append new entries to the existing array
      existingDoc.entries.push(...entries);
      updatedDoc = await existingDoc.save();
    } else {
      // Create new document
      const newDoc = new ManagerPartyCollection({
        employeeId,
        date: logDate,
        entries,
      });
      updatedDoc = await newDoc.save();
    }

    return res.status(200).json({
      success: true,
      message: existingDoc ? "Entries appended successfully" : "New party collection created",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error in upsertManagerPartyCollection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get manager party collection for specific employeeId and date
const getManagerPartyCollectionByDate = async (req, res) => {
    try {
      const { employeeId, date } = req.query;
  
      if (!employeeId || !date) {
        return res.status(400).json({
          success: false,
          message: "employeeId and date are required.",
        });
      }
  
      const logDate = new Date(date);
      logDate.setHours(0, 0, 0, 0); // normalize date to midnight
  
      const data = await ManagerPartyCollection.findOne({
        employeeId,
        date: logDate,
      });
  
      return res.status(200).json({
        success: true,
        data: data || null, // return null if no match found
      });
    } catch (error) {
      console.error("Error in getManagerPartyCollectionByDate:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };



  // DELETE a party collection entry by tableId
  const deleteManagerPartyCollectionEntryById = async (req, res) => {
    try {
      const { entryId, employeeId, date } = req.query;
  
      if (!employeeId || !date || !entryId) {
        return res.status(400).json({
          success: false,
          message: "employeeId, date, and entryId are required.",
        });
      }
  
      const logDate = new Date(date);
      logDate.setHours(0, 0, 0, 0);
  
      const doc = await ManagerPartyCollection.findOne({
        employeeId,
        date: logDate,
      });
  
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: "No party collection found for this employee and date.",
        });
      }
  
      const index = doc.entries.findIndex(entry => entry._id.toString() === entryId);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Entry not found.",
        });
      }
  
      doc.entries.splice(index, 1); // remove the entry
  
      // Ensure at least one entry is present or handle the case if you allow an empty array
      if (doc.entries.length === 0) {
        // Add a placeholder entry or handle the case accordingly
        doc.entries.push({
          partyname: "No entries available",
          billamount: 0,
          collectedamount: 0,
          mop: "none",
        });
      }
  
      await doc.save();
  
      return res.status(200).json({
        success: true,
        message: "Entry deleted successfully.",
        data: doc,
      });
    } catch (error) {
      console.error("Error in deleteManagerPartyCollectionEntryById:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  


// EDIT a party collection entry by tableId
const editManagerPartyCollectionEntryById = async (req, res) => {
  try {
    const {entryId, employeeId, date, updatedEntry } = req.body;

    if (!employeeId || !date || !entryId || !updatedEntry) {
      return res.status(400).json({
        success: false,
        message: "employeeId, date, entryId, and updatedEntry are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const doc = await ManagerPartyCollection.findOne({ employeeId, date: logDate });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "No party collection found for this employee and date.",
      });
    }

    const entry = doc.entries.id(entryId);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found.",
      });
    }

    // Update fields
    Object.assign(entry, updatedEntry);
    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Entry updated successfully.",
      data: doc,
    });
  } catch (error) {
    console.error("Error in editManagerPartyCollectionEntryById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

  

  module.exports = {
    upsertManagerPartyCollection,
    getManagerPartyCollectionByDate,
    deleteManagerPartyCollectionEntryById,
    editManagerPartyCollectionEntryById,
  };
  