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
    taskName: "",
    dimension: "1x1",
    templateID: "mwpswxcudtwxb",
    images: "",
    text: "",
    amount: "",
    genType: "Cyclic",
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
            <Field type="text" name="taskName" id={taskNameId} />
            <ErrorMessage name="taskName" as="span" />
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
            <Field as="select" name="templateID" id={templateIDId}>
              <option value="mwpswxcudtwxb">First ID</option>
              <option value="0xdoscyowl50c">Second ID</option>
            </Field>
            <ErrorMessage name="templateID" as="span" />
          </div>

          <div>
            <label htmlFor={imagesId}>Images</label>
            <Field name="images" id={imagesId} />
            <ErrorMessage name="images" as="span" />
          </div>

          <div>
            <label htmlFor={textId}>Text</label>
            <Field name="text" id={textId} />
            <ErrorMessage name="text" as="span" />
          </div>

          <div>
            <label htmlFor={amountId}>Amount</label>
            <Field name="amount" id={amountId} />
            <ErrorMessage name="amount" as="span" />
          </div>

          <div>
            <label htmlFor={genTypeId}>Gen type</label>
            <Field as="select" name="genType" id={genTypeId}>
              <option value="cyclic_generation">Cyclic</option>
              <option value="random_generation">Random</option>
            </Field>
            <ErrorMessage name="genType" as="span" />
          </div>

          <button type="submit">Generate</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Tasks;
