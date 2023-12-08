import db from "../models/index.js";

const Bidding = db.bidding;

export async function postBidding(req, res) {
  try {
    const { market_name, game_name, digit, points, userId } = req.body;
    if (!market_name) {
      res.status(500).send("Please enter market name");
      return;
    }
    if (!game_name) {
      res.status(500).send("Please enter game name");
      return;
    }
    if (!digit) {
      res.status(500).send("Please enter digit");
      return;
    }
    if (!points) {
      res.status(500).send("Please enter points");
      return;
    }
    if (!userId) {
      res.status(500).send("Please enter user id");
      return;
    }

    const bid = new Bidding({ market_name, game_name, digit, points, userId });

    const response = await bid.save();
    res.send(response);
  } catch (err) {
    console.error("Error occured while saving bid.");
  }
}

export async function getBidding(req, res) {
  try {
    const filter = req.params;
    const response = await Bidding.find(filter);
    res.send(response);
  } catch (err) {
    res.status(500).send("Error occured while getting bids");
  }
}
