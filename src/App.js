import "./App.css";
import React, { useEffect, useState } from "react";
import { LogInPage } from "./pages/LogInPage";
import { Dashboard } from "./pages/Dashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import AuthContext from "./context/AuthProvider";
import HeaderNavBar from "./components/HeaderNavBar";
import AdminHeaderNavBar from "./adminComponents/AdminHeaderNavBar";
import ManagerHeaderNavBar from "./managerComponents/ManagerHeaderNavBar";
import jwtDecode from "jwt-decode";
//import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [sucess, setSucess] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState("Home");
  
  useEffect(() => {
    const cookies = new Cookies();
    setEmployeeDetails(cookies.get('employeeDetails'));
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('jwt_autherization');
    

    // decode the cookie value to find out if it is valid.
    // use the jwtDecode function to decode the cookie value
    // if the cookie is valid, then set the cookieValid to true
    if (cookieValue) {
      try {
        const decodedToken = jwtDecode(cookieValue);
        const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    
        // Compare the expiration time of the token with the current time
        if (decodedToken.exp > currentTime) {
          setSucess(true);
        }
      } catch (error) {
        console.error('Error while decoding JWT:', error);
      }
    }
  }, [employeeDetails]);

  
  
  //console.log(sucess);

  return (
    <div>
      <AuthContext.Provider
        value={{
          sucess,
          setSucess, // I have removed setJwt
          signedIn,
          setSignedIn,
          employeeDetails,
          setEmployeeDetails,
          tab,
          setTab,
        }}
      >
        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <>
          {
          //!JwtValidation
          !sucess ? (
            <LogInPage />
          ) : (
            <>
              {employeeDetails.role === "ROLE_USER" ? (
                <div>
                  <HeaderNavBar employeeDetails={employeeDetails} />
                  <Dashboard employeeDetails={employeeDetails} />
                </div>
              ) : employeeDetails.role === "ROLE_ADMIN" ? (
                <div>
                  <AdminHeaderNavBar employeeDetails={employeeDetails} />
                  <AdminDashboard employeeDetails={employeeDetails} />
                </div>
              ) : employeeDetails.role === "ROLE_MANAGER" ?(
                // Finally this possibility is that role === ROLE_MANAGER
                <div>
                  <ManagerHeaderNavBar employeeDetails={employeeDetails} />
                  <ManagerDashboard employeeDetails={employeeDetails} />
                </div>
              ) : (
                <h4> Problem with the role context</h4>
              )}
            </>
          )}
        </>
      </AuthContext.Provider>
    </div>
  );
}

export default App;