import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import authMReducer from "./authm-slice";


import AdminProductsSlice from "./admin/product-slice/index";
import AdminEmployeeSlice from "./admin/employee-slice/index";
import AdminBrandSlice from "./admin/brand-slice/index";




import shopProductsSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice";
import distributorShopCartSlice from "./shop/distributocart-slice";

import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import adminOrderSlice from "./admin/order-slice";
import adminDistributorOrderSlice from "./admin/distributorOrder-slice";

import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";
import galleryItemsSlice from "./gallery-slice";
import EmployeeOrderSlice from "./employee/employeeOrder-slice"

import EmployeeLeaveSlice from "./employee/employeeLeave-slice"
import EmployeeSalarySlice from "./employee/employeeSalary-slice"
import EmployeeCustomerSlice from "./employee/employeeCustomer-slice"


import DistributorSlice from "./admin/distributor-slice"
import DistributorProductSlice from "./admin/distributorProduct-slice"
import AdminCategorySlice from "./admin/category-slice"

import distributorOrderSlice from "./shop/distributorOrder-slice";
import quickOrderSlice from "./shop/quickorder-slice";

import adminPcdSlice from "./admin/pcd-slice";
import adminPcdProductSlice from "./admin/pcdProduct-slice"

import shopPcdCartSlice from "./shop/pcdCart-slice"
import shopPcdOrderSlice from "./shop/pcdOrders-slice"

import adminPcdOrderSlice from "./admin/pcdOrder-slice"

import warningSlice from "./admin/warning-slice"

import rulesSlice from "./admin/rules-slice"
import employeeLegalSlice from "./admin/legal-slice"
import careerSlice from "./shop/career-slice"
import managerListSlice from "./admin/managerList-slice"
import managerTableListSlice from "./admin/managerTableList-slice"
import bsaListSlice from "./admin/bsaList-slice"
import bsaTableListSlice from "./admin/bsaListTable-slice"
import remarksSlice from "./admin/paymentRemarks-slice"
import bsaRemarksSlice from "./admin/bsaPaymentRemarks-slice"
import alertSlice from "./admin/alert-slice"
import deleveryAlertSlice from "./admin/deleveryalert-slice"
import notificationSlice from "./admin/notification-slice"



import TestimonialsSlice from "./shop/testimonials-slice"






const store = configureStore({
    reducer:{
       auth: authReducer,
       authM:authMReducer,
       adminProducts: AdminProductsSlice,
       adminOrder: adminOrderSlice,
       adminEmployee: AdminEmployeeSlice,
       adminDistributorOrder:adminDistributorOrderSlice,


       shopProducts: shopProductsSlice,
       shopCart: shopCartSlice,
       shopDistributorCart: distributorShopCartSlice,

       shopAddress: shopAddressSlice,
       shopOrder: shopOrderSlice,
       shopSearch: shopSearchSlice,
       shopReview: shopReviewSlice,
       commonFeature: commonFeatureSlice,
       galleryItems: galleryItemsSlice,

       employeeOrder: EmployeeOrderSlice,
       employeeLeave: EmployeeLeaveSlice,
       employeeSalary: EmployeeSalarySlice,

       adminDistributor:DistributorSlice,
       DistributorProduct:DistributorProductSlice,
       adminBrand:AdminBrandSlice,
       adminCategory:AdminCategorySlice,

       distributorOrder:distributorOrderSlice,
       quickOrder:quickOrderSlice,
       employeeCustomer:EmployeeCustomerSlice,
       adminPcd :adminPcdSlice,
       adminPcdProduct: adminPcdProductSlice,
       shopPcdCart:shopPcdCartSlice,
       shopPcdOrder:shopPcdOrderSlice,
       adminPcdOrder:adminPcdOrderSlice,
       warning:warningSlice,
       rules:rulesSlice,
       employeeLegal:employeeLegalSlice,
       career:careerSlice,
       managerList:managerListSlice,
       managerTableList:managerTableListSlice,
       bsaList:bsaListSlice,
       bsaTableList:bsaTableListSlice,
       remarks:remarksSlice,
       bsaRemarks:bsaRemarksSlice,
       alert:alertSlice,
       deleveryAlert:deleveryAlertSlice,
       notification:notificationSlice,

       testimonials:TestimonialsSlice,
    }
})


export default store;