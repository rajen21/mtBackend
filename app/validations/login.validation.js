import yup from "yup";

export const loginSchema = yup.object().shape({
    user_name: yup.string().required(),
    password: yup.string().required(),
});
