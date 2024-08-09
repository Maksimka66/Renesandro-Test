import { useId, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { switchModal } from "../../redux/slice";
import { generateImages } from "../../redux/operations";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectCard } from "../../redux/selectors";
import css from "./ImagesForm.module.css";

const ImagesForm = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  const card = useSelector(selectCard);

  const initialValues = {
    id: card.template_id,
    flow: "",
    gen_per_ref: 0,
    dimension: "",
    style: "",
    manual_prompts: "",
    images: [],
  };

  function submitForm(values, actions) {
    values.images = images;
    values.flow = card.task_name;
    values.manual_prompts = text;
    values.gen_per_ref = amount;
    values.dimension = card.dimension;

    dispatch(switchModal(false));
    dispatch(generateImages(values));
    actions.resetForm();
  }

  function closeModal() {
    dispatch(switchModal(false));
  }

  return (
    <ModalWindow>
      <div className={css.imagesFormContainer}>
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

        <Formik onSubmit={submitForm} initialValues={initialValues}>
          <Form className={css.taskForm}>
            <div className={css.imagesFormItem}>
              <label htmlFor={dimensionId}>Dimension</label>
              <Field
                className={css.field}
                as="select"
                name="dimension"
                id={dimensionId}
                required
              >
                <option className={css.optionValue} value="1x1">
                  1x1
                </option>
                <option className={css.optionValue} value="9x16">
                  9x16
                </option>
                <option className={css.optionValue} value="16x9">
                  16x9
                </option>
              </Field>
              <ErrorMessage name="dimension" as="span" />
            </div>

            <div className={css.imagesFormItem}>
              <label htmlFor={imagesId}>Images</label>
              <Field
                className={css.field}
                name="image_layers"
                id={imagesId}
                required
                onChange={(e) => setImages([e.target.value])}
              />
              <ErrorMessage name="image_layers" as="span" />
            </div>

            <div className={css.imagesFormItem}>
              <label htmlFor={textId}>Text</label>
              <Field
                className={css.field}
                name="text_layers"
                id={textId}
                required
                onChange={(e) => setText(e.target.value)}
              />
              <ErrorMessage name="text_layers" as="span" />
            </div>

            <div className={css.imagesFormItem}>
              <label htmlFor={amountId}>Amount</label>
              <Field
                className={css.field}
                name="amount"
                id={amountId}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
              <ErrorMessage name="amount" as="span" />
            </div>

            <div className={css.imagesFormItem}>
              <label htmlFor={genTypeId}>Gen type</label>
              <Field
                className={css.field}
                as="select"
                name="gen_type"
                required
                id={genTypeId}
              >
                <option className={css.optionValue} value="cyclic_generation">
                  Cyclic
                </option>
                <option className={css.optionValue} value="random_generation">
                  Random
                </option>
              </Field>
              <ErrorMessage name="gen_type" as="span" />
            </div>

            <button className={css.generateImagesBtn} type="submit">
              Get images
            </button>
          </Form>
        </Formik>
      </div>
    </ModalWindow>
  );
};

export default ImagesForm;
