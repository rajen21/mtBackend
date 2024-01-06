import db from "../models/index.js";
import {
  getResult,
  getMarketObj,
  isMarketOpenEnd,
} from "../functions/index.js";
import { marketNames } from "../lib/constants.js";
import { isMarketOpen } from "../functions/index.js";

const MarketData = db.marketData;

export async function PatchMarketData(req, res) {
  const { date, ...rest } = req.body;
  let tempData = getMarketObj(rest);
  const [key] = Object.keys(rest);

  await MarketData.find({ date: date })
    .then(async (existingData) => {
      if (existingData.length) {
        let update = existingData[0][key] || {};
        tempData = getMarketObj({ [key]: { ...update, ...tempData[key] } });

        return await MarketData.updateOne(
          { date: date },
          { $set: { ...tempData, date } },
          { new: true }
        )
          .then(async (data) => {
            const filter = {
              market_name: key,
              game_type: tempData[key].close
                ? "close"
                : tempData[key].open
                ? "open"
                : "",
              date: new Date(tempData[key].date).toDateString(),
            };
            await getResult(filter, tempData[key]);
            return res.send(data);
          })
          .catch((err) => res.status(500).send(err));
      } else {
        const market_data = new MarketData({ ...tempData, date });
        return await market_data
          .save()
          .then(async (data) => {
            const filter = {
              market_name: key,
              game_type: "open",
              date: new Date(tempData[key].date).toDateString(),
            };
            await getResult(filter, tempData[key]);
            return res.send(data);
          })
          .catch((err) => res.status(500).send(err));
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

export async function getMarketData(req, res) {
  await MarketData.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send("Error occured at getMarketData"));
}

export async function getSpecificDateData(req, res) {
  const { date } = req.body;
  await MarketData.findOne(date)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send("Error occured at getSpecificDateMarketData")
    );
}

export async function getMarketTime(req, res) {
  let getTime = new Date();
  if (process.env.TIME_URL) {
    getTime = await fetch(`${process.env.TIME_URL}`, {
      headers: { accept: "application/json" },
    });
    getTime = await getTime.json();
  }
  const filteredMarketData = marketNames.map((name) => {
    return {
      ...name,
      isMarketOpen: isMarketOpen(name.closeTime, new Date(getTime.dateTime)),
      isMarketOpenEnd: isMarketOpenEnd(
        name.openTime,
        new Date(getTime.dateTime)
      ),
    };
  });

  return res.send(filteredMarketData);
}
