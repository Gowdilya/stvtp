import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import TableChartIcon from "@mui/icons-material/TableChart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import SearchIcon from "@mui/icons-material/Search";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import logo from "../../images/cooktop_logo.png";

const StyledNav = styled.nav`
  display: flex;
  font-size: 1.2rem;
  font-family: "PT Sans", sans-serif;
`;
const StyledContainer = styled.div`
  height: 60px;
  justify-content: center;
  font-size: 1.2rem;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #212121;
`;

const StyledLink = styled(Link)`
  color: #fff;
  height: 80px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
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
        <div className="w-full nav-width">
          <div className="inline-block">
            <img
              className="m-auto pt-3 ml-6"
              src={logo}
              alt="Cook Top Safety"
              height={100}
              width={120}
            />
            {/* <StyledLink
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          ></StyledLink> */}
          </div>
          <div className="inline-block mp-9 mt-6 align-right float-right h-max">
            <StyledNav>
              <div className="menu-icon4 mr-3">
                <NotificationImportantIcon className="text-white" />
              </div>
              {/* <div className="dropdown menu-icon3 mr-3">
                <SettingsIcon className="text-white" />

                <div class="dropdown-content">
                  <Link to="/buildings">
                    <BarChartIcon /> Buildings & Apartments
                  </Link>
                  <Link to="/user-management">
                    <AccountCircleIcon /> User Management
                  </Link>
                </div>
              </div> */}
              <div className="menu-icon2 mr-3">
                <SearchIcon className="text-white" />
              </div>
              <div className="menu-icon mr-9" onClick={handleClick}>
                {click ? (
                  <CloseIcon className="text-white" />
                ) : (
                  <MenuIcon className="text-white" />
                )}
              </div>

              <ul className={click ? "nav-menu active w-80" : "nav-menu w-80"}>
                <div className="w-80 text-center m-auto">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <HomeIcon /> Home
                    </Link>
                  </li>
                  <li className="nav-item rounded">
                    <Link
                      to="/reports"
                      className="nav-links rounded"
                      onClick={closeMobileMenu}
                    >
                      <TableChartIcon /> Reports
                    </Link>
                  </li>

                  <li className="nav-item rounded">
                    <Link
                      to="/analytics"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <TimelineIcon /> Analytics
                    </Link>
                  </li>
                </div>

                <div className="w-80 m-auto mt-0 mb-0">
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <SupervisorAccountIcon />
                      Admin{" "}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Link to="/user-management" onClick={closeMobileMenu}>
                        <div className="p-5 hover:bg-nav-blue hover:text-white rounded">
                          <AccountCircleIcon /> User Management
                        </div>
                      </Link>
                      <Link to="/buildings" onClick={closeMobileMenu}>
                        <div className="p-5 hover:bg-nav-blue hover:text-white rounded">
                          <ApartmentIcon /> Buildings & Apartments
                        </div>
                      </Link>
                      {/* <div>
                        <Link to="/apartments" onClick={closeMobileMenu}>
                          <ApartmentIcon /> Apartments
                        </Link>
                      </div> */}
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div className="w-80 m-auto mt-0 mb-0">
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <SettingsIcon />
                      Settings{" "}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="p-5 hover:bg-nav-blue hover:text-white rounded ">
                        <Link to="/network" onClick={closeMobileMenu}>
                          <NetworkCheckIcon /> Network
                        </Link>
                      </div>
                      <div className="p-5 hover:bg-nav-blue hover:text-white rounded">
                        <Link to="/alert-thresholds" onClick={closeMobileMenu}>
                          <AddAlertIcon /> Alert Thresholds
                        </Link>
                      </div>
                      <div className="p-5 hover:bg-nav-blue hover:text-white rounded">
                        <Link to="/my-profile" onClick={closeMobileMenu}>
                          <AccountBoxIcon /> Profile
                        </Link>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <li>
                  <div className="w-80 m-auto mt-0 mb-0">
                    <Link
                      to="/log-out"
                      className="nav-links-mobile"
                      onClick={closeMobileMenu}
                    >
                      <LogoutIcon /> Log Out
                    </Link>
                  </div>
                </li>
              </ul>
              <Button />
            </StyledNav>
          </div>
        </div>
      </StyledContainer>
    </>
  );
}

export default Navbar;
