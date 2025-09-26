// Receipt.js
import React, { forwardRef } from "react";
import img from "../assets/orbis_logo.png";

const Receipt = forwardRef(({ transaction }, ref) => {
  return (
    <div
      ref={ref}
      className="receipt w-[80mm] bg-white p-4 text-sm font-sans"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="absolute inset-0 top-50 left-15 flex items-center justify-center pointer-events-none print:block">
        <span className="text-6xl text-blue-500 font-bold  opacity-20 ll">
          ORBIS
        </span>
      </div>
      <div className="text-center mb-3">
        <img src={img} alt="Store Logo" className="mx-auto mb-3" />
        <p className="text-xs">
          Dondada plaza plot 234 nowhere avenue everywhere
          <br />
          support@orbis.com | +2348068932068
        </p>
      </div>

      <hr className="border-dashed my-2" />

      <h2 className="font-semibold">Customer Details</h2>

      <div className="mb-2 text-gray-800">
        <p>Customer: {transaction.patient.name}</p>
        <p>Customer Phone: {transaction.patient.phone[0]}</p>
        <p>Customer Email: {transaction.patient.email}</p>
      </div>

      <hr className="border-dashed my-2" />

      <h2 className="font-semibold">Order details</h2>

      <div className="mb-2 text-gray-800">
        <p>Drug bought: {transaction.drug.name}</p>
        <p>Price: ₦{transaction.drug.price}</p>
      </div>

      <hr className="border-dashed my-2" />

      <div className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>₦{transaction.amount}</span>
      </div>

      <div className="mt-2">
        <p>
          Date: {transaction.createdAt.slice(0, 10)},{" "}
          {transaction.createdAt.slice(11, 16)}{" "}
          {parseInt(transaction.createdAt.slice(11, 13)) >= 12 ? "PM" : "AM"}
        </p>
        <p>Payment Method: Card</p>
        <p>Status: ✅ PAID</p>
      </div>

      <hr className="border-dashed my-2" />

      <p className="text-center text-xs">Thank you for your purchase!</p>
    </div>
  );
});

export default Receipt;
