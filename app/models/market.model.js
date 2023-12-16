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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
        type: Date,
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
