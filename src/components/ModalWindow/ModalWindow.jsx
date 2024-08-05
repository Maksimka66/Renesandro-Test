import { useDispatch, useSelector } from "react-redux";
import { selectModalWindow } from "../../redux/selectors";
import { useCallback } from "react";
import { switchModal } from "../../redux/slice";
import css from "./ModalWindow.module.css";

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();

  const modal = useSelector(selectModalWindow);

  const closeModal = useCallback(() => {
    dispatch(switchModal(false));
  }, [dispatch]);

  return (
    modal && (
      <div className={css.modalOverlay} onClick={closeModal}>
        <div className={css.modalWindow} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
};

export default ModalWindow;
