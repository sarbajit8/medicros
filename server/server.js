const express = require('express');
const mongoose = require('mongoose');
const path = require("path");

const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const authMRouter = require('./routes/auth/authm-routes');

const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminDistributorOrderRouter = require("./routes/admin/DistributorOrder-routes");


const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopDistributoCartRouter = require("./routes/shop/distributorCart-routes");

const distributorOrderRouter = require("./routes/shop/distributorOrder-routes");

const quickOrderRouter = require("./routes/shop/quickorder-routes");



const commonFeatureRouter = require("./routes/common/feature-routes");
const commonGalleryRouter = require("./routes/common/gallery-routes");
const adminEmployeeRouter = require("./routes/admin/employee-routes");

const EmployeeOrderRouter = require("./routes/employee/employeeOrder-routes");
const EmployeeLeaveRouter = require("./routes/employee/leaveApplication-routes");
const EmployeeSalaryRouter = require("./routes/employee/employeeSalarySlip-routes");
const EmployeeCustomerRouter = require("./routes/employee/employeeCustomer-routes");


const DistributorRouter = require("./routes/admin/distributor-routes");
const DistributorProductRouter = require("./routes/admin/DistributorProduct-routes");

const PcdRouter = require("./routes/admin/pcd-routes");
const PcdProductRouter = require("./routes/admin/pcdProducts-routes");
const PcdCartRouter = require("./routes/shop/pcdCart-routes");
const PcdOrderRouter = require("./routes/shop/pcdOrders-routes");
const AdminPcdOrdersRouter = require("./routes/admin/pcdOrders-routes");





const BrandRouter = require("./routes/admin/brand-routes");
const CategoryRouter = require("./routes/admin/category-routes");
const ExcelRouter = require("./routes/admin/excel-routes");


const WarningRouter = require("./routes/admin/warning-routes");

const ruleRoutes = require("./routes/admin/rules-routes");
const ligalRoutes = require("./routes/admin/legal-routes");
const careerRoutes = require("./routes/shop/career-routes");

const managerListRoutes = require("./routes/admin/managerList-routes");
const managerTableListRoutes = require("./routes/admin/managerTableList-routes");


const bsaListRoutes = require("./routes/admin/bsaList-routes");
const bsaListTableRoutes = require("./routes/admin/bsaListTable-routes");
const remerksRoutes = require("./routes/admin/paymentRemarks-routes");
const bsaRemerksRoutes = require("./routes/admin/bsaPaymentRemarks-routes");


const alertRoutes = require("./routes/admin/alert-routes");
const deleveryAlertRoutes = require("./routes/admin/deleveeryAlert-routes");

const notificationRoutes = require("./routes/admin/notification-routes");



const shopTestimonialsRouter = require("./routes/shop/testimonial-routes");
                                                              





// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongodb connected'))
.catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 4000;


app.use(
    cors(
        {
        origin: [
  process.env.CLIENT_BASE_URL,
  process.env.CLIENT_BASE_URL2,
],
        // origin: "http://localhost:5173",
        // origin:"*", 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true
    }
)
);


app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
    });
app.use('/api/auth', authRouter);
app.use('/api/auths', authMRouter);




app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/employee", adminEmployeeRouter);
app.use("/api/admin/distributor", DistributorRouter);
app.use("/api/admin/distributorproduct", DistributorProductRouter);





app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/distributorcart", shopDistributoCartRouter);

app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/distributororders", adminDistributorOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/testimonials", shopTestimonialsRouter);



app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/common/gallery", commonGalleryRouter);

app.use("/api/employee/orders", EmployeeOrderRouter);
app.use("/api/employee/leave", EmployeeLeaveRouter);
app.use("/api/employee/salary", EmployeeSalaryRouter);
app.use("/api/employee/customer", EmployeeCustomerRouter);



app.use("/api/admin/brand", BrandRouter);
app.use("/api/admin/category", CategoryRouter);
app.use("/api/admin/excel", ExcelRouter);

app.use("/api/shop/distributororder", distributorOrderRouter);
app.use("/api/shop/quick-orders", quickOrderRouter);

app.use("/api/admin/pcd", PcdRouter);

app.use("/api/admin/pcdProduct", PcdProductRouter);
app.use("/api/shop/pcdcart", PcdCartRouter);
app.use("/api/shop/pcdorder", PcdOrderRouter);


app.use("/api/admin/pcdorder", AdminPcdOrdersRouter);
app.use("/api/admin/warning", WarningRouter);
app.use("/api/admin/rules", ruleRoutes);
app.use("/api/admin/legal", ligalRoutes);
app.use("/api/shop/career", careerRoutes);
app.use("/api/admin/managerlist", managerListRoutes);
app.use("/api/admin/managertablelist", managerTableListRoutes);
app.use("/api/admin/bsalist", bsaListRoutes);
app.use("/api/admin/bsalisttable", bsaListTableRoutes);
app.use("/api/admin/remarks", remerksRoutes);
app.use("/api/admin/bsaremarks", bsaRemerksRoutes);
app.use("/api/admin/alert", alertRoutes);
app.use("/api/admin/deleveryalerts", deleveryAlertRoutes);
app.use("/api/admin/notification", notificationRoutes);





// ✅ In server.js (this is correct)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));







app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));