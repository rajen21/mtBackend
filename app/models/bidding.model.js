export default (mongoose) => {
  const schema = mongoose.Schema({
    market_name: {
      type: String,
      required: true,
    },
    game_name: {
      type: String,
      required: true,
    },
    digit: {
      type: String,
      required: true,
    },
    points: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const bid = mongoose.model("bidding", schema);
  return bid;
};