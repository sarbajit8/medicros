import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
// import { motion } from "framer-motion";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r ">
      <div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="p-8 max-w-lg text-center shadow-xl bg-white rounded-2xl">
          <CardHeader className="p-0 flex flex-col items-center">
            <div
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
              className="text-green-600"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-semibold mt-4 text-gray-800">
              Order Placed Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 mt-2">
            <p>Thank you for your purchase. Your order has been placed successfully.</p>
          </CardContent>
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
              onClick={() => navigate("/shop/account")}
            >
              View Orders
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;

