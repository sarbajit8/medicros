const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    image: String,
    name: {type: String,
         required: true,},
    username: {type: String,
              required: true,
              unique: true,},
    usertype: {type: String,
                required: true,
                },
    usersubtype: {type: String,
                  },
    password: {
                type: String,
                required: true,
              },
    designation: {type: String,
                },
    dateofbirth: {type: String,
                },
    dateofjoining: {type: String,
                },
    personalcontact: {type: String,
                },
    officialcontact: {type: String,
                },
    address: {type: String,
              },
    adharorvoter: {type: String,
                  }, 
    pan: {type: String,
                  },    
    cheque: {type: String,},

     },
);

module.exports = mongoose.model("Employee", EmployeeSchema);