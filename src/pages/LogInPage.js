import { useRef, useState, useEffect, useContext } from "react";
import "./LogInPage.css";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../context/AuthProvider"; //import this later
import DropdownList from "react-widgets/DropdownList";
import { FullAddress } from "../api/APIConstants";
import { toast } from "react-toastify";


const LOGIN_URL = FullAddress + "authenticate";

export function LogInPage() {
  // need to get the username and the passowrd from the form
  const { t, i18n } = useTranslation();
  const { setJwt } = useContext(AuthContext);
  const { setSucess } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setEmployeeDetails } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  //const [sucess, setSucess] = useState(false);

  const theLanguages = [
    { id: 1, lang: "en", name: t("language.en") },
    { id: 2, lang: "de", name: t("language.de") },
    { id: 3, lang: "es", name: t("language.es") },
  ];

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  const handleChangeRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    // on load see if the user is known:
    if (localStorage.getItem("username") !== null){
      setUser(localStorage.getItem("username"));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // need axios and globle state

    try {
      const response = await axios.post(LOGIN_URL, {
        email: user,
        password: password,
      });
      //console.log(response);
      if (response.status === 200) {
        
        setEmployeeDetails(response.data.employeeDetails);
        //setJwt(response.data.jwt);
        //console.log("entered this 200 loop");
        //console.log(response.data.jwt);
        //setSucess(true);
        // set the cookie value:
        const cookies = new Cookies();
        cookies.set("jwt_autherization", response.data.jwt, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 20),
        });
        cookies.set("employeeDetails", response.data.employeeDetails, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 20),
        })
        
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unautherized");
      } else if (err.response?.status === 403) {
        setErrMsg("Unautherized 403");
        toast.error(t("login.authenticate-error"));

      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }

    //Now save the username if the user wants to be remembered:
    if (rememberMe){
      localStorage.setItem("username", user);
    }
  };

  return (
    <section className="Login--background">
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {t("navbar.CompanyName")}
          </a>
          <span className="navbar-text">
            <DropdownList
              defaultValue={t("navbar.ChangeLanguage")}
              data={theLanguages}
              dataKey="id"
              textField="name"
              onChange={(dataKey) => handleClick(dataKey.lang)}
            />
          </span>
        </div>
      </nav>
      <div className="LogInPage-parent">
        <div className="LogInPage-child"></div>

        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">{t("login.user-label")}</Form.Label>

            <Form.Control
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder={t("login.user-background-text")}
              required
            />
            <Form.Text>{t("login.user-company-promise")}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">
              {t("login.password-label")}
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder={t("login.password-background-text")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label={t("login.remember-me-label")} checked={rememberMe} onChange={handleChangeRememberMe}/>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            // do not need an on-click event because it is the only button in the form.
          >
            {t("login.button-label")}
          </Button>
        </Form>
      </div>
    </section>
  );
}
