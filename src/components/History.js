import axios from "axios";
import AuthContext from "../context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import TableRow from "./TableRow";
import { Table } from "react-bootstrap";
import { FullAddress } from "../api/APIConstants";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

export function History() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { signedIn } = useContext(AuthContext);
  const { employeeDetails } = useContext(AuthContext);

  useEffect(() => {
    // need to retrieve the token value from the global properties
    const cookies = new Cookies();
    const token = cookies.get('jwt_autherization');
    var tokenValue = "Bearer " + token;
    var clockingUrl =
      FullAddress + "api/v1/clockingByUser?employeeId=" + employeeDetails.id;
    const config = {
      headers: {
        Authorization: tokenValue,
      },
    };
    axios.post(clockingUrl, {}, config).then((responce) => {
      setData(responce.data);
    });
  }, [signedIn]);

  const cards = data.map((item) => {
    return (
      <TableRow
        Id={item.id}
        ClockIn={item.clockIn}
        ClockOut={item.clockOut}
        Duration={item.duration}
      />
    );
  });

  return (
    <div className="dashboard--table">
      <Table className="table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("history.clockIn")}</th>
            <th scope="col">{t("history.clockOut")}</th>
            <th scope="col">{t("history.duration")}</th>
          </tr>
        </thead>
        <tbody>{cards}</tbody>
      </Table>
    </div>
  );
}
