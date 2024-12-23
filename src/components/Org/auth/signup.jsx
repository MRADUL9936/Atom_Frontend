import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SignupOrg() {
  // {"orgname":"nous",
  //   "orgemail":"mradul.dev24@gmail.com",
  //   "orgpassword":"1234",
  //   "orgconfirmPassword":"1234"
  //   }
    const [orgname,setOrgName]=useState("")
    const [orgemail, setOrgEmail] = useState("");
    const [orgpassword, setOrgPassword] = useState("");
    const [orgconfirmPassword, setOrgConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (orgpassword !== orgconfirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        // Send data to the backend
        axios.post(`${BACKEND_URL}/org/auth/signup`, 
            {   orgname,
              orgemail,
              orgpassword,
              orgconfirmPassword
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            console.log(response.data); // Log the response data
            alert(response.data.Success || "Organization Registration Successful");
            navigate("/org/login"); // Navigate to login page on successful registration
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.error || "Registration failed");
            } else if (error.request) {
                alert("No response from server. Please try again.");
            } else {
                alert("An error occurred. Please try again.");
            }
        });
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-1">Sign Up</h2>
                <form onSubmit={handleSubmit}>

                <div className="mb-1">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-1">
                            Organization Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Organization Name"
                            autoComplete="off"
                            name="name"
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrgName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-1">
                           Organization Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Organization Email"
                            autoComplete="off"
                            name="email"
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrgEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-1">
                           Organization Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Organization Password"
                                name="password"
                                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setOrgPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {!showPassword ? "show":"hide"}
                            </button>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-1">
                            Confirm Organization Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="conform Organization Password"
                                name="confirmPassword"
                                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setOrgConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {!showConfirmPassword ?"show":"hide"}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-2 text-center">Already have an account?</p>
                <Link
                    to="/org/login"
                    className="block text-center mt-1 text-blue-500 hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default SignupOrg;
