import * as Yup from "yup";

export const createTaskSchema = Yup.object().shape({
  task_name: Yup.string().trim().required("Please enter name of your task!"),
});

export const generateImagesSchema = Yup.object().shape({
  images: Yup.array()
    .of(Yup.string())
    .min(2, "Too short!")
    .required("Please insert name of your task!"),
  dimension: Yup.string().required("Please choose dimension of your images!"),
  style: Yup.string().required("Please choose style of your template!"),
  manual_prompts: Yup.string().required(),
  gen_per_ref: Yup.number().required("Please insert amount of your creo!"),
  flow: Yup.string().required(),
});

export const generateTaskSchema = Yup.object().shape({
  task_name: Yup.string().trim().required("Please enter name of your task!"),
  dimension: Yup.string()
    .trim()
    .required("Please choose dimension of your images!"),
  template_id: Yup.string().required("Please choose id!"),
  amount: Yup.number().required(),
  gen_type: Yup.string().trim().required(),
  image_layers: Yup.array().of(Yup.string()).required(),
  text_layers: Yup.array().of(Yup.string()).required(),
});
