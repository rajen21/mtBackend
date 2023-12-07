export default (mongoose) => {
  const schema = mongoose.Schema({
    version: {
      type: String,
    },
    message: {
      type: String,
    },
    link: {
      type: String,
    },
    date: {
      type: String,
      default: Date.now,
    },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const version = mongoose.model("version", schema);
  return version;
};
