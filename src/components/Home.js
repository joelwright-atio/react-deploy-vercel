import AuthContext from "../context/AuthProvider";
import { Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import {
  ClockInRequest,
  ClockOutRequest,
  ClockingEvents,
} from "../api/APIFunctions";
import { useTranslation } from "react-i18next";

// how to get gobal state??
// need to retreive the global state JWT token from the login page

export function Home() {
  const { t } = useTranslation();
  const { employeeDetails } = useContext(AuthContext);
  const employeeId = employeeDetails.id;
  const [value, setValue] = useState({});
  const [timeClockedIn, setTimeClockedIn] = useState("");
  const firstName = employeeDetails.firstName;
  const welcomeComment = t("home.Hello") + firstName;
  const { signedIn, setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    // need to retrieve the token value from the global properties
    async function fetchData() {
      try {
      const newValue = await ClockingEvents({
        value: value,
        setValue: setValue,
        employeeId: employeeId,
        setSignedIn: setSignedIn,
      });
      
    } catch (error) {
      // Handle any errors that might occur during ClockingEvents
      console.error("Error occurred in ClockingEvents:", error);
    }
  }

  fetchData();

  if (value.length > 0) {
    setTimeClockedIn();
  }

  }, []);

  return (
    <div>
      <h4>{welcomeComment} </h4>
      <>
        {signedIn ? (
          <h4>{t("home.ClockInMessage") + value.timestamp}</h4>
        ) : (
          <h4> {t("home.SupportMessage")}</h4>
        )}
      </>
      <div className="dashboard--buttons">
        <Button
          variant="outline-primary"
          size="xxl"
          onClick={() =>
            ClockInRequest({
              employeeId: employeeId,
              setSignedIn: setSignedIn,
            })
          }
          disabled={signedIn}
        >
          {t("home.ClockInBTN")}
        </Button>
        <Button
          variant="danger"
          size="xxl"
          onClick={() =>
            ClockOutRequest({
              employeeId: employeeId,
              setSignedIn: setSignedIn,
            })
          }
          disabled={!signedIn}
        >
          {t("home.ClockOutBTN")}
        </Button>
      </div>
    </div>
  );
}
