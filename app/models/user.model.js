import mongooseUniqueValidator from "mongoose-unique-validator";

export default (mongoose) => {
    const uniqueValidator = mongooseUniqueValidator;
    const schema = mongoose.Schema({
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
        }
    });
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.plugin(uniqueValidator);
    const User = mongoose.model("users", schema);
    return User;
};
