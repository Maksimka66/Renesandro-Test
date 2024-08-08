import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { switchModal } from "../../redux/slice";
import {
  selectCard,
  selectModalWindow,
  selectSendTaskForm,
} from "../../redux/selectors";
import { createTaskSchema } from "../../Schemas/schemas";
import css from "./Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const {
    task_name,
    amount,
    dimension,
    gen_type,
    image_layers,
    template_id,
    text_layers,
  } = useSelector(selectCard);
  const modalWindowCard = useSelector(selectModalWindow);
  const sendForm = useSelector(selectSendTaskForm);

  const taskNameId = useId();
  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  const initialValues = {
    task_name,
    amount,
    dimension,
    gen_type,
    image_layers,
    template_id,
    text_layers,
  };

  function closeModal() {
    dispatch(switchModal(false));
  }

  function submitFullTask() {}

  return (
    modalWindowCard &&
    sendForm && (
      <ModalWindow>
        <div>
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
            initialValues={initialValues}
            onSubmit={submitFullTask}
            validationSchema={createTaskSchema}
          >
            <Form>
              <div>
                <label htmlFor={taskNameId}>Task name</label>
                <Field type="text" name="task_name" id={taskNameId} />
                <ErrorMessage name="task_name" as="span" />
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
                <ErrorMessage name="dimension" as="span" />
              </div>

              <div className={css.taskFormItem}>
                <label htmlFor={imagesId}>Images</label>
                <Field
                  className={css.field}
                  name="image_layers"
                  id={imagesId}
                />
                <ErrorMessage name="image_layers" as="span" />
              </div>

              <div className={css.taskFormItem}>
                <label htmlFor={textId}>Text</label>
                <Field className={css.field} name="text_layers" id={textId} />
                <ErrorMessage name="text_layers" as="span" />
              </div>

              <div className={css.taskFormItem}>
                <label htmlFor={amountId}>Amount</label>
                <Field className={css.field} name="amount" id={amountId} />
                <ErrorMessage name="amount" as="span" />
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
                <ErrorMessage name="gen_type" as="span" />
              </div>

              <button className={css.createTaskBtn} type="submit">
                Generate task
              </button>
            </Form>
          </Formik>
        </div>
      </ModalWindow>
    )
  );
};

export default Cards;
