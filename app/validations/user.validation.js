import yup from "yup";

export const createUserSchema = yup.object().shape({
    phone: yup.string().required(),
    password: yup.string().min(5).max(50).required(),
    adminId: yup.string(),
    agentId: yup.string(),
    role: yup.string().required(),
    active: yup.boolean()
});