import yup from "yup";

export const createUserSchema = yup.object().shape({
    user_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(50).required(),
    role: yup.string().required(),
    active: yup.boolean().required()
});