import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  const [shippingData, setShippingData] = useState({
    firstName: 'Balraj',
    lastName: 'Yadav',
    streetAddress: 'New anaj Mandi Road',
    city: 'Rewari',
    state: 'Haryana',
    zip: '123401'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  return (
    <div className="w-full bg-[#f8f9fc] text-gray-800 font-sans min-h-screen py-6 px-6">
      
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center pb-6 mb-6 border-b border-gray-200/80">
        <NavLink to="/"><h1 className="font-serif text-2xl font-bold text-[#002B49]">Yavapaints</h1></NavLink>
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
          <span>🔒</span>
          <span>SECURE CHECKOUT</span>
        </span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Checkout Steps Indicator */}
          <div className="flex items-center space-x-4 text-xs font-bold tracking-wider uppercase text-gray-400">
            <div className={`flex items-center space-x-2 ${currentStep === 1 ? 'text-[#002B49]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-[#002B49] text-white' : 'bg-gray-200'}`}>
                {currentStep > 1 ? '✓' : '1'}
              </span>
              <span>SHIPPING</span>
            </div>
            <span className="w-8 h-[1px] bg-gray-300" />
            <div className={`flex items-center space-x-2 ${currentStep === 2 ? 'text-[#002B49]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-[#002B49] text-white' : 'border border-gray-400'}`}>
                {currentStep > 2 ? '✓' : '2'}
              </span>
              <span>PAYMENT</span>
            </div>
            <span className="w-8 h-[1px] bg-gray-300" />
            <div className={`flex items-center space-x-2 ${currentStep === 3 ? 'text-[#002B49]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-[#002B49] text-white' : 'border border-gray-400'}`}>
                3
              </span>
              <span>REVIEW</span>
            </div>
          </div>

          {/* Step 1: Shipping Form */}
          {currentStep === 1 && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#002B49]">Shipping Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    value={shippingData.firstName}
                    onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Last Name</label>
                  <input
                    type="text"
                    value={shippingData.lastName}
                    onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500">Street Address</label>
                <input
                  type="text"
                  value={shippingData.streetAddress}
                  onChange={(e) => setShippingData({...shippingData, streetAddress: e.target.value})}
                  className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">City</label>
                  <input
                    type="text"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">State</label>
                  <input
                    type="text"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">ZIP</label>
                  <input
                    type="text"
                    value={shippingData.zip}
                    onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#002B49] hover:bg-[#003d66] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition-colors"
              >
                Continue to Payment →
              </button>
            </form>
          )}

          {/* Step 2: Payment Form */}
          {currentStep === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#002B49]">Payment Details</h2>

              <div>
                <label className="text-xs text-gray-500">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                  className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Card Number</label>
                <input
                  type="text"
                  placeholder="•••• •••• •••• ••••"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                  className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiry}
                    onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    className="w-full mt-1 p-2.5 text-xs bg-white border-b border-gray-300 focus:border-[#002B49] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="border border-gray-300 text-gray-600 font-bold text-xs uppercase px-6 py-3.5 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#002B49] hover:bg-[#003d66] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition-colors"
                >
                  Review Order →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#002B49]">Review Your Order</h2>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200/80 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#002B49]">Shipping Address</h4>
                  <p className="text-gray-600 mt-1">
                    {shippingData.firstName} {shippingData.lastName}<br />
                    {shippingData.streetAddress}<br />
                    {shippingData.city}, {shippingData.state} {shippingData.zip}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h4 className="font-bold text-[#002B49]">Payment Method</h4>
                  <p className="text-gray-600 mt-1">
                    Card ending in {paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '4242'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('Order Placed Successfully!')}
                className="w-full bg-[#002B49] hover:bg-[#003d66] text-white font-bold text-xs uppercase tracking-wider py-4 rounded transition-colors shadow-md"
              >
                Place Order ($442.80)
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="bg-white rounded-lg border border-gray-200/80 p-6 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#002B49]">Order Summary</h2>

          {/* Summary Items */}
          <div className="space-y-4 border-b border-gray-100 pb-6">
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                <img src="https://watermarked.img.vision/watermarked_img_5831062594045642170.png" alt="Velvet Dusk" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#002B49] truncate">Velvet Dusk - Matte</h4>
                <p className="text-[10px] text-gray-500">5 Gallons | #2C3E50</p>
              </div>
              <span className="text-xs font-bold text-[#002B49]">$215.00</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=100&auto=format&fit=crop" alt="Artisan Roller Pro" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#002B49] truncate">Artisan Roller Pro</h4>
                <p className="text-[10px] text-gray-500">Set of 3</p>
              </div>
              <span className="text-xs font-bold text-[#002B49]">$42.50</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=100&auto=format&fit=crop" alt="Alabaster Dream" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#002B49] truncate">Alabaster Dream - Satin</h4>
                <p className="text-[10px] text-gray-500">3 Gallons | #F4F1EA</p>
              </div>
              <span className="text-xs font-bold text-[#002B49]">$155.00</span>
            </div>

          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs border-b border-gray-100 pb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">$412.50</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-bold text-amber-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Estimated Tax</span>
              <span className="font-medium text-gray-800">$30.30</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-serif text-base font-bold text-[#002B49]">Total</span>
            <span className="font-serif text-2xl font-bold text-[#002B49]">$442.80</span>
          </div>

          {/* Promo Code Input */}
          <div className="flex space-x-2 pt-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="flex-1 p-2 border border-gray-300 rounded text-xs outline-none focus:border-[#002B49]"
            />
            <button className="px-4 py-2 border border-[#002B49] text-[#002B49] text-xs font-bold uppercase rounded hover:bg-gray-50">
              Apply
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center flex items-center justify-center space-x-1 pt-2">
            <span>🛡️</span>
            <span>PCI-DSS Compliant Payments</span>
          </p>
        </div>

      </div>
    </div>
  );
}