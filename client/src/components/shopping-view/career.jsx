import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCareer, fetchAllCareer, verifyPayment } from '@/store/shop/career-slice';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addNotification } from '@/store/admin/notification-slice';
import { useUser } from '@clerk/clerk-react'; // or your auth provider

// Separate CareerCard component for listing if needed
const CareerCard = ({ career, onJobSubmit, onInternshipPayment }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    {career.type.toLowerCase() === 'job' ? (
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        onClick={() => onJobSubmit(career._id)}
      >
        Submit Application
      </Button>
    ) : (
      <Button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        onClick={() => onInternshipPayment(career._id)}
      >
        Pay Now & Apply
      </Button>
    )}
  </div>
);

// Utility to dynamically load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Career = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useUser();
  const { careerList, isLoading, paymentStatus, paymentError } = useSelector(state => state.career);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Internship',
    address: '',
    image: null,
    duration: '3 months - 1000rs',
  });

  useEffect(() => {
    dispatch(fetchAllCareer());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'type' && value !== 'Internship') {
        return { ...prev, [name]: value, duration: '' };
      }
      if (name === 'type' && value === 'Internship' && !prev.duration) {
        return { ...prev, [name]: value, duration: '3 months - 1000rs' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      type: 'Internship',
      address: '',
      image: null,
      duration: '3 months - 1000rs',
    });
  };

  const launchRazorpay = async (payment) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast({ title: "Failed to load Razorpay SDK", variant: "destructive" });
      return;
    }

    const {
      amount,
      currency,
      razorpayOrderId,
      razorpayKeyId,
      order
    } = payment;

    const options = {
      key: razorpayKeyId,
      amount: amount * 100, // amount in paise
      currency,
      name: "Your Company Name",
      description: order.notes?.planName || "Internship Payment",
      order_id: razorpayOrderId,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc"
      },
      handler: function (response) {
        dispatch(verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }))
          .unwrap()
          .then(res => {
            if (res.success) {
              toast({
                title: "Payment successful!",
                description: "Your internship application is complete."
              });
              dispatch(fetchAllCareer());
              resetForm();
            } else {
              toast({ title: "Payment verification failed", description: res.message, variant: "destructive" });
            }
          })
          .catch(() => {
            toast({ title: "Payment verification failed", variant: "destructive" });
          });
      },
      modal: {
        ondismiss: function () {
          toast({ title: "Payment cancelled", variant: "destructive" });
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      toast({ title: "Payment failed", description: response.error.description, variant: "destructive" });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.type === 'Internship' && !user) {
      toast({
        title: "Please login",
        description: "You need to login to apply for internships.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.image || formData.image.type !== 'application/pdf') {
      toast({ title: "Please upload a valid PDF file." });
      return;
    }

    if (formData.type === 'Internship' && !formData.duration) {
      toast({ title: "Please select a duration for the internship." });
      return;
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        formPayload.append(key, formData[key]);
      }
    });
    formPayload.append("date", new Date().toISOString());
    if (user?.id) formPayload.append("userId", user.id);

    try {
      const response = await dispatch(addCareer(formPayload)).unwrap();

      if (response.success) {
        if (response.payment) {
          launchRazorpay(response.payment);
        } else {
          toast({ title: "Career application submitted!" });
          dispatch(fetchAllCareer());
          dispatch(addNotification({
            title: "Career Alert",
            description: "New career application added"
          }));
          resetForm();
        }
      } else {
        toast({ title: "Submission error", description: response.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error submitting application", variant: "destructive" });
      console.error("Submission error:", error);
    }
  };

  const handleJobSubmit = (careerId) => {
    console.log('Submitting job application:', careerId);
    // Implement job application logic here
  };

  const handleInternshipPayment = (careerId) => {
    console.log('Processing internship payment:', careerId);
    // Implement payment flow if you want buttons in list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-violet-800 mb-2">Apply for a Career</h1>
        <p className="text-lg text-gray-700">Submit your resume and details to join our team</p>
      </div>

      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border p-2 rounded"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-50"
            required
          >
            <option value="Internship">Internship</option>
            <option value="Job">Job</option>
          </select>

          {formData.type === 'Internship' && (
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-50"
              required
            >
              <option value="3 months - 1000rs">3 months - 1000rs</option>
              <option value="6 months - 3000rs">6 months - 3000rs</option>
              <option value="9 months - 4000rs">9 months - 4000rs</option>
              <option value="12 months - 6000rs">12 months - 6000rs</option>
            </select>
          )}

          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Cv</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full border p-2 rounded bg-gray-50"
              required
              aria-label="Add Cv"
            />
            <p className="text-xs text-gray-500 mt-1">Upload CV (PDF only)</p>
          </div>

          {formData.type === 'Job' ? (
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          ) : (
            <div>
              <Button
                type="submit"
                disabled={!user || isLoading}
                className={`w-full text-white font-semibold transition-all ${
                  user
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                    : 'bg-green-400 opacity-50 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Processing...' : 'Pay Now & Apply'}
              </Button>
              {!user && (
                <p className="text-sm text-red-600 text-center mt-2 font-medium">
                  Please login to submit your internship application
                </p>
              )}
              {paymentError && (
                <p className="text-sm text-red-600 text-center mt-2 font-medium">{paymentError}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Career;
