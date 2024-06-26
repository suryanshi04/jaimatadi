import * as React from "react";
import { LabLinkContext } from '../LabLinkProvider';
import { Link } from "react-router-dom";
import "../styles/login.css";
import eLogo from "../images/eLogo.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import sjcl from 'sjcl';
import { ReactComponent as EyeSlashIcon } from '../images/eye-solid.svg'; // Adjust the path accordingly
import { ReactComponent as EyeIcon } from '../images/eye-slash-solid.svg'; // Adjust the path accordingly
import Chatbot from './Chatbot.js'

function Register(){

  function hashPassword(password) {
    try{
    return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
  }
  catch(error){
    console.error("Error hashing password:", error);
  }
}

  const [isChange, setIsChange] = React.useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { netID, setNetID } = useContext(LabLinkContext);
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isChange) {
      navigate('/');
    } else {
      setIsChange(true);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

function validateNetID(netID) {
    // Check if netID is empty
    if (!netID || netID.trim() === "") {
        throw new Error("NetID cannot be empty");
    }

    // Check if netID starts with an alphabetical character
    if (!/^[a-zA-Z]/.test(netID)) {
        throw new Error("NetID must start with an alphabetical character");
    }

    // Check if netID is not just numbers
    if (/^\d+$/.test(netID)) {
        throw new Error("NetID cannot be just numbers");
    }

}



  async function fetchData(netID, password) {


try {
        validateNetID(netID);
    } catch (error) {
        alert(error.message);
    }


    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                field1: netID,
                field2: hashPassword(password),
            }),
        });


        const statusCode = response.status;
        if (statusCode >= 200 && statusCode < 300) {  // Successful response range
            const responseData = await response.text();
            setData(responseData);
            setLoading(false);
            navigate('/VerifyUser');

        } else {
            let errorMessage;
            try {
                const errorData = await response.text();  // Try parsing JSON first
                errorMessage = errorData;
            } catch {
                errorMessage = "Registration failed. Please try again.";  // If not JSON, then parse as text
            }
            throw new Error(errorMessage);
        }

    } catch (error) {
        //console.error('Error during registration:', error.message);
        alert("We believe there is a duplicate in the user Token. ");  // Display the error message in an alert
    }
}


  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetchData(netID, hashPassword(password));  // Call fetchData with netID and password
  };

  useEffect(() => {
    // fetchData();  // Removed this because we now fetch data on form submit
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
      <div className={`login-container ${isChange ? "change" : ""}`}>
        <div className="login-form-wrapper">
          <div className="eLogo">
            <img src={eLogo} alt="Emory Logo"/>
          </div>
          <div className="banner">
            <h1>Research Nexus!</h1>
            <p>Enter your college credential and start journey with us!</p>
          </div>
          <div className="blue-bg">
            <div className={`logo-2 ${isChange ? "change" : ""}`} id="logoonce">
              <img src={eLogo} alt="Emory Logo"/>
            </div>
            <button type="button" onClick={() => handleButtonClick()}>{isChange ? 'Home' : 'Lab Link'}</button>
          </div>
          <form className="signin-form" onSubmit={handleFormSubmit}>
            <h1>Research Nexus!</h1>
            <h1>Register</h1>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input placeholder="NetID" value = {netID} onChange={e => setNetID(e.target.value)}  />
            </div>
            <div className="input-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {isPasswordVisible ? (
                <EyeSlashIcon onClick={togglePasswordVisibility} className="eye-icon" />
              ) : (
                <EyeIcon onClick={togglePasswordVisibility} className="eye-icon" />
              )}
            </div>
            <button type="submit">Register</button>
            <Link to={'/login'} className="login">Already have an account? Login</Link>
          </form>

        </div>
        <div style={{ zIndex: 9999 }}>
                          <Chatbot />
                        </div>
      </div>
  )
}

export default Register
