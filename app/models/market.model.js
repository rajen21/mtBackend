export default (mongoose) => {
  const schema = mongoose.Schema({
    time: {
        type: String,
    },
    kalyan: {
        type: String
    },
    kalyanMorning: {
        type: String
    },
    kalyanNight: {
        type: String
    },
    milanDay: {
        type: String
    },
    milanNight: {
        type: String
    },
    rajdhaniDay: {
        type: String
    },
    rajdhaniNight: {
        type: String
    },
    mainBazar: {
        type: String
    },
    milanBazarMorning: {
        type: String
    },
    milanBazarDay: {
        type: String
    },
    milanBazarNight: {
        type: String
    },
    date: {
        type: String,
        unique: true
    }
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const market_data = mongoose.model("market_data", schema);
  return market_data;
};
