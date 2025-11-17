const BsaPartyCollection = require("../../models/BsaListTable");

// Add or update BSA party collection entries
const upsertBsaPartyCollection = async (req, res) => {
  try {
    const { employeeId, date, entries } = req.body;

    if (!employeeId || !date || !Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "employeeId, date, and at least one entry are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0); // normalize date

    let existingDoc = await BsaPartyCollection.findOne({ employeeId, date: logDate });

    let updatedDoc;
    if (existingDoc) {
      existingDoc.entries.push(...entries);
      updatedDoc = await existingDoc.save();
    } else {
      const newDoc = new BsaPartyCollection({ employeeId, date: logDate, entries });
      updatedDoc = await newDoc.save();
    }

    return res.status(200).json({
      success: true,
      message: existingDoc ? "Entries appended successfully" : "New party collection created",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error in upsertBsaPartyCollection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get BSA party collection for specific employeeId and date
const getBsaPartyCollectionByDate = async (req, res) => {
  try {
    const { employeeId, date } = req.query;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const data = await BsaPartyCollection.findOne({
      employeeId,
      date: logDate,
    });

    return res.status(200).json({
      success: true,
      data: data || null,
    });
  } catch (error) {
    console.error("Error in getBsaPartyCollectionByDate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a BSA party collection entry by entryId
// DELETE a BSA party collection entry by entryId
const deleteBsaPartyCollectionEntryById = async (req, res) => {
  try {
    const { entryId, employeeId, date } = req.query;

    // Validate required fields
    if (!employeeId || !date || !entryId) {
      return res.status(400).json({
        success: false,
        message: "employeeId, date, and entryId are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0); // Normalize date to match exactly

    // Find the BSA party collection document for the given employee and date
    const doc = await BsaPartyCollection.findOne({
      employeeId,
      date: logDate,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "No party collection found for this employee and date.",
      });
    }

    // Find the party entry index
    const index = doc.entries.findIndex(entry => entry._id.toString() === entryId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Entry not found.",
      });
    }

    // Remove the entry from the entries array
    doc.entries.splice(index, 1);

    // Ensure that at least one entry is present or handle empty array accordingly
    if (doc.entries.length === 0) {
      // Optionally, add a placeholder entry when all entries are deleted
      doc.entries.push({
        partyname: "No entries available",
        billamount: 0,
        collectedamount: 0,
        mop: "none",
      });
    }

    // Save the updated document
    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Entry deleted successfully.",
      data: doc,
    });
  } catch (error) {
    console.error("Error in deleteBsaPartyCollectionEntryById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  deleteBsaPartyCollectionEntryById,
};


// Edit a BSA party collection entry by entryId
const editBsaPartyCollectionEntryById = async (req, res) => {
  try {
    const { entryId, employeeId, date, updatedEntry } = req.body;

    if (!employeeId || !date || !entryId || !updatedEntry) {
      return res.status(400).json({
        success: false,
        message: "employeeId, date, entryId, and updatedEntry are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const doc = await BsaPartyCollection.findOne({ employeeId, date: logDate });

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

    Object.assign(entry, updatedEntry);
    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Entry updated successfully.",
      data: doc,
    });
  } catch (error) {
    console.error("Error in editBsaPartyCollectionEntryById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  upsertBsaPartyCollection,
  getBsaPartyCollectionByDate,
  deleteBsaPartyCollectionEntryById,
  editBsaPartyCollectionEntryById,
};
