import yup from "yup";

export const loginSchema = yup.object().shape({
    phone: yup.string().required(),
    password: yup.string().required(),
});
