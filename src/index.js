import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Root from './Root';
import Error from './components/Error.js';
import Professors from './components/Professors.js';
import Projects from './components/Projects.js';
import SingleProf from './components/SingleProf.js';
import News from './components/News.js';
import About from './components/About.js';
import Login from './components/Login.js';
import Forum from './components/Forum.js';
import Register from './components/Register.js';
import Contact from './components/Contact.js';
import Profile from './components/Profile.js';
import reportWebVitals from './reportWebVitals';
import Test from './components/test.js';
import ResetPass from './components/ResetPass.js';
import Verify from './components/verify.js';
import { LabLinkProvider } from './LabLinkProvider.js';
import VerifyUser from './components/VerifyUser.js';
import NewUserVerify from './components/NewUserVerify.js';
import Application from './components/Application.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: "Professors",
    element: <Professors />,
  },
  {
    path: "Projects",
    element: <Projects />,
  },
  {
    path: "news",
    element: <News />,
  },
  {
    path: "About",
    element: <About />,
  },
  {
  path: "SingleProf/:profName",
  element: <SingleProf />,
},

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "Forum",
    element: <Forum />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "NewUserVerify",
    element: <NewUserVerify />,
  },
  {
    path: "VerifyUser",
    element: <VerifyUser />,
  },
  {
    path: "Contact",
    element: <Contact />,
  },
  {
    path: "Test",
    element: <Test />,
  },
  {
    path: "ResetPass",
    element: <ResetPass />,
  },
  {
    path: "Verify",
    element: <Verify />,
  },
  {
    path: "Profile",
    element: <Profile />
  },
  {
    path: "Application",
    element: <Application />
  }
]);


root.render(
  <LabLinkProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </LabLinkProvider>
);

reportWebVitals();
