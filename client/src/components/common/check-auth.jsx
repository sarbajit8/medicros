import { Navigate, useLocation } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';

function CheckAuth({ children }) {
  const location = useLocation();
  const { user, isSignedIn } = useUser();

  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

  // Home route redirect logic
  if (location.pathname === "/") {
    if (!isSignedIn) {
      return <Navigate to="/shop/home" />;
    } else {
      if (userEmail === "sarbajitpaul8@gmail.com") {
        return <Navigate to="/admin/dashboard" />;
      } else if (userEmail === "medicrossremedies.ac@gmail.com") {
        return <Navigate to="/jradmin/orders" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Allow unauthenticated access to public shop routes
  const publicShopPaths = [
    "/login", "/register", "/shop/home", "/shop/listing", "/shop/gallery", "/shop/search",
    "/shop/distributors", "/shop/aboutus", "/shop/contactus", "/shop/paymentsuccess",
    "/shop/pcd-manufacturer", "/shop/freeproducts", "/shop/margin", "/shop/generic",
    "/shop/discount", "/shop/career", "/shop/quickrequirement", "/shop/available-products",
    "/shop/productdetailpage","/shop/howtoregister","/shop/termsandconditions","/shop/privacypolicy"
    ,"/shop/refundpolicy"
  ];

  const isPublic = publicShopPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!isSignedIn && !isPublic) {
    return <Navigate to="/" />;
  }

  // Block access to admin routes for non-admins
  if (
    isSignedIn &&
    userEmail !== "sarbajitpaul8@gmail.com" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Block access to jradmin routes for non-jradmins
  if (
    isSignedIn &&
    userEmail !== "medicrossremedies.ac@gmail.com" &&
    location.pathname.includes("/jradmin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Redirect admin from /shop
  if (
    isSignedIn &&
    userEmail === "sarbajitpaul8@gmail.com" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Redirect jradmin from /shop
  if (
    isSignedIn &&
    userEmail === "medicrossremedies.ac@gmail.com" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/jradmin/orders" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
