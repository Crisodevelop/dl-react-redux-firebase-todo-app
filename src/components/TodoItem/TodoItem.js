import React from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";
import classnames from "classnames";
import { useDispatch } from "react-redux";

import "./TodoItem.styles.scss";

import { toggleTodoCompleted } from "../../redux/todos/todos-actions";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

function Todo(props) {
  const {
    labels,
    project,
    dueDate,
    completed,
    todoLabel,
    setIsEditingTodo,
    id,
  } = props;

  const todoButtonClassnames = classnames({
    Todo__Button: true,
    [`Todo__Button--Completed`]: completed ? true : false,
  });

  const todoItemClassnames = classnames({
    Todo__Item: true,
  });

  const dispatch = useDispatch();

  return (
    <li className={todoItemClassnames}>
      <button
        className={todoButtonClassnames}
        onClick={() => dispatch(toggleTodoCompleted(id))}
      >
        <svg className="Todo__Button__Icon">
          <use xlinkHref="#check-20" />
        </svg>
      </button>
      <div className="Todo__Item__Contents">
        <div className="Todo__Name__Row">
          <button
            className="Todo__Name"
            aria-label={`Edit todo ${todoLabel}`}
            onClick={() => setIsEditingTodo(true)}
          >
            {todoLabel}
          </button>
          {project && (
            <TodoProjectTag
              buttonAdditionalClasses="Todo__Item__Project"
              projectName={project.name}
              projectColorValue={project.colorValue}
              iconSide="right"
              onClick={() => setIsEditingTodo(true)}
            />
          )}
        </div>
        {(labels || dueDate) && (
          <>
            <div className="Todo__Status__Row">
              {labels &&
                labels.map((label) => (
                  <TodoLabelTag
                    key={label.labelID}
                    labelName={label.name}
                    labelColorValue={label.colorValue}
                    onClick={() => setIsEditingTodo(true)}
                  />
                ))}
              {dueDate && (
                <TodoDueDate
                  dueDate={dueDate}
                  onClick={() => setIsEditingTodo(true)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

Todo.propTypes = {
  labels: arrayOf(
    shape({
      labelID: string,
      name: string,
      colorName: string,
      colorValue: string,
    }),
  ),
  project: shape({
    projectID: string.isRequired,
    name: string.isRequired,
    colorName: string.isRequired,
    colorValue: string.isRequired,
  }).isRequired,
  dueDate: object,
  completed: bool.isRequired,
  todoLabel: string.isRequired,
  setIsEditingTodo: func.isRequired,
};

Todo.defaultProps = {
  labels: null,
  dueDate: null,
};

export default Todo;