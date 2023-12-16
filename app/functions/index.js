import { winRates } from "./rates.js";
import { addWinningAmount } from "../controller/user.controller.js";

export async function getResult(Biddings, filter, data) {
  try {
    const bids = await Biddings.find(filter);
    bids.forEach(async (bid) => {
      if (data.close && bid.game_type === "close") {
        if (bid.game_name === "singleAnk") {
          if (data.close[0] === bid.digit) {
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "jodi") {
          if (`${data.close[4]}${data.close[0]}` === bid.digit) {
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "singlePatti" || bid.game_name === "doublePatti" || bid.game_name === "triplePatti") {
          if (data.close.slice(0, 3) === bid.digit) {
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "halfSangam") {
          if (data.close === bid.digit) {
            await addWinningAmount({userId: bid.userId, amount: winRates(parseFloat(bid.points), bid.game_name)})
          }
        } else if (bid.game_name === "fullSangam") {
          if (`${data.open}${data.close}` === bid.digit) {
            await addWinningAmount({userId: bid.userId, amount: winRates(parseFloat(bid.points), bid.game_name)})
          }
        }
      } else if (data.open && bid.game_type === "open") {
        if (bid.game_name === "singleAnk") {
          if (data.open[4] === bid.digit) {
            await addWinningAmount({
              userId: bid.userId,
              amount: winRates(parseFloat(bid.points), bid.game_name),
            });
          }
        } else if (bid.game_name === "singlePatti" || bid.game_name === "doublePatti" || bid.game_name === "triplePatti") {
          if (data.open.slice(0, 3) === bid.digit) {
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
