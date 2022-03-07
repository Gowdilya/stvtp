import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./SettingsDropDown/Dropdown";
import AdminDropdown from "./AdminDropDown/Dropdown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuItems } from "./AdminOptions";
import { SettingsOptions } from "./SettingsOptions";
import TableChartIcon from "@mui/icons-material/TableChart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const StyledNav = styled.nav`
  background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-family: "PT Sans", sans-serif;
`;
const StyledContainer = styled.div`
  height: 80px;
  justify-content: center;
  font-size: 1.2rem;
  align-items: center;
  background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
`;

const StyledLink = styled(Link)`
  color: #fff;
  height: 80px;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-left: 40px;
  margiin-top: 80px;
  cursor: pointer;
  justify-self: start;
`;

function Navbar() {
  const [click, setClick] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };

  const handleSettingsExpand = () => {
    setOpenSettings(!openSettings);
  };

  const handleAdminExpand = () => {
    setOpenAdmin(!openAdmin);
  };
  return (
    <>
      <StyledContainer>
        <div className="inline-block">
          <StyledLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            STVTP
          </StyledLink>
        </div>

        <div className="float-right">
          <StyledNav>
            <div className="menu-icon" onClick={handleClick}>
              {click ? (
                <CloseIcon className="text-white" />
              ) : (
                <MenuIcon className="text-white" />
              )}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  <HomeIcon /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/reports"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <TableChartIcon /> Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/analytics"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <BarChartIcon /> Analytics
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  to="/metrics"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <BarChartIcon /> Metrics
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  to="/alerts"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <FireplaceIcon /> Alerts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/trends"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <TimelineIcon /> Trends
                </Link>
              </li> */}

              <li className="nav-item" onClick={handleAdminExpand}>
                {openAdmin && (
                  <AdminDropdown
                    closeMobileMenu={closeMobileMenu}
                    MenuItems={MenuItems}
                  />
                )}
                <Link to="/" className="nav-links">
                  <SupervisorAccountIcon />
                  Admin{" "}
                  {openAdmin ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Link>
              </li>
              <li className="nav-item" onClick={handleSettingsExpand}>
                {openSettings && (
                  <Dropdown
                    closeMobileMenu={closeMobileMenu}
                    MenuItems={SettingsOptions}
                  />
                )}
                <Link to="/services" className="nav-links">
                  <SettingsIcon />
                  Settings{" "}
                  {openSettings ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Link>
              </li>
              <li>
                <Link
                  to="/log-out"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  <LogoutIcon /> Log Out
                </Link>
              </li>
            </ul>
            <Button />
          </StyledNav>
        </div>
      </StyledContainer>
    </>
  );
}

export default Navbar;
