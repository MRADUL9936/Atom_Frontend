import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
// import Header from './components/Header/Header';
import Tests from './components/Test/Test';
import Permissions from './components/Permissions/permissions';
import StartTest from './components/StartTest/startTest';
import Submit from './components/Test/submit';
//organization components
import SignupOrg from './components/Org/auth/signup';
import LoginOrg from './components/Org/auth/login';
import OrgHome from './components/Org/home/OrgHome';
import TestData from './components/Org/tests/TestData';
function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Left Section */}
      <div className="absolute inset-0 bg-gray-100 clip-left"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 clip-right"></div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center">
        {/* Left Column Content */}
        <div className="flex flex-col items-center justify-center w-1/2 p-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md mb-6 shadow-md hover:bg-blue-600 transition"
            onClick={() => navigate('/candidate')}
          >
            Candidate Section
          </button>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition"
            onClick={() => navigate('/org')}
          >
            Organization Section
          </button>
        </div>

        {/* Right Column Content */}
        <div className="flex items-center justify-center w-1/2">
          <h1 className="text-4xl font-bold text-white text-center">Welcome to Atom</h1>
        </div>
      </div>

      {/* Custom Styles for Diagonal Divider */}
      <style>
        {`
          .clip-left {
            clip-path: polygon(0 0, 70% 0, 30% 100%, 0% 100%);
          }
          .clip-right {
            clip-path: polygon(30% 0, 100% 0, 100% 100%, 70% 100%);
          }
        `}
      </style>
    </div>
  );
}




function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate">
            <Route index element={<Navigate to="/candidate/login" />} />
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="tests" element={<Tests />} />
            <Route path="tests/permissions" element={<Permissions />} />
            <Route path="test/:testId" element={<StartTest />} />
            <Route path="submit" element={<Submit />} />
          </Route>
          <Route path="/org">
            <Route index element={<Navigate to="/org/login" />} />
            <Route path="register" element={<SignupOrg />} />
            <Route path="login" element={<LoginOrg />} />
            <Route path="home" element={<OrgHome />} />
            <Route path="test-data/:testId" element={<TestData />} />
            
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
