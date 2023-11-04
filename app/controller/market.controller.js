import marketData from "../models/index.js";
const MarketData = marketData.marketData;

export async function PatchMarketData(req, res) {
  const tempData = { ...req.body, date: new Date().toDateString() };

  const market_data = new MarketData(tempData);

  market_data
    .updateOne({ date: tempData.date }, { $set: tempData }, { upsert: true })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
}
