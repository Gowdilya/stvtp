import React, { useState } from "react";

import "./Dropdown.css";
import { Link } from "react-router-dom";

function Dropdown(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click ? "settings-dropdown-menu clicked" : "settings-dropdown-menu"
        }
      >
        {props.MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => props.closeMobileMenu()}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
