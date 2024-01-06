import db from "../models/index.js";
import { winRates } from "./rates.js";
import { addWinningAmount } from "../controller/user.controller.js";

const Biddings = db.bidding;

export async function getResult(filter, data) {
  try {
    console.log("filter ::", filter, data);
    const bids = await Biddings.find(filter);
    console.log("chekk bids total :: ", bids.length);
    bids.forEach(async (bid) => {
      if (data.close && bid.game_type === "close") {
        if (bid.game_name === "singleAnk") {
          if (data.close[0] === bid.digit) {
            console.log("close winner single ank", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "jodi") {
          if (`${data.open[3]}${data.close[0]}` === bid.digit) {
            console.log("close winner jodi", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (
          bid.game_name === "singlePannel" ||
          bid.game_name === "doublePannel" ||
          bid.game_name === "triplePannel"
        ) {
          if (data.close.slice(0, 3) === bid.digit) {
            console.log("close winner ", bid.game_name, " ", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "halfSangam") {
          if (data.close === bid.digit) {
            console.log("close winner half sangam :: ", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "fullSangam") {
          if (`${data.open}${data.close}` === bid.digit) {
            console.log("close winner full sangam ::", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        }
      } else if (data.open && bid.game_type === "open") {
        if (bid.game_name === "singleAnk") {
          if (data.open[3] === bid.digit) {
            console.log("open winner sinlge ank :: ", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (
          bid.game_name === "singlePannel" ||
          bid.game_name === "doublePannel" ||
          bid.game_name === "triplePannel"
        ) {
          if (data.open.slice(0, 3) === bid.digit) {
            console.log("open ", bid.game_name, " ::: ", bid.userId);
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        }
      }
    });
    return;
  } catch (err) {
    console.error("err at get biddings", err);
    return;
  }
}

export function getMarketObj(value) {
  let keys = Object.keys(value);
  const marketObj = {};

  keys.forEach((key) => {
    marketObj[key] = { ...marketObj[key], ...value[key] };
    if (marketObj[key]?.open?.length === 3) {
      const result =
        marketObj[key].open
          .split("")
          .reduce((a, b) => parseInt(a) + parseInt(b), 0) % 10;
      marketObj[key].open = `${marketObj[key].open}${result}`;
    }
    if (marketObj[key]?.close?.length === 3) {
      const result =
        marketObj[key].close
          .split("")
          .reduce((a, b) => parseInt(a) + parseInt(b), 0) % 10;
      marketObj[key].close = `${result}${marketObj[key].close}`;
    }
    if (
      marketObj[key]?.open?.length === 4 &&
      marketObj[key]?.close?.length === 4
    ) {
      marketObj[key].final = `${marketObj[key].open}${marketObj[key].close}`;
    }
  });
  return marketObj;
}

export function isMarketOpen(closeTime, now) {
  return now.getTime() < closeTime;
}

export function isMarketOpenEnd(openTime, now) {
  return now.getTime() < openTime;
}
