import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const loginstatus=useSelector(state=>state.auth.status)
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
    const handleSignOut = (e) => {
      e.preventDefault();
      axios.post(`${BACKEND_URL}/user/signout` )
      .then(response => {
    
          if (response.status === 200 ) {
              navigate("/login");
              alert(response.data.message)
          } else {
              alert("Logout failed, please try again");
          }
      })
      .catch(error => {
          if (error.response) {
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
              console.log('Error', error.message);
              alert("Login failed, please try again");
          }
      });
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-gray-800 text-white py-4 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">ETest</h1>
                <nav className="space-x-4">
                    <Link 
                        to="/login"
                        className="hover:text-gray-400"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register"
                        className="hover:text-gray-400"
                    >
                        Signup
                    </Link>
                    { loginstatus==true &&
                    <button 
                        onClick={handleSignOut}
                        className="hover:text-gray-400"
                    >
                        Sign Out
                    </button>
                     }
                </nav>
            </div>
        </header>
    );
}

export default Header;
