"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { getCartItems } from "../actions/action";
import { Product } from "../../../types/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { client } from "@/sanity/lib/client";
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.stockLevel,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };


  //  const handlePlaceOrder = () => {
  //  if (validateForm()) {
  //     localStorage.removeItem("appliedDiscount");
  //       toast.success("Order placed successfully!");
  //  } else {
  //       toast.error("Please fill in all the fields.");
  //    }
  //  };
  const handlePlaceOrder = async () => {
    const orderDate = {
      _type :'order',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      email: formValues.email,
      cartItems: cartItems.map((item) => ({ _type: 'reference', _ref: item._id })),
      total: total,
      discount: discount,
      orderDate: new Date().toISOString(),
    };
    try {
      await client.create(orderDate);
      localStorage.removeItem("appliedDiscount");
    }
    catch (error) {
      console.error("error creating order", error);
    }
  };    

return (
    <>
    <Header />
    <div className={`min-h-screen bg-gray-50`}>
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link
              href="/cart"
              className="text-[#666666] hover:text-black transition text-sm"
            >
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.stockLevel}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.price * item.stockLevel}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name :</label>
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="border"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-pink-500">
                    First name is required.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name : </label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="border"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-pink-500">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address">Address : </label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formValues.address}
                onChange={handleInputChange}
                className="border"
              />
              {formErrors.address && (
                <p className="text-sm text-pink-500">Address is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="city">City :</label>
              <input
                id="city"
                placeholder="Enter your city"
                value={formValues.city}
                onChange={handleInputChange}
                className="border"
              />
              {formErrors.city && (
                <p className="text-sm text-pink-500">City is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code :</label>
              <input
                id="zipCode"
                placeholder="Enter your zip code"
                value={formValues.zipCode}
                onChange={handleInputChange}
                className="border"
              />
              {formErrors.zipCode && (
                <p className="text-sm text-pink-500">Zip Code is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="phone">Phone :</label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={handleInputChange}
                className="border"
              />
              {formErrors.phone && (
                <p className="text-sm text-pink-500">Phone is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email :</label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleInputChange}
                className="border"
              />
              {formErrors.email && (
                <p className="text-sm  text-pink-500">Email is required.</p>
              )}
            </div>
            <button
              className="w-full h-12 bg-pink-400 hover:bg-pink-600 text-center text-white font-semibold rounded-lg"
              onClick={handlePlaceOrder}
              
            >
              Place Order
            </button>
            
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}