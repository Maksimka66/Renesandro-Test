import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { switchModal } from "../../redux/slice";
import {
  selectCard,
  selectModalWindow,
  selectSendTaskForm,
} from "../../redux/selectors";
import css from "./Cards.module.css";
import { useId } from "react";

const Cards = () => {
  const dispatch = useDispatch();
  const currentCard = useSelector(selectCard);
  const modalWindowCard = useSelector(selectModalWindow);
  const sendForm = useSelector(selectSendTaskForm);

  console.log(currentCard);

  const taskNameId = useId();
  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  const initialValues = { task_name: "" };

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
          <Formik initialValues={initialValues} onSubmit={submitFullTask}>
            <Form>
              <div>
                <label htmlFor={taskNameId}>Task name</label>
                <Field type="text" name="task_name" id={taskNameId} />
                <ErrorMessage name="task_name" as="span" />
              </div>
            </Form>
          </Formik>
        </div>
      </ModalWindow>
    )
  );
};

export default Cards;
