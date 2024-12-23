import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, addQuestion, setUsers, addUser, updateQuestion } from "../../../store/testDataSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

function TestData() {
  const { testId } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  // Select the questions and users from Redux store

  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newMarks, setNewMarks] = useState(0);
  const [correctOption, setCorrectOption] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  // Modal visibility state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
       console.log(testId)
        const response = await axios.get(`${BACKEND_URL}/org/getTestData/${testId}`,
          {
            headers: {
                'Content-Type': 'application/json'
            },
                withCredentials: true // Ensure cookies are sent
              
        }
        );
        // Parse and set questions and users from the backend response
        const parsedQuestions = response.data.Questions || [];
        const parsedUsers = response.data.TestUsers || [];

        dispatch(setQuestions(parsedQuestions));
        dispatch(setUsers(parsedUsers));
      } catch (error) {
        console.error("Error fetching test data:", error.message);
      }
    };
    fetchTestData();
  }, []);
  // console.log(useSelector((state) => state.testData))
  const { questions, users } = useSelector((state) => state.testData);
  const { newquestions, newusers } = useSelector((state) => state.testData);
  console.log(users)
  const handleAddQuestion = () => {
    const newQuestionData = {
      _id: Date.now(),
      question: newQuestion,
      options: newOptions,
      marks: newMarks,
      correctOption: correctOption,
    };
    dispatch(addQuestion(newQuestionData));
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewMarks(0);
    setCorrectOption("");
    setShowAddQuestionModal(false); // Close modal after adding
  };

  const handleAddUser = () => {
    
    dispatch(addUser({email:newUserEmail}));
    setNewUserEmail("");
    setShowAddUserModal(false); // Close modal after adding
  };

  const handleSaveData = async () => {
    try {
      const dataToSave = {
        questions: newquestions.map(({ _id, ...rest }) => rest),
        users: newusers.map((u)=>u.email)
      };
      console.log(dataToSave)
      const response = await axios.post(
        `${BACKEND_URL}/org/addDataToTest/${testId}`,
        dataToSave,
        { withCredentials: true }
      );
      console.log(response)
      if (response.status === 200) {
        alert("Test data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving test data:", error.message);
      alert("Failed to save test data!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Test Data</h1>

      {/* Questions Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        {questions.map((q) => (
          <div key={q._id} className="mb-4">
            <p className="font-semibold">{q.question}</p>
            <ul className="list-disc ml-6">
              {q.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p>Marks: {q.marks}</p>
            <p>Correct Option: {q.correctOption}</p>
          </div>
        ))}
        {newquestions && newquestions.map((q) => (
          <div key={q._id} className="mb-4">
            <p className="font-semibold">{q.question}</p>
            <ul className="list-disc ml-6">
              {q.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p>Marks: {q.marks}</p>
            <p>Correct Option: {q.correctOption}</p>
          </div>
        ))}
        
      </div>

      {/* Add Question Button */}
      <button
        onClick={() => setShowAddQuestionModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add Question
      </button>

      {/* Add User Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Users</h3>
        {users.map(user => (
          <div key={user.email}>
            {user.email}
          </div>
        ))}
        {newusers && newusers.map(user => (
          <div key={user.email}>
            {user.email}
          </div>
        ))}
      </div>

      {/* Add User Button */}
      <button
        onClick={() => setShowAddUserModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add User
      </button>

      {/* Save Test Data */}
      <div className="mt-6">
        <button
          onClick={handleSaveData}
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Save Test Data
        </button>
      </div>

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Question</h3>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question"
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <div className="flex flex-col space-y-2">
              {newOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newOptions];
                    updatedOptions[index] = e.target.value;
                    setNewOptions(updatedOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="w-full px-4 py-2 border rounded-md"
                />
              ))}
            </div>
            <label htmlFor="marks" className="p-3">Enter marks:</label>
            <input
              type="number"
              name="marks"
              value={newMarks}
              onChange={(e) => setNewMarks(Number(e.target.value))}
              placeholder="Marks"
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              placeholder="Correct Option"
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleAddQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Question
            </button>
            <button
              onClick={() => setShowAddQuestionModal(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Student Email"
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleAddUser}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add User
            </button>
            <button
              onClick={() => setShowAddUserModal(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestData;
