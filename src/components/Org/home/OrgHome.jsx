import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/orgauthSlice";

function OrgHome() {
  const [showProfile, setShowProfile] = useState(false);
  const [tests, setTests] = useState([]);
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [newTest, setNewTest] = useState({ title: "", description: "",duration:0 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
 
  const orgname = useSelector((state) => state.orgauth.orgData.orgname);
  const orgemail = useSelector((state) => state.orgauth.orgData.orgemail);
  
  // Fetch tests from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/org/getAlltests`, {
          withCredentials: true,
        });
         setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error.message);
      }
    };
    fetchTests();
  }, []);

  // Delete a test
  const deleteTest = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/org/deleteTest/${id}`, {
        withCredentials: true,
      });
      setTests((prevTests) =>
        prevTests.map((test) =>
          test._id === id ? { ...test, isDeleted: true } : test
        )
      );
    } catch (error) {
      console.error("Error deleting test:", error.message);
    }
  };

  // Create a new test
  const createTest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/org/createTest`,
        newTest,
        { withCredentials: true }
      );
      setTests((prevTests) => [...prevTests, response.data]);
      setShowCreateTest(false);
      setNewTest({ title: "", description: "" ,duration:0});
    } catch (error) {
      console.error("Error creating test:", error.message);
    }
  };

  // Sign-out logic
  const handleSignOut = () => {
    axios
      .post(`${BACKEND_URL}/org/auth/signout`, {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          dispatch(logout());
          alert("Signed out!");
          navigate("/");
        } else {
          alert("Logout failed, please try again");
        }
      })
      .catch((error) => {
        console.error("Error in logout:", error.message);
        alert("Error while logging out, please try again");
      });
  };
  const navigateToTestData = (testId) => {
    navigate(`/org/test-data/${testId}`);  // Navigate to the test data page
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Test Home</div>
        <button
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => setShowProfile(!showProfile)}
        >
          Profile
        </button>
      </nav>

      {/* Profile Card */}
      {showProfile && (
        <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-md p-4 z-50">
          <h2 className="text-lg font-bold mb-4">Organization Details</h2>
          <p className="mb-2">Name: {orgname}</p>
          <p className="mb-4">Email: {orgemail}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your All Tests</h1>
        {tests.length === 0 ? (
          <h2 className="text-xl font-bold mb-6 text-red-600">No Tests Available...</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white shadow-md rounded-md p-4 relative"
              >
                <h2 className="text-lg font-bold">{test.title}</h2>
                <p className="text-gray-500 mb-4">{test.description}</p>
                <p className="text-gray-500 mb-4">Duration: {test.duration} minutes</p>
                <span
                  className={`inline-block px-2 py-1 text-sm rounded-md ${
                    test.isDeleted
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {test.isDeleted ? "Deleted" : "Active"}
                </span>
                <button
                  className={`absolute top-2 right-2 px-2 py-1 rounded-md transition ${
                    test.isDeleted
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  onClick={() => deleteTest(test._id)}
                  disabled={test.isDeleted}
                >
                  Delete
                </button>

                {/* Button to Navigate to Test Data Page */}
                <button
                  className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                  onClick={() => navigateToTestData(test._id)}
                >
                  Manage Test Data
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
          onClick={() => setShowCreateTest(true)}
        >
          Create New Test
        </button>
      </div>

      {/* Floating Create Test Form */}
      {showCreateTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Test</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTest.title}
              onChange={(e) =>
                setNewTest({ ...newTest, title: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <label htmlFor="duration" className="p-2">Enter Test duration in Minutes</label>
            <input
              type="Number"
              name="duration"
              placeholder="Test Duration"
              value={newTest.duration}
              onChange={(e) =>
                setNewTest({ ...newTest, duration: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={newTest.description}
              onChange={(e) =>
                setNewTest({ ...newTest, description: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded-md"
              rows="4"
            ></textarea>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                onClick={() => setShowCreateTest(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={createTest}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrgHome;
