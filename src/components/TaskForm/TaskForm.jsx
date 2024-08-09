import { useId } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTaskSchema } from "../../Schemas/schemas";
import ModalWindow from "../ModalWindow/ModalWindow";
import { addTaskValues, openAddTaskForm, switchModal } from "../../redux/slice";
import css from "./TaskForm.module.css";

const TaskForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    template_id: nanoid(),
    task_name: "",
    dimension: "1x1",
    image_layers: "",
    text_layers: "",
    amount: "",
    gen_type: "cyclic_generation",
  };

  const taskNameId = useId();

  function handleSubmit(values, actions) {
    dispatch(addTaskValues(values));
    dispatch(openAddTaskForm(false));
    actions.resetForm();
  }

  function closeModal() {
    dispatch(switchModal(false));
  }

  return (
    <ModalWindow>
      <div className={css.formContainer}>
        <div className={css.btnContainer}>
          <button
            className={css.closeModalBtn}
            type="button"
            onClick={closeModal}
          >
            <svg className={css.closeIcon} width="32" height="32">
              <use href="/src/IconsSprite/sprite.svg#icon-Rating-1"></use>
            </svg>
          </button>
        </div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={createTaskSchema}
        >
          <Form className={css.taskForm}>
            <div className={css.taskFormItem}>
              <label htmlFor={taskNameId}>Task name</label>
              <Field
                className={css.field}
                type="text"
                name="task_name"
                id={taskNameId}
              />
              <ErrorMessage
                className={css.errorMsg}
                name="task_name"
                as="span"
              />
            </div>

            <button className={css.createTaskBtn} type="submit">
              Create new task
            </button>
          </Form>
        </Formik>
      </div>
    </ModalWindow>
  );
};

export default TaskForm;
