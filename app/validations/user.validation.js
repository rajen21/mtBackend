import yup from "yup";

export const createUserSchema = yup.object().shape({
    user_name: yup.string().required(),
    password: yup.string().min(5).max(50).required(),
    adminId: yup.string(),
    agentId: yup.string(),
    role: yup.string().required(),
    active: yup.boolean().required()
});