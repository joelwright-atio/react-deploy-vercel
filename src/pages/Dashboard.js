import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import "./Dashboard.css";
import { History } from "../components/History";
import { FailedToClock } from "../components/FailedToClock";
import { Home } from "../components/Home";
import { ClockingEvents } from "../api/APIFunctions";

// how to get gobal state??
// need to retreive the global state JWT token from the login page

export function Dashboard() {
  const { tab } = useContext(AuthContext);
  const { employeeDetails } = useContext(AuthContext);
  const employeeId = employeeDetails.id;
  const [value, setValue] = useState([]);
  const [setTimeClockedIn] = useState("");
  const { signedIn, setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    // need to retrieve the token value from the global properties

    ClockingEvents({
      value: value,
      setValue: setValue,
      employeeId: employeeId,
      setSignedIn: setSignedIn,
      setTimeClockedIn: setTimeClockedIn,
    });
  }, [signedIn]);

  return (
    <div className="dashboard--parent">
      <div className="dashboard--child">
        <>
          {tab === "Home" ? (
            <Home />
          ) : tab === "History" ? (
            <History />
          ) : tab === "FailedToClock" ? (
            <FailedToClock />
          ) : (
            <h4> Problem with the tab context</h4>
          )}
        </>
        <br></br>
      </div>
    </div>
  );
}
