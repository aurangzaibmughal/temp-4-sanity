"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { Product } from "../../../types/products";
import {
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "../actions/action";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { route } from "sanity/router";
import { useRouter } from "next/navigation";

<Header />
const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Processing your order ...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Proceed!",

    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.stockLevel + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.stockLevel > 1) {
      handleQuantityChange(id, product.stockLevel - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.stockLevel,0
    );
  };

  const router  = useRouter()
  const handleProceed =  () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success!",
          "Your order has been successfully processed!",
          "success"
        );
        router.push("/checkout");
        // Clear the cart after proceeding (optional)
        setCartItems([]);
      }
    });
  };

  return (
    <>
      <Header />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt="image"
                      width={500}
                      height={500}
                    />
                  )}
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">Price: ${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.stockLevel}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total:</h2>
              <p className="text-xl font-bold text-gray-800">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleProceed}
              className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Proceed
            </button>

            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
