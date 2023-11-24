import mongooseUniqueValidator from "mongoose-unique-validator";

export default (mongoose) => {
  const uniqueValidator = mongooseUniqueValidator;
  const schema = mongoose.Schema({
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      required: true,
    },
    active: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Number,
      default: 0,
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
