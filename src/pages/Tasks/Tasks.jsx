import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTaskSchema } from "../../Schemas/schemas";
import { generateImages } from "../../redux/operations";
import { selectTable } from "../../redux/selectors";

const Tasks = () => {
  const dispatch = useDispatch();
  const table = useSelector(selectTable);

  const initialValues = {
    task_name: "hi-hi",
    dimension: "1x1",
    template_id: "mwpswxcudtwxb",
    image_layers: ["image1", "image2"],
    text_layers: [""],
    amount: 40,
    gen_type: "cyclic_generation",
  };

  const taskNameId = useId();
  const dimensionId = useId();
  const templateIDId = useId();
  const imagesId = useId();
  const textId = useId();
  const amountId = useId();
  const genTypeId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(generateImages(values));
    actions.resetForm();
  };

  return (
    <div>
      <ul>{table}</ul>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createTaskSchema}
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
            <label htmlFor={templateIDId}>Template ID</label>
            <Field as="select" name="template_id" id={templateIDId}>
              <option value="mwpswxcudtwxb">First ID</option>
              <option value="0xdoscyowl50c">Second ID</option>
            </Field>
            <ErrorMessage name="template_id" as="span" />
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

          <button type="submit">Generate</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Tasks;
