"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  let attempts = 0;
  const mainURL = sessionStorage.webAPI;
  const [loginDetails, setLoginDetails] = useState({
    userMail: "",
    userPass: ""
  });

  const handleLogin = async (e) => {
      e.preventDefault();
      const logForm = new FormData();
      logForm.append("method", "submit-login");
      logForm.append("json", JSON.stringify(loginDetails));

      try {
        const conn = await axios.post(mainURL, logForm);
        if (conn.data.response) {
          alert("Welcome User");
          console.log(conn.data.user);
        } else {
          attempts++;
          console.log(attempts);
          alert("Wrong Credentials, Attempts: ");
        }
      } catch (err) {
        console.log("Something went Wrong", err);
      }

      // If ever the User has Reached Ten Attempts this Error Pops up
    if (attempts == 10) {
      alert("Stop It Man");
      attempts = 0;
    }
  }

  return (
    <div className="flex min-h-screen  bg-[#213555]">
      {/* Left side form */}
      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md p-6  bg-[#D8C4B6] rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login your account</h1>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginDetails.userMail}
                  onChange={(e) => { setLoginDetails({ ...loginDetails, userMail: e.target.value }) }}
                  required
                  className="mt-1 p-2 w-full border  border-black rounded text-black placeholder-gray-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={loginDetails.userPass}
                  onChange={(e) => { setLoginDetails({ ...loginDetails, userPass: e.target.value }) }}
                  required
                  className="mt-1 p-2 w-full border  border-black rounded text-black placeholder-gray-500"
                />
              </div>

              <Button type="submit" className="w-full mt-4 bg-[#213555] text-white px-4 py-2 rounded-lg hover:bg-[#324A65]">
                Login
              </Button>

              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side image */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="/assets/demiren.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
