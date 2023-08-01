import AuthContext from "../context/AuthProvider";
import React, { useState, useContext } from "react";
import "./components.css";
import DateTimePicker from "react-datetime-picker";
import { Button } from "react-bootstrap";
import {
  submitUnapprovedClockInEvent,
  submitUnapprovedClockOutEvent,
} from "../api/APIFunctions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export function FailedToClock() {
  // i need to get the employee id and the jwt
  const { t } = useTranslation();
  const { jwt } = useContext(AuthContext);
  const { employeeDetails } = useContext(AuthContext);
  const employeeId = employeeDetails.id;

  function getDateInTheCorrectFormat(selectedDate) {
    let localeString = selectedDate.toLocaleString("en-ZA");
    // then need to delete the comma and replace the slashes with minuses
    let result = localeString.replace(",", "");
    result = result.replace("/", "-");
    result = result.replace("/", "-");
    return result;
  }

  const [value, setValue] = useState(new Date());
  const [clockingIn, setClockingIn] = useState(true);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  function sumbitRequest(value) {
    let timestampString = getDateInTheCorrectFormat(value);
    if (clockingIn) {
      submitUnapprovedClockInEvent({
        token: jwt,
        employeeId: employeeId,
        timestampString: timestampString,
      });
    } else {
      submitUnapprovedClockOutEvent({
        token: jwt,
        employeeId: employeeId,
        timestampString: timestampString,
      });
    }

    setRequestSubmitted(true);

  }

  

  const notify = () => toast.success(t("FTC.RequestSubmitted"), {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
  


  return (
    <section className="FTC--DateTimePickerBox">
      <h4>{t("FTC.TitleMessage")}</h4>
      <h5>{t("FTC.SubTitleMessage")}</h5>
      <div className="radiobuttons">
        <div className="radio">
          <label>
            <input
              type="radio"
              checked={clockingIn}
              onChange={() => {
                setClockingIn(!clockingIn);
              }}
            />
            {t("FTC.ClockInBTN")}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              checked={!clockingIn}
              onChange={() => {
                setClockingIn(!clockingIn);
              }}
            />
            {t("FTC.ClockOutBTN")}
          </label>
        </div>
      </div>
      <h5>{t("FTC.ClockOutBTN")}</h5>
      <DateTimePicker
        className="timeDatePicker"
        locale={t("FTC.Locale")}
        format="yyyy-MM-dd HH:mm:ss"
        maxDetail="second"
        onChange={setValue}
        value={value}
      />
      <div className="FTC--SubmitButton">
      <Button
        disabled={requestSubmitted}
        onClick={() => {
          sumbitRequest(value);
          notify();
        }}
      >
        {t("FTC.SubmitBTN")}
      </Button>
    </div>  
    </section>
  );
}
