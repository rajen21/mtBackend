import db from "../models/index.js";
const MarketData = db.marketData;

export async function PatchMarketData(req, res) {
  const tempData = { ...req.body, date: new Date().toDateString() };

  await MarketData.find({ date: tempData.date }).then((existingData) => {
    if (existingData.length) {
      const update = {
        $set : tempData
      };
      MarketData.updateOne({date: tempData.date}, update, {upsert: true})
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
    } else {
      const market_data = new MarketData(tempData);
      market_data
        .save()
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send(err));
    }
  })
  .catch((err) => {
    res.status(500).send(err)
  })
};

export async function getMarketData (req, res) {
  MarketData.find()
  .then((data) => res.send(data))
  .catch((err) => res.status(500).send(err));
};

export async function getSpecificDateData(req, res) {
  const {filter} = req.body;
  console.log("ffiif", filter, req.body, req.params);
  MarketData.findOne(filter)
  .then((data) => res.send(data))
  .catch((err) => res.status(500).send(err));
};
