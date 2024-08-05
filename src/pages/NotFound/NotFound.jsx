import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.notFound}>
      <b>Oops! No pages with such request!</b>
      <Link to="/">Back to tasks page</Link>
    </div>
  );
};

export default NotFound;
