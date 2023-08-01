import axios from "axios";
import { useEffect } from "react";
import { FullAddress } from "./APIConstants";
import Cookies from "universal-cookie";


// I need to make a Clock In and a Clock Out function

export function ClockInRequest({ employeeId, setSignedIn }) {
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');
  const Clock_In_URL = FullAddress + "api/v1/clockIn?EmployeeId=" + employeeId;
  const BearerToken = "Bearer " + token;
  axios
    .post(
      Clock_In_URL,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      }
    )
    .then((res) => {
      setSignedIn(true);
    });
}

export function ClockOutRequest({ employeeId, setSignedIn }) {
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');
  
  const Clock_Out_URL =
    FullAddress + "api/v1/clockOut?EmployeeId=" + employeeId;
  const BearerToken = "Bearer " + token;
  //console.log(BearerToken);

  axios
    .post(
      Clock_Out_URL,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      }
    )
    .then((res) => {
      //console.log(res.data);
      setSignedIn(false);
    });
}

export async function ClockingEvents({
  value,
  setValue,
  employeeId,
  setSignedIn,
}) {
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');

  const Clock_Out_URL = FullAddress + "api/v1/events?EmployeeId=" + employeeId;
  const BearerToken = "Bearer " + token;
  const response = await axios.get(Clock_Out_URL, {
    headers: {
      Authorization: BearerToken,
    },
  });
  setValue(response.data[0]);
  const variable = response.data;
  let object = {};
  // now work out the seignedInValue
  let booleanValue = false;
  let timestamp;
  if (variable.length > 0) {
    for (let i = variable.length; i > 0; i--) {
      let object = variable[i - 1];
      let theEvent = object["event"];
      let isApproved = object["approved"];
      if (isApproved) {
        if (theEvent === "ClockIn") {
          booleanValue = true;
          timestamp = object["timestamp"];
          break;
        }
      }
    }
  }
  //setTime(object["timestamp"]);
  setSignedIn(booleanValue);
  return value;
}

export async function submitUnapprovedClockInEvent({
  employeeId,
  timestampString,
}) {
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');
  const Clock_Out_URL =
    FullAddress + "api/v1/unapprovedClockIn?EmployeeId=" + employeeId;
  const BearerToken = "Bearer " + token;
  await axios.post(
    Clock_Out_URL,
    { timestamp: timestampString },
    {
      headers: {
        Authorization: BearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function submitUnapprovedClockOutEvent({
  employeeId,
  timestampString,
}) {
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');
  const Clock_Out_URL =
    FullAddress + "api/v1/unapprovedClockOut?EmployeeId=" + employeeId;
  const BearerToken = "Bearer " + token;
  await axios.post(
    Clock_Out_URL,
    { timestamp: timestampString },
    {
      headers: {
        Authorization: BearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
}
