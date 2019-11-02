import React from "react";
import { string, func, bool } from "prop-types";
import classNames from "classnames";

import "./TodoProjectTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { useRectSize } from "../../hooks";
import ProjectsDropdownContainer from "../../redux/containers/components/ProjectsDropdownContainer";

const TodoProjectTag = ({
  projectName,
  projectColorValue,
  iconSide,
  buttonAdditionalClasses,
  iconAdditionalClasses,
  isVisible,
  toggleVisibility,
  bottomFixed,
  onChangeHandler,
  ...props
}) => {
  const buttonAddedClasses = getClassesFromProps(buttonAdditionalClasses);
  const iconAddedClasses = getClassesFromProps(iconAdditionalClasses);

  const buttonClassNames = classNames({
    Todo__Project__Tag: true,
    ...buttonAddedClasses,
  });

  const iconClassNames = classNames({
    Todo__Project__Tag__Icon: true,
    Todo__Project__Tag__Icon__RightSide: iconSide === "right",
    Todo__Project__Tag__Icon__LeftSide: iconSide === "left",
    ...iconAddedClasses,
  });

  const [projectsTagRef, projectsTagSize] = useRectSize();

  return (
    <>
      <button
        className={buttonClassNames}
        type="button"
        ref={projectsTagRef}
        onClick={toggleVisibility}
        {...props}
      >
        {iconSide === "left" ? (
          <>
            <svg className={iconClassNames} fill={projectColorValue}>
              <use xlinkHref="#color" />
            </svg>
            {projectName}
          </>
        ) : (
          <>
            {projectName}
            <svg className={iconClassNames} fill={projectColorValue}>
              <use xlinkHref="#color" />
            </svg>
          </>
        )}
      </button>
      {isVisible && (
        <ProjectsDropdownContainer
          onChangeHandler={onChangeHandler}
          bottomFixed={bottomFixed}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
          position={{
            left: projectsTagSize.left || 0,
            right: projectsTagSize.right || 0,
            top: projectsTagSize.top + projectsTagSize.height + 8 || 0,
          }}
        />
      )}
    </>
  );
};

TodoProjectTag.propTypes = {
  projectName: string.isRequired,
  projectColorValue: string,
  iconSide: string,
  buttonAdditionalClasses: string,
  iconAdditionalClasses: string,
  bottomFixed: bool,
  isVisible: bool,
  toggleVisibility: func,
  onChangeHandler: func,
};

TodoProjectTag.defaultProps = {
  projectColorValue: null,
  iconSide: "left",
  buttonAdditionalClasses: null,
  iconAdditionalClasses: null,
  bottomFixed: false,
  isVisible: false,
  toggleVisibility: null,
  onChangeHandler: null,
};

export default TodoProjectTag;
