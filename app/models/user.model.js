import mongooseUniqueValidator from "mongoose-unique-validator";

export default (mongoose) => {
  const uniqueValidator = mongooseUniqueValidator;
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 13,
      unique: true,
      validate: /^(?:(\+?91)|0)?([6-9]\d{9})$/,
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      required: true,
    },
    active: {
      type: Boolean,
      // default: false,
    },
    balance: {
      type: Number,
      default: 0,
    },
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
