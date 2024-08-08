import { useId } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTaskSchema } from "../../Schemas/schemas";
import ModalWindow from "../ModalWindow/ModalWindow";
import { addTaskValues, switchModal } from "../../redux/slice";
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
  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  function handleSubmit(values, actions) {
    dispatch(addTaskValues(values));
    closeModal();
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

            <div className={css.taskFormItem}>
              <label htmlFor={dimensionId}>Dimension</label>
              <Field
                className={css.field}
                as="select"
                name="dimension"
                id={dimensionId}
              >
                <option value="1x1">1x1</option>
                <option value="9x16">9x16</option>
                <option value="16x9">16x9</option>
              </Field>
              <ErrorMessage
                className={css.errorMsg}
                name="dimension"
                as="span"
              />
            </div>

            <div className={css.taskFormItem}>
              <label htmlFor={imagesId}>Images</label>
              <Field className={css.field} name="image_layers" id={imagesId} />
              <ErrorMessage
                className={css.errorMsg}
                name="image_layers"
                as="span"
              />
            </div>

            <div className={css.taskFormItem}>
              <label htmlFor={textId}>Text</label>
              <Field className={css.field} name="text_layers" id={textId} />
              <ErrorMessage
                className={css.errorMsg}
                name="text_layers"
                as="span"
              />
            </div>

            <div className={css.taskFormItem}>
              <label htmlFor={amountId}>Amount</label>
              <Field className={css.field} name="amount" id={amountId} />
              <ErrorMessage className={css.errorMsg} name="amount" as="span" />
            </div>

            <div className={css.taskFormItem}>
              <label htmlFor={genTypeId}>Gen type</label>
              <Field
                className={css.field}
                as="select"
                name="gen_type"
                id={genTypeId}
              >
                <option value="cyclic_generation">Cyclic</option>
                <option value="random_generation">Random</option>
              </Field>
              <ErrorMessage
                className={css.errorMsg}
                name="gen_type"
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
