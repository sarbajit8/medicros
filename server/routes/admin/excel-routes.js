const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { importUser, getAllUsers, updateUser, deleteUser } = require("../../controllers/admin/excel-controller");

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static(path.join(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null, './public/uploads');
    },
    filename:(req, file, cb)=> {
        cb(null,file.originalname);
    }
})

var upload = multer({ storage: storage });


router.post("/importUser",upload.single('file'),importUser);
router.get('/getUsers', getAllUsers);
// Route to update a specific user by ID
router.put("/updateUser/:id", updateUser);
// Route to delete a specific user by ID
router.delete("/deleteUser/:id", deleteUser);



module.exports = router;
