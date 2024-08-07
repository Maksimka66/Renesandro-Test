import { useId } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";

const ImagesForm = ({ submitForm, values, schema }) => {
  const taskNameId = useId();
  const dimensionId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  return (
    <Formik
      onSubmit={submitForm}
      initialValues={values}
      validationSchema={schema}
    >
      <Form>
        <div>
          <label htmlFor={taskNameId}>Task name</label>
          <Field type="text" name="task_name" id={taskNameId} />
          <ErrorMessage name="task_name" as="span" />
        </div>

        <div>
          <label htmlFor={dimensionId}>Dimension</label>
          <Field as="select" name="dimension" id={dimensionId}>
            <option value="1x1">1x1</option>
            <option value="9x16">9x16</option>
            <option value="16x9">16x9</option>
          </Field>
          <ErrorMessage name="dimension" as="span" />
        </div>

        <div>
          <label htmlFor={imagesId}>Images</label>
          <Field name="image_layers" id={imagesId} />
          <ErrorMessage name="image_layers" as="span" />
        </div>

        <div>
          <label htmlFor={textId}>Text</label>
          <Field name="text_layers" id={textId} />
          <ErrorMessage name="text_layers" as="span" />
        </div>

        <div>
          <label htmlFor={amountId}>Amount</label>
          <Field name="amount" id={amountId} />
          <ErrorMessage name="amount" as="span" />
        </div>

        <div>
          <label htmlFor={genTypeId}>Gen type</label>
          <Field as="select" name="gen_type" id={genTypeId}>
            <option value="cyclic_generation">Cyclic</option>
            <option value="random_generation">Random</option>
          </Field>
          <ErrorMessage name="gen_type" as="span" />
        </div>

        <button type="submit">Get images</button>
      </Form>
    </Formik>
  );
};

export default ImagesForm;
