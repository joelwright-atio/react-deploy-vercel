import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Button } from "react-bootstrap";
import { ReactComponent as SVGIcon } from "../media/icons/box-arrow-right.svg";
import DropdownList from "react-widgets/DropdownList";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

export default function AdminHeaderNavBar() {
  const { t, i18n } = useTranslation();
  const { setSucess } = useContext(AuthContext);
  const { setEmployeeDetails } = useContext(AuthContext);
  const { setTab } = useContext(AuthContext);

  const theLanguages = [
    { id: 1, lang: "en", name: t("language.en") },
    { id: 2, lang: "de", name: t("language.de") },
    { id: 3, lang: "es", name: t("language.es") },
  ];

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  function signOut() {
    const cookies = new Cookies();
    cookies.remove("jwt_autherization", { path: "/" });
    setSucess(false);
    setEmployeeDetails({});
    setTab("Home");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {t("navbar.CompanyName") + ": " + t("navbar.AdminPortal")}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setTab("Home")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => setTab("Home")}
              >
                {t("navbar.Home")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setTab("History")}
              >
                {t("navbar.History")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setTab("FailedToClock")}
              >
                {t("navbar.F2C")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setTab("ASCE")}>
                {t("navbar.ASCE")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setTab("AddUser")}
              >
                {t("navbar.AddUser")}
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <DropdownList
              defaultValue={t("navbar.ChangeLanguage")}
              data={theLanguages}
              dataKey="id"
              textField="name"
              onChange={(dataKey) => handleClick(dataKey.lang)}
            />
          </span>
          <span className="navbar-text">
            <Button variant="transparent" onClick={() => signOut()}>
              <SVGIcon className="bi bi-box-arrow-right" />
              {t("navbar.LogOut")}
            </Button>
          </span>
        </div>
      </div>
    </nav>
  );
}
