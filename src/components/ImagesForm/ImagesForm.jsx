import { useId } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { switchModal } from "../../redux/slice";
import { generateImages } from "../../redux/operations";
import { generateImagesSchema } from "../../Schemas/schemas";
import css from "./ImagesForm.module.css";

const ImagesForm = ({ values }) => {
  const dispatch = useDispatch();

  const taskNameId = useId();
  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  function submitForm(values, actions) {
    dispatch(generateImages(values));
    dispatch(switchModal(false));
    actions.resetForm();
  }

  return (
    <Formik
      onSubmit={submitForm}
      initialValues={values}
      validationSchema={generateImagesSchema}
    >
      <Form className={css.taskForm}>
        <div className={css.imagesFormItem}>
          <label htmlFor={taskNameId}>Task name</label>
          <Field
            className={css.field}
            type="text"
            name="task_name"
            id={taskNameId}
          />
          <ErrorMessage name="task_name" as="span" />
        </div>

        <div className={css.imagesFormItem}>
          <label htmlFor={dimensionId}>Dimension</label>
          <Field
            className={css.field}
            as="select"
            name="dimension"
            id={dimensionId}
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
          <Field className={css.field} name="image_layers" id={imagesId} />
          <ErrorMessage name="image_layers" as="span" />
        </div>

        <div className={css.imagesFormItem}>
          <label htmlFor={textId}>Text</label>
          <Field className={css.field} name="text_layers" id={textId} />
          <ErrorMessage name="text_layers" as="span" />
        </div>

        <div className={css.imagesFormItem}>
          <label htmlFor={amountId}>Amount</label>
          <Field className={css.field} name="amount" id={amountId} />
          <ErrorMessage name="amount" as="span" />
        </div>

        <div className={css.imagesFormItem}>
          <label htmlFor={genTypeId}>Gen type</label>
          <Field
            className={css.field}
            as="select"
            name="gen_type"
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
  );
};

export default ImagesForm;
