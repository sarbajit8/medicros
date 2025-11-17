var User = require('../../models/excel');
var csv = require('csvtojson');


const importUser = async(req,res) => {
  try {
    
    var userData = [];

    csv()
    .fromFile(req.file.path)
    .then(async(response) => {

     for(var x = 0; x < response.length; x++) {
      userData.push({
        title: response[x].title,
        brand: response[x].brand,

      });

     }

    await User.insertMany(userData);


      console.log(response);
      
    });

    res.send({status:200, success:true, msg:"inserted successfully"});

    
  } catch (error) {
    res.send({status:400, success:false, msg:error.message});
    
  }

}



// Controller method to fetch all users (excel data)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all data from the 'excel' collection
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).send({ status: 404, success: false, msg: "No data found" });
    }

    // Return the fetched data
    res.status(200).send({ status: 200, success: true, msg: "Data fetched successfully", data: users });
  } catch (error) {
    // Handle any errors
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};


// Controller method to update a user (excel data)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;  // Getting the user ID from request parameters
    const { title, brand } = req.body;  // Getting the new title and brand from request body

    // Find the user by ID and update it
    const updatedUser = await User.findByIdAndUpdate(id, { title, brand }, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ status: 404, success: false, msg: "User not found" });
    }

    // Return the updated user data
    res.status(200).send({ status: 200, success: true, msg: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};

// Controller method to delete a user (excel data)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  // Getting the user ID from request parameters

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ status: 404, success: false, msg: "User not found" });
    }

    // Return a success message
    res.status(200).send({ status: 200, success: true, msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};





module.exports = {
  importUser,
  getAllUsers,
  updateUser,
  deleteUser
}