import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert("Reset link sent!");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#ECECEC]">

      <div
        className="
          w-[660px]
          bg-white
          rounded-[8px]
          px-16
          py-12
        "
      >

        <h1 className="text-center text-[#662671] text-[24px]  mb-4">
          Did you forget password?
        </h1>
        <p className="text-center text-[#8A8A8A] text-[16px] leading-[24px] mb-8">
          Enter your email address and we’ll send you a link to restore password
        </p>
        <div className="mb-8">
          <label className="block text-[#6B7280] text-[14px] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              h-[48px]
              px-4
              border
              border-[#9F9F9F]
              rounded-[8px]
              text-[14px]
              focus:outline-none
              focus:ring-2
              focus:ring-[#662671]
            "
          />
        </div>

        <button
          onClick={handleSubmit}
          className="
            w-full
            h-[52px]
            bg-[#662671]
            text-white
            rounded-[10px]
            text-[16px]
            font-medium
            hover:bg-[#541f5a]
            transition
            mb-6
          "
        >
          Request reset link
        </button>
        <div className="text-center">
          <Link
            to="/login"
            className="text-[#8A8A8A] text-[14px] hover:underline"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
