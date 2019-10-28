import React from "react";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

function Inbox({ inboxTodos, overdueInboxTodos }) {
  return (
    <Main>
      <h1 className="Page__Title">Inbox</h1>
      {overdueInboxTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {overdueInboxTodos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
          </ul>
        </section>
      ) : null}
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Todos</h2>
        </header>
        {inboxTodos.length ? (
          <ul className="Section__Todos__List">
            {inboxTodos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
          </ul>
        ) : null}
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

export default Inbox;
