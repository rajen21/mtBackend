function setTime(h, m, s) {
  return new Date().setHours(h, m, s);
}

export const marketNames = [
  {
    name: "TIME BAZAR",
    openTime: setTime(12, 55, 0),
    closeTime: setTime(13, 55, 0),
  },
  {
    name: "MADHUR DAY",
    openTime: setTime(13, 20, 0),
    closeTime: setTime(14, 20, 0),
  },
  {
    name: "MADHUR NIGHT",
    openTime: setTime(20, 25, 0),
    closeTime: setTime(22, 25, 0),
  },
  {
    name: "MILAN DAY",
    openTime: setTime(14, 55, 0),
    closeTime: setTime(16, 55, 0),
  },
  {
    name: "MILAN NIGHT",
    openTime: setTime(20, 55, 0),
    closeTime: setTime(22, 55, 0),
  },
  {
    name: "SRIDEVI",
    openTime: setTime(11, 25, 0),
    closeTime: setTime(12, 25, 0),
  },
  {
    name: "SRIDEVI NIGHT",
    openTime: setTime(19, 0, 0),
    closeTime: setTime(20, 0, 0),
  },
  {
    name: "RAJDHANI DAY",
    openTime: setTime(14, 55, 0),
    closeTime: setTime(16, 50, 0),
  },
  {
    name: "RAJDHANI NIGHT",
    openTime: setTime(21, 25, 0),
    closeTime: setTime(23, 30, 0),
  },
  {
    name: "SUPREME DAY",
    openTime: setTime(15, 30, 0),
    closeTime: setTime(17, 30, 0),
  },
  {
    name: "SUPREME NIGHT",
    openTime: setTime(20, 40, 0),
    closeTime: setTime(22, 40, 0),
  },
  {
    name: "KALYAN",
    openTime: setTime(15, 50, 0),
    closeTime: setTime(17, 50, 0),
  },
  {
    name: "KALYAN NIGHT",
    openTime: setTime(21, 25, 0),
    closeTime: setTime(23, 30, 0),
  },
  {
    name: "MAIN BAZAR",
    openTime: setTime(21, 25, 0),
    closeTime: setTime(23, 55, 0),
  },
];
