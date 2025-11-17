import { Search } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  export const addGalleryFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
      
    },
    {
      label: "Designation",
      name: "designation",
      componentType: "input",
      type: "text",
      placeholder: "Enter Designation ",
      
    },

    {
      label: "Type",
      name: "type",
      componentType: "select",
      options: [
        { id: "products", label: "Products" },
        { id: "employees", label: "Employees" },
        { id: "events", label: "Events" },

        { id: "others", label: "Others" },
        
     
      ],
    },


  ];
  export const addPaySleepElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },

  ];

  
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "tablets", label: "Tablets" },
        { id: "capsules", label: "Capsules" },
        { id: "syrups", label: "Syrups" },
        { id: "injections", label: "Injections" },
        { id: "dropsandsprays", label: "Drops & Sprays" },
      ],
    },
    
 
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const addEmployeeFormElements = [
    {
      label: "Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter employee name",
    },
    {
      label: "UserName",
      name: "username",
      componentType: "input",
      type: "email",
      placeholder: "Enter employee's username",
    },
  
    {
      label: "usertype",
      name: "usertype",
      componentType: "select",
      options: [
        { id: "sales", label: "sales" },
        { id: "delivery", label: "delivery" },
        { id: "admin", label: "Accounts & Admin" },
        { id: "floor", label: "Floor & Dispatch" },
        { id: "marketing", label: "Marketing" },
      ],
    },
    {
      label: "Password",
      name: "password",
      componentType: "input",
      type: "text",
      placeholder: "Enter employee's password",
    },
    
    {
      label: "Designation",
      name: "designation",
      componentType: "input",
      type: "text",
      placeholder: "Enter employee's designation",
    },
    {
      label: "Date Of Birth",
      name: "dateofbirth",
      componentType: "input",
      type: "date",
      placeholder: "Enter Date Of Birth",
    },
    {
      label: "Date Of Joining",
      name: "dateofjoining",
      componentType: "input",
      type: "date",
      placeholder: "Enter Joining Date",
    },
    {
      label: "Personal Contact Number",
      name: "personalcontact",
      componentType: "input",
      type: "tel",
      placeholder: "Enter employee's Personal Contact",
    },
    {
      label: "Official Contact Number",
      name: "officialcontact",
      componentType: "input",
      type: "tel",
      placeholder: "Enter employee's Official Contact",
    },
    {
      label: "Residential Address",
      name: "address",
      componentType: "textarea",
      placeholder: "Enter employee's address",
    },
    {
      label: "Adhar No / Voter Id No",
      name: "adharorvoter",
      componentType: "input",
      type: "text",
      placeholder: "Enter employee's Adhar No / Voter Id No",
    },
    {
      label: "PAN No",
      name: "pan",
      componentType: "input",
      type: "text",
      placeholder: "Enter employee's PAN No",
    },
    {
      label: "Security Cheque Details",
      name: "cheque",
      componentType: "textarea",
      placeholder: "Enter employee's cheque details",
    },



  ];
  export const addFeatureFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter title",
    },]
  export const addBrandsFormElements = [
    {
      label: "Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter brand name",
    },
     {
      label: "type",
      name: "type",
      componentType: "select",
      options: [
        { id: "normal", label: "normal" },
        { id: "populer", label: "populer" },
      
      ],
    },
    {
      label: "type2",
      name: "type2",
      componentType: "select",
      options: [
        { id: "normal", label: "normal" },
        { id: "mostselling", label: "mostselling" },
      
      ],
    },

    
  ];
  export const addEmployeeSideOrder = [
    {
      label: "Products Names",
      name: "product",
      componentType: "textarea",    
      placeholder: "Enter products names",
    },
    {
      label: "Quantity",
      name: "quantity",
      componentType: "input",
      type: "text",
      placeholder: "Enter product quantity",
    },
    {
      label: "Address",
      name: "address",
      componentType: "textarea",    
      placeholder: "Enter products address",
    },
 
    {
      label: "Pan/Gst No.",
      name: "pangst",
      componentType: "input",
      type: "text",
      placeholder: "Enter pan/gst number",
    },
  
    {
      label: "Drag Licence No.(Optional)",
      name: "draglicence",
      componentType: "input",
      type: "text",
      placeholder: "Enter drag licebce number",
    },
  ];
  export const addDistributors = [
    { label: "Name", name: "name", componentType: "input", type: "text" },
    { label: "Company Name", name: "companyname", componentType: "input", type: "text" }, // ✅
    { label: "UserName", name: "username", componentType: "input", type: "text" },
    { label: "Address", name: "address", componentType: "textarea" },
    { label: "Pin", name: "pin", componentType: "input", type: "text" },
    { label: "GST No", name: "gst", componentType: "input", type: "text" },               // ✅
    { label: "DL No", name: "dl", componentType: "input", type: "text" }, 
    { label: "Email", name: "email", componentType: "input", type: "email" },             // ✅                  
    { label: "Mobile", name: "mobile", componentType: "input", type: "text" },
  ];
  
  
  export const addDistributorProducts= [
    {
      label: "Name",
      name: "productname",
      componentType: "input", 
      type: "text",   
      placeholder: "Enter product names",
    },
    {
      label: "TotalStock",
      name: "totalStock",
      componentType: "input", 
      type: "number",   
      placeholder: "Enter product quantity",
    },
  ];
  export const addEmployeeLeaveApplication = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "enter application title",
    },
    {
      label: "Application",
      name: "application",
      componentType: "textarea",    
      placeholder: "write the application",
    },
  ];
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
      
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
   
    {
      id: "distributors",
      label: "distributors",
      path: "/shop/distributors",
    },
  
    {
      id: "gallery",
      label: "gallery",
      path: "/shop/gallery",
    },
    {
      id: "aboutus",
      label: "aboutus",
      path: "/shop/aboutus",
    },
    {
      id: "contactus",
      label: "contactus",
      path: "/shop/contactus",
    },   
    {
      id: "account",
      label: "account",
      path: "/shop/account",
    },  
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
 
  ];
  
  export const categoryOptionsMap = {
    tablets: "Tablets",
    capsules: "Capsules",
    syrups: "Syrups",
    Injections: "Injections",
    dropsandsprays: "Drops & Sprays",
  };
  
  export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
  };
  
  export const filterOptions = {
    category: [
      { id: "tablets", label: "Tablets" },
      { id: "capsules", label: "Capsules" },
      { id: "syrups", label: "Syrups" },
      { id: "injections", label: "Injections" },
      { id: "dropsandsprays", label: "Drops & Sprays" },
    ],
    // brand: [
    //   { id: "nike", label: "Nike" },
    //   { id: "adidas", label: "Adidas" },
    //   { id: "puma", label: "Puma" },
    //   { id: "levi", label: "Levi's" },
    //   { id: "zara", label: "Zara" },
    //   { id: "h&m", label: "H&M" },
    // ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Drag Licence Number",
      name: "deagLicence",
      componentType: "input",
      type: "text",
      placeholder: "Enter your Drag Licence Number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];
  