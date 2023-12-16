export default (mongoose) => {
  const schema = mongoose.Schema({
    timeBazar: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    kalyan: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    kalyanNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    milanDay: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    milanNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    rajdhaniDay: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    rajdhaniNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    mainBazar: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    sridevi: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    srideviNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    madhurDay: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    madhurNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    supremeDay: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    supremeNight: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
      final: {
        type: String,
      },
      date: {
        type: String,
      },
    },
    date: {
      type: String,
    },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const market_data = mongoose.model("market_data", schema);
  return market_data;
};
