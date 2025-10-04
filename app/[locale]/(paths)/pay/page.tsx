"use client";

import { FormEvent, useState } from "react";
import {
  CreditCard,
  DollarSign,
  CheckCircle,
  Lock,
  Calendar,
  CreditCardIcon,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import Head from "next/head";

export default function PayPage() {
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveCard: false,
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentDate(new Date()); // Set the payment date to current time
    setPaymentStep(2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <style jsx global>{`
          @media print {
            /* Hide everything except the receipt */
            body * {
              visibility: hidden;
            }

            /* Show only the receipt section */
            .print-section,
            .print-section * {
              visibility: visible;
            }

            /* Position the receipt at the top of the page */
            .print-section {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }

            /* Hide buttons in the receipt */
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </Head>

      <div className="pt-20 pb-16 bg-theme">
        <div className="bg-primary-600 text-white py-12 print:hidden">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Payment</h1>
            <p className="text-xl max-w-2xl">
              Complete your payment securely to finalize your booking.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {paymentStep === 1 ? (
              <div className="bg-card rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Payment Details
                  </h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <Lock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Your payment information is secure and encrypted
                    </span>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Order Summary
                      </h3>
                      <span className="font-bold text-xl text-primary dark:text-primary-400">
                        $1,299.00
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Booking Reference: #TRV283947
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange("credit-card")}
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === "credit-card"
                            ? "border-primary dark:border-primary-400 bg-primary-50 dark:bg-gray-700"
                            : "border-gray-200 dark:border-gray-600"
                        }`}>
                        <CreditCardIcon className="h-6 w-6 mr-2 text-gray-700 dark:text-gray-300" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Credit Card
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange("paypal")}
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === "paypal"
                            ? "border-primary dark:border-primary-400 bg-primary-50 dark:bg-gray-700"
                            : "border-gray-200 dark:border-gray-600"
                        }`}>
                        <span className="font-bold text-blue-600 dark:text-blue-400 mr-1">
                          Pay
                        </span>
                        <span className="font-bold text-blue-800 dark:text-blue-300">
                          Pal
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handlePaymentMethodChange("bank-transfer")
                        }
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === "bank-transfer"
                            ? "border-primary dark:border-primary-400 bg-primary-50 dark:bg-gray-700"
                            : "border-gray-200 dark:border-gray-600"
                        }`}>
                        <DollarSign className="h-6 w-6 mr-2 text-gray-700 dark:text-gray-300" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bank Transfer
                        </span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {paymentMethod === "credit-card" && (
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="XXXX XXXX XXXX XXXX"
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                              required
                            />
                            <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="expiry"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Expiration Date
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                              />
                              <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Security Code (CVV)
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <input
                            id="saveCard"
                            name="saveCard"
                            type="checkbox"
                            checked={formData.saveCard}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                          />
                          <label
                            htmlFor="saveCard"
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Save this card for future payments
                          </label>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                            Billing Address
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="billingAddress"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Address
                              </label>
                              <input
                                type="text"
                                id="billingAddress"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  State/Province
                                </label>
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleChange}
                                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label
                                  htmlFor="zipCode"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  ZIP/Postal Code
                                </label>
                                <input
                                  type="text"
                                  id="zipCode"
                                  name="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleChange}
                                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Country
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleChange}
                                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                  required>
                                  <option value="US">United States</option>
                                  <option value="CA">Canada</option>
                                  <option value="UK">United Kingdom</option>
                                  <option value="AU">Australia</option>
                                  <option value="DE">Germany</option>
                                  <option value="FR">France</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="text-center py-8">
                        <div className="flex justify-center mb-6">
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-full p-6">
                            <div className="flex items-center">
                              <span className="font-bold text-2xl text-blue-600 dark:text-blue-400 mr-1">
                                Pay
                              </span>
                              <span className="font-bold text-2xl text-blue-800 dark:text-blue-300">
                                Pal
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Click the button below to log in to your PayPal
                          account and complete your payment.
                        </p>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                          Continue to PayPal
                        </button>
                      </div>
                    )}

                    {paymentMethod === "bank-transfer" && (
                      <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            Bank Transfer Details
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Please use the following details to make your bank
                            transfer. Your booking will be confirmed once we
                            receive your payment.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Bank Name:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                Global Travel Bank
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Account Name:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                Travel Explorer Ltd
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Account Number:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                1234567890
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Routing Number:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                087654321
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                SWIFT/BIC:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                GTBKUS12
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Reference:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                TRV283947
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300">
                          After making the transfer, please click the button
                          below to confirm your payment. Our team will verify
                          the transfer and update your booking status.
                        </p>

                        <button
                          type="submit"
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                          I've Completed the Bank Transfer
                        </button>
                      </div>
                    )}

                    <div className="mt-8">
                      {paymentMethod === "credit-card" && (
                        <button
                          type="submit"
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                          Pay $1,299.00
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-lg overflow-hidden p-8 print-section">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
                      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Payment Receipt
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your payment has been processed successfully. We've sent a
                    receipt to your email.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-left max-w-md mx-auto mb-8">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Payment Details
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-medium">PAY78392104</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Amount Paid:</span>
                        <span className="font-medium">$1,299.00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">
                          {paymentMethod === "credit-card"
                            ? "Credit Card"
                            : paymentMethod === "paypal"
                            ? "PayPal"
                            : "Bank Transfer"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {paymentDate.toLocaleDateString()}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">
                          {paymentDate.toLocaleTimeString()}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Booking Reference:</span>
                        <span className="font-medium">TRV283947</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
                    <LocalizedLink
                      href="/"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Return to Home
                    </LocalizedLink>
                    <button
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={handlePrint}>
                      Print Receipt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
