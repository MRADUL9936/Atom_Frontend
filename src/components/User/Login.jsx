import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch,useSelector } from "react-redux";
import {login} from "../../store/authSlice"
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password }); // Log data before sending
         
        axios.post(`${BACKEND_URL}/user/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            },
                withCredentials: true // Ensure cookies are sent
              
        })
        .then(response => {
            console.log(response); // Log the response data
            if (response.status === 200 && response.data === "Success") {
                dispatch(login({ userData: email }));           //dispath the function to store the email in slice
                console.log(document.cookie)
                alert("login Successfull")
                navigate("/candidate/tests");
            } else {
                alert("Login failed, please try again");
            }
        })
        .catch(error => {
            if (error.response) {
                // Request made and server responded
              
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
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
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Conditionally set type
                            placeholder="Enter Password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
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
                    to="/candidate/register"
                    className="block text-center mt-2 text-blue-500 hover:underline"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
