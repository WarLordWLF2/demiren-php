"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";


export default function Register() {
  const mainURL = sessionStorage.webAPI;
  const [rePass, setRePass] = useState('');
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    password: "",
    country: "",
    email: "",
    phone: "",
    age: 0
  });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Checks if phone is exactly 11 digits (only numbers)
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    // Ensures password has at least 8 characters
    return password.length >= 8;
  };

  const handleRegistration = async () => {

    if (!validateEmail(userDetails.email)) {
      alert("Email must contain '_', '@' and '-' ");
      return;
    }

    if (!validatePhone(userDetails.phone)) {
      alert("Invalid Phone Number");
      return;
    }

    if (!validatePassword(userDetails.password)) {
      alert("Password must be 8 characters long");
      return;
    }

    if (!userDetails.password == rePass) {
      alert("Passwords Do not Match");
      console.log(userDetails.password, rePass)
      return;
    }

    if (!userDetails.age >= 18) {
      alert("Age must be at or above 18");
      return;
    }

      const userInfo = new FormData();
      userInfo.append("method", "addUser");
      userInfo.append("json", JSON.stringify(userDetails));

      try {
        const conn = await axios.post(mainURL, userInfo);
        if (conn) {
          alert('Successfully Added New User!');
        } else {
          alert('Failed to add new User');
        }

      } catch (err) {
        console.log('Something Went Wrong', err);
      }
    }



  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="/assets/demiren.jpg"
          alt="Register"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Right side form with new background */}
      <div className="w-1/2 flex justify-center items-center p-6 bg-[#213555]">
        <div className="w-full max-w-md p-6 bg-[#D8C4B6] rounded-md shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-4 text-[#213555]">Create an Account</h2>

          {/* Registration Form */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label htmlFor="fname" className="block text-sm font-medium text-[#213555]">First Name</label>
              <Input
                type="text"
                id="fname"
                placeholder="Enter First Name"
                value={userDetails.fname}
                onChange={(e) => { setUserDetails({ ...userDetails, fname: e.target.value }) }}
                required
                className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="lname" className="block text-sm font-medium text-[#213555]">Last Name</label>
              <Input
                type="text"
                id="lname"
                placeholder="Enter Last Name"
                value={userDetails.lname}
                onChange={(e) => { setUserDetails({ ...userDetails, lname: e.target.value }) }}
                required
                className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#213555]">Email</label>
            <Input
              type="text"
              id="email"
              placeholder="m@example.com"
              value={userDetails.email}
              onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#213555]">Password</label>
            <Input
              type="text"
              id="password"
              placeholder="Enter Password"
              value={userDetails.password}
              onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#213555]">Re-type Password</label>
            <Input
              type="confirm-password"
              id="confirm-password"
              placeholder="Enter Retype Password"
              value={rePass}
              onChange={(e) => { setRePass(e.target.value) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#213555]">Enter Country</label>
            <Input
              type="confirm-password"
              id="confirm-password"
              placeholder="Enter Country"
              value={userDetails.country}
              onChange={(e) => { setUserDetails({ ...userDetails, country: e.target.value }) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#213555]">Enter Phone Number</label>
            <Input
              type="confirm-password"
              id="confirm-password"
              placeholder="Enter Phone No."
              value={userDetails.phone}
              onChange={(e) => { setUserDetails({ ...userDetails, phone: e.target.value }) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#213555]">Enter Age</label>
            <Input
              type="confirm-password"
              id="confirm-password"
              placeholder="Enter Your Age"
              value={userDetails.age}
              onChange={(e) => { setUserDetails({ ...userDetails, age: e.target.value }) }}
              required
              className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#213555] text-white" onClick={handleRegistration}>Register</Button>
          <div className="text-center text-sm mt-4 text-[#213555]">
            Already have an account?{" "}
            <a href="/signin" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  
  )
}