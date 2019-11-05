import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
// import { string, number } from "prop-types";

import * as ROUTES from "../../constants/routes";

function ProjectSidebarItem({
  project: {
    name = "Label",
    todosCount = 0,
    color: { colorValue = "" } = {},
  } = {},
}) {
  const sidebarItemClasses = classnames({
    Sidebar__Section__Item: true,
  });

  return (
    <>
      <li className={sidebarItemClasses}>
        <NavLink
          to={`${ROUTES.PROJECT}${name.toLowerCase()}`}
          activeClassName="Sidebar__Link--Active"
          className="Sidebar__Link"
        >
          <svg
            className="Sidebar__Section__Item__Color__Icon"
            fill={colorValue}
          >
            <use xlinkHref="#color" />
          </svg>
          {name}
          <span className="Sidebar__Section__Item__Count">{todosCount}</span>
        </NavLink>
      </li>
    </>
  );
}

ProjectSidebarItem.propTypes = {};

export default ProjectSidebarItem;
