import * as Yup from "yup";

export const createTaskSchema = Yup.object().shape({
  taskName: Yup.string()
    .trim()
    .min(2, "Too short!")
    .required("Please insert name of your task!"),
  dimension: Yup.string()
    .trim()
    .required("Please choose dimension of your images!"),
  templateID: Yup.string()
    .trim()
    .required("Please choose id of your template!"),
  images: Yup.string(),
  text: Yup.string(),
  amount: Yup.number().required("Please insert amount of your creo!"),
  genType: Yup.string().trim().required(),
});

export const createCreatives = Yup.object().shape({
  images: Yup.string(),
  dimension: Yup.string()
    .trim()
    .required("Please choose dimension of your images!"),
  style: Yup.string().required("Please choose your style!"),
  flow: Yup.string().required(),
  gen_per_ref: Yup.number().required(),
  manual_prompts: Yup.string(),
});
