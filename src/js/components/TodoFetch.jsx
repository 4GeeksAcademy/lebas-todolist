import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

export const TodoFetch = () => {
  const [task, setTask] = useState({ label: "", is_done: false });
  const [listTasks, setListTasks] = useState([]);
  const [hoverState, setHoverState] = useState({});
  const urlApi = "https://playground.4geeks.com/todo";
  const urlUser = `${urlApi}/users/eric`;

  const createUser = () => {
    fetch(urlUser)
      .then((response) => {
        if (response.status === 404) {
          return fetch(urlUser, {
            method: "POST",
          });
        }
      })
      .catch((error) => {});
  };

  const deleteUser = () => {
    fetch(`${urlApi}/users/eric`, {
      method: "DELETE",
    })
      .then(() => {
        setListTasks([]);
      })
      .catch((error) => {});
  };

  const saveTask = (e) => {
    if (e.key === "Enter") {
      fetch(`${urlApi}/todos/eric`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then(() => {
          setTask({ label: "", is_done: false });
          getAllTasks();
        })
        .catch((error) => {});
    }
  };

  const deleteTask = (taskToDelete) => {
    const tToDel = taskToDelete.id;

    fetch(`${urlApi}/todos/${tToDel}`, {
      method: "DELETE",
    })
      .then(() => {
        getAllTasks();
      })
      .catch((error) => {});
  };

  const taskDone = (taskBeDone) => {
    const updatedTask = {
      ...taskBeDone,
      is_done: !taskBeDone.is_done,
    };

    fetch(`${urlApi}/todos/${taskBeDone.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        getAllTasks();
      })
      .catch((error) => {});
  };

  const handleMouseEnter = (index) => {
    setHoverState((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleMouseLeave = (index) => {
    setHoverState((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const getAllTasks = () => {
    fetch(urlUser)
      .then((response) => response.json())
      .then((data) => {
        const todosInverse = [...data.todos].reverse();
        setListTasks(todosInverse);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    createUser();
    getAllTasks();
  }, []);

  return (
    <div className="container">
      <p className="title mt-5 text-body-tertiary text-center">todos</p>
      <div className="row">
        <div className="col-8">
          <div className="tasks">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder={
                  listTasks.length !== 0
                    ? "Add a new task"
                    : "No task, add a task"
                }
                name="label"
                value={task.label}
                onChange={(e) =>
                  setTask({
                    ...task,
                    label: e.target.value,
                  })
                }
                onKeyDown={saveTask}
              />
            </form>
          </div>

          <div className="tasks">
            <ul>
              {Array.isArray(listTasks) &&
                listTasks.map((item) => {
                  return (
                    <li
                      className={`task text-body-tertiary ${
                        item.is_done ? "task-done" : ""
                      }`}
                      key={item.id}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
                    >
                      {item.label}
                      {hoverState[item.id] && (
                        <span className="float-end">
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="icon delete me-2"
                            onClick={() => deleteTask(item)}
                          />
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={`icon ${item.is_done ? "done" : ""}`}
                            onClick={() => taskDone(item)}
                          />
                        </span>
                      )}
                      <hr />
                    </li>
                  );
                })}
            </ul>
            <hr />
            <p className="items-number">
              {listTasks.length === 0 || listTasks.length === 1
                ? `${listTasks.length} task in stack`
                : `${listTasks.length} tasks in stack`}
            </p>
          </div>
        </div>
        <div className="subpaper1"></div>
        <div className="subpaper2"></div>
      </div>
      <div>
          <button type="button" onClick={deleteUser} className="mt-2">
            Clear all tasks
          </button>
        </div>
    </div>
  );
};
