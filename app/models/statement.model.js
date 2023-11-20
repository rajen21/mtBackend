export default (mongoose) => {
  const schema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["addition", "withdrawal"], // Type of transaction
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const statement = mongoose.model("statement", schema);
  return statement;
};
