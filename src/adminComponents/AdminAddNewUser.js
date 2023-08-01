import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Form, Button, Dropdown } from "react-bootstrap";
import "./AdminComponents.css";
import AuthContext from "../context/AuthProvider";
import { FullAddress } from "../api/APIConstants";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

export function AdminAddNewUser() {
  // need a handleSubmit service
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workingHours, setWorkingHours] = useState();
  const [userRole, setUserRole] = useState("ROLE_USER");
  const userRef = useRef();
  const errRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const cookies = new Cookies();
  const token = cookies.get('jwt_autherization');
  const BearerToken = "Bearer " + token;
  const { t } = useTranslation();

  useEffect(() => {
    const URL = FullAddress + "GetManagers";
    

    // Make the API request to fetch the data
    axios
      .get(URL, {
        headers: {
          Authorization: BearerToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // Store the data in the component's state
        setData(res.data);
      });
  }, []);

  // write a quick function to get the name from the id
  function getNameFromId(data, key) {
    let result = "";
    for (let i = 0; i < data.length; i++) {
      // get the json
      let Employee = data[i];
      if (Employee.id === key) {
        result = Employee.firstName + " " + Employee.lastName;
        break;
      }
    }
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // need axios and globle state
    try {
      // post the user, get the user object:

      let userObject = {
        firstName: firstName,
        lastName: lastName,
        email: user,
        role: userRole,
        password: password,
        managerId: selectedOption,
        agreedHours: workingHours,
      };

      await axios.post(FullAddress + "newTeamMember", userObject, {
        headers: {
          Authorization: BearerToken,
        },
      });
      // this will disable the form, so that only one user can be submitted at a time.
      setDisableButton(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unautherized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
      <>
        {!disableButton ? (
          <h2>{t("AddUser.Title")}</h2>
        ) : (
          <h2>{t("AddUser.User") + " " + user + " "+ t("AddUser.AddedSuccessfully")}</h2>
        )}
      </>
      <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">{t("AddUser.fName")}</Form.Label>

          <Form.Control
            type="text"
            id="firstName"
            ref={firstNameRef}
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder={t("AddUser.fNamePlaceholder")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">{t("AddUser.lName")}</Form.Label>

          <Form.Control
            type="text"
            id="lastName"
            ref={lastNameRef}
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder={t("AddUser.lNamePlaceholder")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">{t("AddUser.uName")}</Form.Label>

          <Form.Control
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            placeholder={t("AddUser.uNamePlaceholder")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">{t("AddUser.password")}</Form.Label>
          <Form.Control
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={t("AddUser.passwordPlaceholder")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="dropDownMenu">
            <>
              {" "}
              {workingHours !== undefined ? (
                <h4>{t("AddUser.HoursSelected") + workingHours} </h4>
              ) : (
                <p>
                  {t("AddUser.HoursBTNLable")}
                </p>
              )}
            </>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic1">
              {t("AddUser.HoursBTN")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setWorkingHours(20)}>
                  20
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setWorkingHours(30)}>
                  30
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setWorkingHours(35)}>
                  35
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setWorkingHours(37.5)}>
                  37.5
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setWorkingHours(40)}>
                  40
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="radioButtons">{t("AddUser.UserTypeLable")}</Form.Label>
          <div className="radiobuttons">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={userRole === "ROLE_USER" ? true : false}
                  onChange={() => {
                    setUserRole("ROLE_USER");
                  }}
                />
                {t("AddUser.uBasic")}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={userRole === "ROLE_MANAGER" ? true : false}
                  onChange={() => {
                    setUserRole("ROLE_MANAGER");
                  }}
                />
                {t("AddUser.uTeamLeader")}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  checked={userRole === "ROLE_ADMIN" ? true : false}
                  onChange={() => {
                    setUserRole("ROLE_ADMIN");
                  }}
                />
                {t("AddUser.uAdmin")}
              </label>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <>
            {selectedOption === null ? (
              <Dropdown onSelect={(value) => setSelectedOption(value)}>
                <h4>{t("AddUser.plsSelectManagerLabel")}</h4>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {t("AddUser.selectManager")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data.map((item) => (
                    <Dropdown.Item key={item.id} eventKey={item.id}>
                      {item.firstName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown onSelect={(value) => setSelectedOption(value)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {t("AddUser.selectManager")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data.map((item) => (
                    <Dropdown.Item key={item.id} eventKey={item.id}>
                      {item.firstName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
                <h4>
                  {t("AddUser.selectedManager") + getNameFromId(data, selectedOption)}
                </h4>
              </Dropdown>
            )}
          </>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={disableButton}
          onClick={handleSubmit}
          // do not need an on-click event because it is the only button in the form.
        >
          {t("AddUser.createUserBTN")}
        </Button>
      </Form>
    </div>
  );
}
