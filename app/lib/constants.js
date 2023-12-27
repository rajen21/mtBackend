function setTime(h, m, s) {
  return new Date().setHours(h, m, s);
}

export const marketNames = {
  timeBazar: { openTime: setTime(12, 55, 0), closeTime: setTime(13, 55, 0) },
  madhurDay: { openTime: setTime(13, 20, 0), closeTime: setTime(14, 20, 0) },
  madhurNight: { openTime: setTime(20, 25, 0), closeTime: setTime(22, 25, 0) },
  milanDay: { openTime: setTime(14, 55, 0), closeTime: setTime(16, 55, 0) },
  milanNight: { openTime: setTime(20, 55, 0), closeTime: setTime(22, 55, 0) },
  sridevi: { openTime: setTime(11, 25, 0), closeTime: setTime(12, 25, 0) },
  srideviNight: { openTime: setTime(19, 0, 0), closeTime: setTime(20, 0, 0) },
  rajdhaniDay: { openTime: setTime(14, 55, 0), closeTime: setTime(16, 50, 0) },
  rajdhaniNight: { openTime: setTime(21, 25, 0), closeTime: setTime(23, 30, 0) },
  supremeDay: { openTime: setTime(15, 30, 0), closeTime: setTime(17, 30, 0) },
  supremeNight: { openTime: setTime(20, 40, 0), closeTime: setTime(22, 40, 0) },
  kalyan: { openTime: setTime(15, 50, 0), closeTime: setTime(17, 50, 0) },
  kalyanNight: { openTime: setTime(21, 25, 0), closeTime: setTime(23, 30, 0) },
  mainBazar: { openTime: setTime(21, 25, 0), closeTime: setTime(23, 55, 0) },
};
