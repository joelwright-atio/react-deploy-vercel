import React from "react";
import axios from "axios";
import { FullAddress } from "../api/APIConstants";
import { Button } from "react-bootstrap";
import "./ManagerComponents.css";


export function ASCERow({ item, jwt, update, setUpdate, t, toast }) {

  const notifyAccepted = () => toast.success(t("ASCE.RequestAccepted"), {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyRejected = () => toast.success(t("ASCE.RequestRejected"), {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  function handleButtonClickAccept() {
    const EventId = item.id;
    const BearerToken = "Bearer " + jwt;
    
    let ApproveURL =
      FullAddress + "api/v1/ApproveClockingEvent?EventId=" + EventId;
    
    axios.put(ApproveURL, null, {
      headers: {
        Authorization: BearerToken,
      },
    });
    notifyAccepted();
  };

  function handleButtonClickReject() {
    const EventId = item.id;
    const BearerToken = "Bearer " + jwt;
    let RejectURL =
      FullAddress + "api/v1/RejectClockingEvent?EventId=" + EventId;

    axios.delete(RejectURL, {
      headers: {
        Authorization: BearerToken,
      },
    });
    notifyRejected();
  };

  return (
    <tr key={item.id}>
      <td>{item.employeeName}</td>
      <td>{item.event}</td>
      <td>{item.timestamp}</td>
      <td>
        <Button
          className="btn btn-primary mx-1"
          onClick={() => {
            handleButtonClickAccept(); 
            notifyAccepted();
          }}
          data-type="accept"
          data-id={item.id}
        >
          Accept
        </Button>
        <Button
          className="btn btn-danger mx-1"
          onClick={() => {
            handleButtonClickReject();
            notifyRejected();
          }}
          data-type="reject"
          data-id={item.id}
        >
          Reject
        </Button>
      </td>
    </tr>
  );
}
