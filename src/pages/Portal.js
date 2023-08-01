import React, { useContext } from "react";
import HeaderNavBar from "../components/HeaderNavBar";
import { Dashboard } from "./Dashboard";
import ManagerHeaderNavBar from "../managerComponents/ManagerHeaderNavBar";
import { ManagerDashboard } from "./ManagerDashboard";
import AdminHeaderNavBar from "../adminComponents/AdminHeaderNavBar";
import { AdminDashboard } from "./AdminDashboard";
import AuthContext from "../context/AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function Portal() {
  const { employeeDetails } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Routes>
          <>
            {employeeDetails.role === "ROLE_USER" ? (
              <div>
                <HeaderNavBar employeeDetails={employeeDetails} />
                <Dashboard employeeDetails={employeeDetails} />
              </div>
            ) : // I think the root element needs to go into the dashboard and
            // also the link... think about it later.
            employeeDetails.role === "ROLE_ADMIN" ? (
              <div>
                <AdminHeaderNavBar employeeDetails={employeeDetails} />
                <AdminDashboard employeeDetails={employeeDetails} />
              </div>
            ) : (
              // Finally this possibility is that role === ROLE_MANAGER
              <div>
                <ManagerHeaderNavBar employeeDetails={employeeDetails} />
                <ManagerDashboard employeeDetails={employeeDetails} />
              </div>
            )}
          </>
        </Routes>
      </Router>
    </div>
  );
}
