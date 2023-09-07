export const validUser = (schema) => async (req, res, next) => {
    try {
        const { body } = req;
        await schema.validate(body);
        next();
    } catch(err) {
        return res.json(err);
    }
}