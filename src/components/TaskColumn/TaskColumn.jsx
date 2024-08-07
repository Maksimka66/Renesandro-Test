import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectGenerateImagesForm,
  selectImages,
  selectModalWindow,
} from "../../redux/selectors";
import {
  getTask,
  openGenerateImagesForm,
  openSendTaskForm,
  removeTask,
  switchModal,
} from "../../redux/slice";
import ImagesForm from "../ImagesForm/ImagesForm";
import css from "./TaskColumn.module.css";
import { nanoid } from "nanoid";

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
  const stateGenerateImagesForm = useSelector(selectGenerateImagesForm);
  const images = useSelector(selectImages);

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
    dispatch(openGenerateImagesForm(true));
    dispatch(getTask(template_id));
  }

  function getTaskId() {
    dispatch(switchModal(true));
    dispatch(openSendTaskForm(true));
    dispatch(getTask(template_id));
  }

  function deleteTask() {
    dispatch(removeTask(template_id));
  }

  console.log(images);

  return (
    <div className={css.taskColumn}>
      <div className={css.itemContainer}>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Task name</h2>
          <NavLink
            to={template_id}
            className={css.headerText}
            onClick={getTaskId}
          >
            {task_name}
          </NavLink>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Dimension</h2>
          <p className={css.itemDimension}>{dimension}</p>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Template ID</h2>
          <p className={css.itemTemplate}>{template_id}</p>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Images</h2>
          {images.images !== undefined && (
            <ul className={css.itemContent}>
              {images.images.map((item) => (
                <li key={nanoid()}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Text</h2>
          <p className={css.itemContent}>{text_layers}</p>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Amount</h2>
          <p className={css.itemContent}>{amount}</p>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Gen type</h2>
          <p className={css.itemGenType}>{gen_type}</p>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Gen tasks</h2>
          <button
            className={css.generateImgBtn}
            type="button"
            onClick={openModal}
          >
            Generate images
          </button>
        </div>
        <div className={css.item}>
          <h2 className={css.itemHeader}>Result ads</h2>
          <a
            href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task_name}_${dimension}/format_validation`}
            className={css.resultLink}
          >
            Folder
          </a>
        </div>
        <div className={css.item}>
          <h2>Remove task</h2>
          <button
            className={css.deleteTaskBtn}
            type="button"
            onClick={deleteTask}
          >
            Delete
          </button>
        </div>
      </div>

      {setModal && stateGenerateImagesForm && (
        <ImagesForm values={initialValues} />
      )}
    </div>
  );
};

export default TaskColumn;
