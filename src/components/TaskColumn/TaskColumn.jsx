import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { generateImages } from "../../redux/operations";
import { generateImagesSchema } from "../../Schemas/schemas";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectModalWindow } from "../../redux/selectors";
import { removeTask, switchModal } from "../../redux/slice";
import ImagesForm from "../ImagesForm/ImagesForm";
import css from "./TaskColumn.module.css";

const TaskColumn = ({
  item: {
    template_id,
    task_name,
    dimension,
    image_layers,
    text_layers,
    amount,
    gen_type,
  },
}) => {
  const dispatch = useDispatch();
  const setModal = useSelector(selectModalWindow);

  const initialValues = {
    images: image_layers,
    dimension,
    style: task_name,
    manual_prompts: text_layers,
    gen_per_ref: gen_type,
    flow: amount,
  };

  function openModal() {
    dispatch(switchModal(true));
  }

  function closeModal() {
    dispatch(switchModal(false));
  }

  function submitForm(values, actions) {
    dispatch(generateImages(values));
    dispatch(switchModal(false));
    actions.resetForm();
  }

  function deleteTask() {
    dispatch(removeTask(template_id));
  }

  return (
    <div>
      <div>
        <div>
          <h2>Task name</h2>
          <NavLink to={template_id}>{task_name}</NavLink>
        </div>
        <div>
          <h2>Dimension</h2>
          <p>{dimension}</p>
        </div>
        <div>
          <h2>Template ID</h2>
          <p>{template_id}</p>
        </div>
        <div>
          <h2>Images</h2>
          <p>{image_layers}</p>
        </div>
        <div>
          <h2>Text</h2>
          <p>{text_layers}</p>
        </div>
        <div>
          <h2>Amount</h2>
          <p>{amount}</p>
        </div>
        <div>
          <h2>Gen type</h2>
          <p>{gen_type}</p>
        </div>
        <div>
          <h2>Gen tasks</h2>
          <button type="button" onClick={openModal}>
            Generate
          </button>
        </div>
        <div>
          <h2>Result ads</h2>
          <a
            href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task_name}_${dimension}/format_validation`}
          >
            Folder
          </a>
        </div>
      </div>
      <button type="button" onClick={deleteTask}>
        Delete task
      </button>
      {setModal && (
        <ModalWindow>
          <ImagesForm
            submitForm={submitForm}
            values={initialValues}
            schema={generateImagesSchema}
          />
          <button type="button" onClick={closeModal}>
            Close modal
          </button>
        </ModalWindow>
      )}
    </div>
  );
};

export default TaskColumn;
