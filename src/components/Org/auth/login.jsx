import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {login} from "../../../store/orgauthSlice"
function LoginOrg() {
//   "orgemail":"mradul.dev24@gmail.com",
//  "orgpassword":"1234",
    const [orgemail, setorgEmail] = useState("");
    const [orgpassword, setOrgPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ orgemail, orgpassword }); // Log data before sending
         
        axios.post(`${BACKEND_URL}/org/auth/login`, { orgemail, orgpassword }, {
            headers: {
                'Content-Type': 'application/json'
            },
                withCredentials: true // Ensure cookies are sent
              
        })
        .then(response => {
            // console.log(response); // Log the response data
            if (response.status === 200 ) {
                dispatch(login({ orgData: response.data }));      //dispath the function to store the email in slice
                // console.log(document.cookie)
                alert("login Successfull")
                 navigate("/org/home");  ///navigate to home page
            } else {
                alert("Login failed, please try again");
            }
        })
        .catch(error => {
            if (error.response) {
                // Request made and server responded
                if (error.response.status === 400) {
                    alert("Invalid User and password");
                } else {
                    alert("Login failed, please try again");
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                alert("No response from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                alert("Login failed, please try again");
            }
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="orgemail" className="block text-gray-700 font-bold mb-2">
                            Organization Email
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Organization Email"
                            autoComplete="off"
                            name="orgemail"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setorgEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="orgpassword" className="block text-gray-700 font-bold mb-2">
                            Organization Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Conditionally set type
                            placeholder="Enter Organization Password"
                            name="orgpassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setOrgPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 text-gray-500 flex items-center mt-6 cursor-pointer"
                        >
                            {!showPassword ? "show" :"hide"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">Don't have an account?</p>
                <Link
                    to="/org/register"
                    className="block text-center mt-2 text-blue-500 hover:underline"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default LoginOrg;
