import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import ShopingLayout from './components/shopping-view/layout'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPge from './pages/shopping-view/payment-success'
import CodReturn from './pages/shopping-view/cod-return'
import Gallery from './pages/shopping-view/gallery'
import SearchProducts from './pages/shopping-view/search'
import AdminGallery from './pages/admin-view/gallery'
import AboutUs from './pages/shopping-view/aboutUs'
import DirectorDesk from './pages/shopping-view/directorDesk'
import ContactUs from './pages/shopping-view/contactUs'
import EmployeeLayout from './components/employee-view/employeeLayout'
import EmployeeLogin from './pages/employee-view/employeeLogin'
import ManageEmployee from './pages/admin-view/manageEmployee'
import EmployeeDashboard from './pages/employee-view/employee-dashboard'
import CheckEmployeeAuth from './components/common/check-employeeauth'
import { checkEpAuth } from './store/admin/employee-slice'
import EmployeeProfile from './pages/employee-view/employeeProfile'
import EmployeeOrders from './pages/admin-view/employeeOrders'
import EmployeeDesk from './pages/admin-view/employeeDesk'
import SalarySlipByEmployee from './components/admin-view/salarySlipByEmployee'
import Distributors from './pages/shopping-view/distributors'
import AdminDistributors from './pages/admin-view/distributors'
import DistributorProducts from './components/admin-view/distributorProducts'
import ShoppingDistributorProducts from './components/shopping-view/distributorProducts'
import DeliveryDashboard from './pages/employee-view/delivery-dashboard'
import DeleveryLayout from './components/delivery-view/layout'
import ProductDetailPage from './pages/shopping-view/productDetails'
import AddBrand from './pages/admin-view/addBrand'
import AddCategoty from './pages/admin-view/addCategory'
import DistributorCheckout from './pages/shopping-view/distributorsCheckout'
import DistributorCodReturn from './pages/shopping-view/distributorCod-return'
import AdminDistributorOrders from './pages/admin-view/distributorOrder'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import FreeProductsScheme from './pages/shopping-view/freeProduct'
import Margin from './pages/shopping-view/margin'
import Generic from './pages/shopping-view/generic'
import Discount from './pages/shopping-view/discount'
import GenericByComposition from './components/shopping-view/genericByComposition'
import GenericByCompany from './components/shopping-view/genericByCompany'
import HowtoRegister from './components/shopping-view/howtoRegister'
import QuickRequirement from './pages/shopping-view/quickRequirement'
import Quickorder from './pages/admin-view/quickorder'
import EmployeeCustomers from './pages/employee-view/employeeCustomers'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import Excel from './pages/admin-view/excelAdd'
import OtherDashboard from './components/delivery-view/OtherDashboard'
import DeliveryProfile from './pages/employee-view/delivery-profile'
import PcdManufacturer from './pages/admin-view/pcdManufacturer'
import PcdProducts from './components/admin-view/pcdProducts'
import ShopPcdManufacturer from './pages/shopping-view/pcdManufacturer'
import ShoppingPcdProductById from './components/shopping-view/shoppingPcdProduct'
import PcdCheckout from './pages/shopping-view/pcdCheckout'
import PcdCodReturn from './pages/shopping-view/pcdCod-return'
import AdminPcdOrders from './pages/admin-view/pcdOrders'
import GiveWarning from './components/admin-view/giveWarning'
import RulesRegulations from './pages/admin-view/rulesRegulations'
import LegalNotice from './components/admin-view/legalNotice'
import Career from './components/shopping-view/career'
import CareerList from './components/admin-view/career'
import BsaList from './components/admin-view/bsaList'
import ManagerList from './components/admin-view/managerList'
import EmployeeBsaList from './components/employee-view/employeeBsaList'
import EmployeeManagerList from './components/employee-view/employeeManagerList'
import ExcelProdicts from './pages/shopping-view/excelProdicts'
import SemiAdminLayout from './components/semiadmin-view/layout'
import SemiAdminOrders from './pages/semiadmin-view/orders'
import SemiAdminDistributorOrders from './pages/semiadmin-view/distributorOrders'
import SemiAdminPcdOrders from './pages/semiadmin-view/pcdOrders'
import SemiEmployeeOrders from './pages/semiadmin-view/employeeOrders'
import Notification from './pages/admin-view/notification'
import EmployeeNotification from './components/employee-view/employee-notification'
import DeleveryNotification from './components/delivery-view/deleveryNotifications'
import Testimonials from './pages/admin-view/Testimonials'
import TermsAndConditions from './pages/shopping-view/trmsandconditions'
import PrivacyPolicy from './pages/shopping-view/privacypolicy'
import Refundpolicy from './components/shopping-view/refundpolicy'
import RefundPolicy from './components/shopping-view/refundpolicy'




const App = () => {
  const { user } = useUser();

    // const {user,isAuthenticated,isLoading} = useSelector(state=> state.auth)
    const {isAuthenticatedEmployee,isEpLoading} = useSelector(state=> state.adminEmployee)
    const { EmployeeList,employee } = useSelector(state => state.adminEmployee);
    
      // const isAuthenticatedEmployee = false;
          
 const dispatch = useDispatch();


//  async function requestPermission(){

//   const permission = Notification.requestPermission();
//   if(permission === 'granted'){
//    const token = await getToken(messaging,{vapidKey:'BGZ3NPL09CVoaaFUx0nOdB_vlNLMWRgI7cYX_9aKN8DxdkduLsaJsaB0ym-aceAEUelYY0yyMREn20nGj3yDUdM'});
//    console.log("token gen",token);
   
//   }else if (permission === 'denied'){
//     alert('you denied for the notification')
//   }
//  }
//  useEffect(() => {
// requestPermission();
 
  
//  }, [])
 

 useEffect(() => {
  // const token= JSON.parse(sessionStorage.getItem('token'))
   dispatch(checkAuth());
 }, [dispatch]);
 useEffect(() => {
  // const token= JSON.parse(sessionStorage.getItem('token'))
   dispatch(checkEpAuth());
 }, [dispatch]);
//  if(isEpLoading)return<div className="flex items-center justify-center h-screen">
//  <Skeleton className="w-[60px] h-[60px] bg-blue-600 rounded-full" />
// </div>
//  if(isLoading)return<div className="flex items-center justify-center h-screen">
//   <Skeleton className="w-[60px] h-[60px] bg-blue-600 rounded-full" />
// </div>
  return (
   <div className='flex flex-col overflow-hidden bg-white'>
    {/* common components */}
    {/* <h1>Header component</h1>*/}
    <Routes>
      <Route path='/'element={
       <CheckAuth  >
       <AuthLayout />
       </CheckAuth>
       }
    

      />
  <Route path='/auth' element={
      <CheckAuth >
        <AuthLayout />
      </CheckAuth>
     }>
    <Route path='login' element={<AuthLogin />} />
    <Route path='register' element={<AuthRegister />}/>
  </Route>

  <Route path="/jradmin" element={
    <CheckAuth  >
      <SemiAdminLayout/>
    </CheckAuth>
  }>
         <Route path='orders' element={<SemiAdminOrders />}/>
        <Route path='distributororders' element={<SemiAdminDistributorOrders />}/>
       <Route path='pcd-orders' element={<SemiAdminPcdOrders />}/>
      <Route path='employeeorders' element={<SemiEmployeeOrders />}/>
  </Route>





  <Route path="/admin" element={
    <CheckAuth  >
      <AdminLayout />
    </CheckAuth>
  }>
    <Route path="dashboard" element={<AdminDashboard />}/>
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="distributororders" element={<AdminDistributorOrders/>} />
    <Route path="features" element={<AdminFeatures />} />
    <Route path="gallery" element={<AdminGallery />} />
    <Route path="manageemployee" element={<ManageEmployee />} />
    <Route path="employeeorders" element={<EmployeeOrders />} />
    <Route path="employeedesk" element={<EmployeeDesk/>} />
    <Route path="salaryslipbyemployee/:employeeId" element={<SalarySlipByEmployee/>} />
    <Route path="distributors" element={<AdminDistributors/>}/>
    <Route path="DistributorProducts/:distributorId/:distributorName" element={<DistributorProducts/>} />
    <Route path="brands" element={<AddBrand/>}/>
    <Route path="category" element={<AddCategoty/>}/>
    <Route path="quickorder" element={<Quickorder/>}/>
    <Route path="excel" element={<Excel/>}/>
    <Route path="pcd" element={<PcdManufacturer/>}/>
    <Route path="PcdProducts/:pcdId/:pcdName" element={<PcdProducts/>} />
    <Route path="pcd-orders" element={<AdminPcdOrders/>}/>
    <Route path="warningemployee/:employeeId" element={<GiveWarning/>}/>
    <Route path="rules" element={<RulesRegulations/>}/>
    <Route path="legal/:employeeId" element={<LegalNotice/>}/>
    <Route path="career" element={<CareerList/>}/>
    <Route path="managerlist/:employeeId" element={<ManagerList/>}/>
    <Route path="bsalist/:employeeId" element={<BsaList/>}/>

    <Route path="testimonials" element={<Testimonials/>}/>
    <Route path="notification" element={<Notification/>}/>



    

    
    

  </Route>
  <Route path="/shop" element={
    <CheckAuth  >
      <ShopingLayout />
    </CheckAuth>
  }>   
    <Route path="*" element={<NotFound />} /> 
    <Route path="home" element={<ShoppingHome />} /> 
    <Route path="listing" element={<ShoppingListing />} /> 
    <Route path="checkout" element={<ShoppingCheckout />} /> 
    <Route path="distributorcheckout" element={<DistributorCheckout />} /> 

    
    <Route path="account" element={<ShoppingAccount />} /> 
    <Route path="paypal-return" element={<PaypalReturnPage />} /> 
    <Route path="payment-success" element={<PaymentSuccessPge />} /> 
    <Route path="cod-return" element={<CodReturn/>} /> 
    <Route path="distributor-cod-return" element={<DistributorCodReturn/>} /> 

    
    <Route path="gallery" element={<Gallery/>} /> 
    <Route path="search" element={<SearchProducts/>}/>
    <Route path="aboutus" element={<AboutUs/>} />
    <Route path="contactus" element={<ContactUs/>}/>
    <Route path="directordesk" element={<DirectorDesk/>}/>
    <Route path="distributors" element={<Distributors/>}/>
    <Route path="ShoppingDistributorProducts/:distributorId" element={<ShoppingDistributorProducts/>} />
    <Route path="productdetailpage/:productId" element={<ProductDetailPage/>}/>
    <Route path="freeproducts" element={<FreeProductsScheme/>}/>
    <Route path="margin/:percent" element={<Margin/>}/>
    <Route path="generic" element={<Generic/>}/>
    <Route path="discount" element={<Discount/>}/>
    <Route path="genericbycomposition/:composition" element={<GenericByComposition/>}/>
    <Route path="genericbycompany/:company" element={<GenericByCompany/>}/>
    <Route path="howtoregister" element={<HowtoRegister/>}/>
    <Route path="quickrequirement" element={<QuickRequirement/>}/>
    <Route path="paymentsuccess" element={<PaymentSuccessPage/>}/>
    <Route path="pcd-manufacturer" element={<ShopPcdManufacturer/>}/>
    <Route path="shoppingpcdproductbyid/:pcdId" element={<ShoppingPcdProductById/>} />

    <Route path="pcdcheckout" element={<PcdCheckout />} /> 
    <Route path="pcd-cod-return" element={<PcdCodReturn/>} /> 
    <Route path="career" element={<Career/>} /> 
    <Route path="available-products" element={<ExcelProdicts/>} /> 

    <Route path="termsandconditions" element={<TermsAndConditions/>} /> 
    <Route path="privacypolicy" element={<PrivacyPolicy/>} /> 
    <Route path="refundpolicy" element={<RefundPolicy/>} /> 

    

   
    




  </Route>
  <Route path='/unauth-page' element={<UnauthPage/>}/>
  <Route path='/employeelogin' element={
        <CheckEmployeeAuth isAuthenticatedEmployee={employee} employee={employee}>

    <EmployeeLogin/>
    </CheckEmployeeAuth>
  }
   />
  <Route path="/employee" element={
    
    <CheckEmployeeAuth isAuthenticatedEmployee={employee} employee={employee}>
           <EmployeeLayout/>
    </CheckEmployeeAuth>
   }>
  <Route path="dashboard" element={<EmployeeDashboard/>}/>
  <Route path="profile" element={<EmployeeProfile/>}/>
  <Route path="customers" element={<EmployeeCustomers/>}/>
  <Route path="bsa" element={<EmployeeBsaList/>}/>
  <Route path="manager" element={<EmployeeManagerList/>}/>
  <Route path="notifications" element={<EmployeeNotification/>}/>



  

  </Route>

 <Route path="/delivery" element={
  <CheckEmployeeAuth isAuthenticatedEmployee={isAuthenticatedEmployee} employee={employee}>
  <DeleveryLayout/>
  </CheckEmployeeAuth>
  }>
 <Route path="dashboard" element={<DeliveryDashboard/>}/>
 <Route path="profile" element={<DeliveryProfile/>}/>
  <Route path="notifications" element={<DeleveryNotification/>}/>


</Route>
<Route path="/other" element={
  <CheckEmployeeAuth isAuthenticatedEmployee={isAuthenticatedEmployee} employee={employee}>
  <OtherDashboard/>
  </CheckEmployeeAuth>
  }/>
<Route path='/productdetailpage' element={<ProductDetailPage/>}/>



</Routes>

   </div>
  )
}

export default App