import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useId } from "react";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { openSendTaskForm, switchModal } from "../../redux/slice";
import {
  selectCard,
  selectModalWindow,
  selectSendTaskForm,
} from "../../redux/selectors";
import { createTaskSchema } from "../../Schemas/schemas";
import { generateFormats } from "../../redux/operations";
import css from "./Cards.module.css";

const imageArr = [];
const textArr = [];

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

  console.log(image_layers);

  imageArr.push(image_layers);
  textArr.push(text_layers);

  const initialValues = {
    template_id,
    task_name,
    amount,
    dimension,
    gen_type,
    imageArr,
    textArr,
  };

  function closeModal() {
    dispatch(switchModal(false));
  }

  function submitFullTask() {
    dispatch(generateFormats(initialValues));
    dispatch(openSendTaskForm(false));
  }

  return (
    modalWindowCard &&
    sendForm && (
      <ModalWindow>
        <div className={css.sendFormContainer}>
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
                <FieldArray name="image_layers">
                  <Field
                    className={css.field}
                    name="image_layers"
                    id={imagesId}
                  />
                </FieldArray>

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
                <ErrorMessage
                  className={css.errorMsg}
                  name="amount"
                  as="span"
                />
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

              <div className={css.generateTaskBtnContainer}>
                <button className={css.generateTaskBtn} type="submit">
                  Generate task
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </ModalWindow>
    )
  );
};

export default Cards;
