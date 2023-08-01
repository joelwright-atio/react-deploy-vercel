import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FullAddress } from "../api/APIConstants";
import AuthContext from "../context/AuthProvider";
import { ASCERow } from "./ASCERow";
import { Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ManagerASCE() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const { employeeDetails } = useContext(AuthContext);

  
  // get the jwt token from the cookie
  const cookies = new Cookies();
  const jwt = cookies.get('jwt_autherization');

  useEffect(() => {
    // Make the API request to fetch the data


    const managerId = employeeDetails.id;
    const URL =
      FullAddress + "api/v1/GetUnapprovedClockingEvents?ManagerId=" + managerId;
    const BearerToken = "Bearer " + jwt;
    if (update) {
      axios
        .get(URL, {
          headers: {
            Authorization: BearerToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((responseData) => {
          // Store the data in the component's state
          setData(responseData.data);
        });
      setUpdate(false);
    }
  }, [update]);

  // Map over the data to create a list of table rows
  const rows = data.map((item) =>
    ASCERow({ item: item, jwt: jwt, update: update, setUpdate: setUpdate, t: t, toast: toast })
  );

  return (
    <div>
      <h4> {t("ASCE.ASCE")} </h4>
      <Table className="table-striped">
        <thead className="thead-dark">
          <tr>
            <th>{t("ASCE.Name")}</th>
            <th>{t("ASCE.Event")}</th>
            <th>{t("ASCE.timestamp")}</th>
            <th>{t("ASCE.actions")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default ManagerASCE;
