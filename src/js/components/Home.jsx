import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

// create your first component
const Home = () => {
  const [task, setTask] = useState({
    task: "",
    isDone: false
  });
  const [listTasks, setListTasks] = useState([]);
  
  // State to store hover state for each task
  const [hoverState, setHoverState] = useState({});

  const handleEnter = (e) => {
    setTask({
      ...task,
      task: e.target.value,
    });
  };

  const saveTask = (e) => {
    if (e.key === "Enter") {
      setListTasks([
        ...listTasks,
        task
      ]);
      setTask({
        task: "",
        isDone: false
      });
    }
  };

  const deleteTask = (taskToDelete) => {
    const newList = listTasks.filter((item) => item !== taskToDelete);
    setListTasks(newList);
  };

  const taskDone = (taskBeDone) => {
    const updatedList = listTasks.map((item) => {
      if (item === taskBeDone) {
        return {
          ...item,
          isDone: true
        };
      }
      return item;
    });
    setListTasks(updatedList);
  };

  const handleMouseEnter = (index) => {
    setHoverState((prev) => ({
      ...prev,
      [index]: true
    }));
  };

  const handleMouseLeave = (index) => {
    setHoverState((prev) => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <div className="container">
      <p className="title mt-5 text-body-tertiary text-center">todos</p>
      <div className="row">
        <div className="col-8">
          <div className="tasks">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder={listTasks !== "" ? "Add a new task" : "No task, add a task"}
                name="task"
                value={task.task}
                onChange={handleEnter}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveTask(e);
                  }
                }}
              />
            </form>
          </div>

          {/* Task list */}
          <div className="tasks">
            <ul>
              {listTasks.map((item, index) => {
                return (
                  <li
                    className={`task text-body-tertiary ${item.isDone ? 'task-done' : ''}`}
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {item.task}
                    {hoverState[index] && (
                      <span className="float-end">
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="icon delete me-2"
                          onClick={() => deleteTask(item)}
                        />
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={`icon ${item.isDone ? 'done' : ''}`}
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
              {(listTasks.length === 0) ? `${listTasks.length} item` : `${listTasks.length} items`}
            </p>
          </div>
          {/* End of task list */}
        </div>
        <div className="subpaper1"></div>
        <div className="subpaper2"></div>
      </div>
    </div>
  );
};

export default Home;
