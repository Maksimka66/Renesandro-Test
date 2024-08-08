import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  selectAddTaskForm,
  selectModalWindow,
  selectTable,
} from "../../redux/selectors";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import TaskForm from "../../components/TaskForm/TaskForm";
import { openAddTaskForm, switchModal } from "../../redux/slice";
import css from "./Tasks.module.css";

const Tasks = () => {
  const dispatch = useDispatch();
  const table = useSelector(selectTable);
  const formAddTask = useSelector(selectModalWindow);
  const stateTaskForm = useSelector(selectAddTaskForm);

  function createTask() {
    dispatch(switchModal(true));
    dispatch(openAddTaskForm(true));
  }

  return (
    <div className={css.listContainer}>
      {table.length !== 0 ? (
        <ul className={css.tasksList}>
          {table.map((item) => (
            <li key={item.template_id} className={css.listItem}>
              {<TaskColumn item={item} />}
            </li>
          ))}
        </ul>
      ) : (
        <h1 className={css.welcomeHeader}>
          Welcome! We`ll help you with your tasks. Let`s get started!
        </h1>
      )}
      <button className={css.addTaskBtn} type="button" onClick={createTask}>
        Add task
      </button>
      {formAddTask && stateTaskForm && <TaskForm />}

      <Outlet />
    </div>
  );
};

export default Tasks;
