const db = require("../server/db");
const { User, Hour, NormalizeScore } = require("../server/db/models");
// const {
//   dateCreate,
//   emotions,
//   sentimentSpectrum,
//   snapIntDefault,
//   dbIntDefault
// } = require("../src/utils/utilities");
const share = require("../src/share");
share.utilShare();

const userSeed = [
  {
    name: "Peter Parker",
    email: "peter@a.com",
    password: "123"
  },
  {
    name: "Steven Strange",
    email: "steve@a.com",
    password: "123"
  }
];

const trueScoreGen = count => {
  const trueRes = [];
  while (count) {
    const obj = {
        userId: 1,
        trueScore: 0,
        count: dbIntDefault / snapIntDefault,
        timeStamp: dateCreate(),
        screenScore: Math.random() * 0.5 + 0.5,
        screenTime: 0
      },
      numArr = new Array(7).fill(null).map(() => Math.random()),
      totalRand = numArr.reduce((acm, val) => (acm += val), 0);
    for (let idx in emotions) {
      const emotion = emotions[idx],
        emotScore = numArr[idx] / totalRand;
      obj[emotion] = emotScore;
      obj.trueScore += emotScore * sentimentSpectrum[emotion].spectrumScore;
    }
    obj.count -= Math.round(Math.random() * obj.count * 0.3);
    obj.trueRes.push(obj);
    count--;
  }
  return trueRes;
};

const normalScoreGen = count => {
  const normRes = [];
  while (count) {
    const obj = { userId: 1 };
    trueRes.push(obj);
    count--;
  }
  return normRes;
};

const hourSeed = [
  {
    userId: 1,
    trueScore: 7,
    happy: 0.6,
    surprised: 0.05,
    neutral: 0.03,
    disgusted: 0.2,
    fearful: 0.0,
    angry: 0.05,
    sad: 0.07,
    timeStamp: new Date("11/26/19"),
    count: 15,
    screenScore: 0.85,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.28,
    surprised: 0.2,
    neutral: 0.18,
    disgusted: 0.1,
    fearful: 0.12,
    angry: 0.07,
    sad: 0.05,
    timeStamp: new Date("11/27/19"),
    count: 11,
    screenScore: 0.99,
    screenTime: 13
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.55,
    surprised: 0.02,
    neutral: 0.16,
    disgusted: 0.06,
    fearful: 0.1,
    angry: 0.1,
    sad: 0.01,
    timeStamp: new Date("11/28/19"),
    count: 14,
    screenScore: 0.88,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 3,
    happy: 0.09,
    surprised: 0.0,
    neutral: 0.15,
    disgusted: 0.12,
    fearful: 0.29,
    angry: 0.24,
    sad: 0.11,
    timeStamp: new Date("11/29/19"),
    count: 12,
    screenScore: 0.98,
    screenTime: 14
  },
  {
    userId: 1,
    trueScore: 4.5,
    happy: 0.05,
    surprised: 0.02,
    neutral: 0.12,
    disgusted: 0.27,
    fearful: 0.22,
    angry: 0.28,
    sad: 0.04,
    timeStamp: new Date("11/30/19"),
    count: 13,
    screenScore: 0.77,
    screenTime: 11
  },
  {
    userId: 1,
    trueScore: 3,
    happy: 0.09,
    surprised: 0.14,
    neutral: 0.19,
    disgusted: 0.04,
    fearful: 0.15,
    angry: 0.31,
    sad: 0.08,
    timeStamp: new Date("12/1/19"),
    count: 14,
    screenScore: 0.78,
    screenTime: 14
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.24,
    surprised: 0.15,
    neutral: 0.02,
    disgusted: 0.24,
    fearful: 0.21,
    angry: 0.02,
    sad: 0.12,
    timeStamp: new Date("12/2/19"),
    count: 15,
    screenScore: 0.95,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 2,
    happy: 0.03,
    surprised: 0.1,
    neutral: 0.17,
    disgusted: 0.2,
    fearful: 0.02,
    angry: 0.17,
    sad: 0.31,
    timeStamp: new Date("12/3/19"),
    count: 15,
    screenScore: 0.78,
    screenTime: 10
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.0,
    surprised: 0.23,
    neutral: 0.03,
    disgusted: 0.23,
    fearful: 0.21,
    angry: 0.02,
    sad: 0.28,
    timeStamp: new Date("12/4/19"),
    count: 15,
    screenScore: 0.98,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.43,
    surprised: 0.14,
    neutral: 0.1,
    disgusted: 0.09,
    fearful: 0.06,
    angry: 0.17,
    sad: 0.01,
    timeStamp: new Date("12/5/19"),
    count: 15,
    screenScore: 0.78,
    screenTime: 13
  },
  {
    userId: 1,
    trueScore: 5.4041,
    happy: 0.00134,
    surprised: 0.20372,
    neutral: 0.7911,
    disgusted: 0.00208,
    fearful: 0.00057,
    angry: 0.00068,
    sad: 0.0005,
    timeStamp: new Date("12/6/19"),
    count: 11,
    screenScore: 0.941777809694982,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 5.00427,
    happy: 0.0003,
    surprised: 0.00442,
    neutral: 0.99436,
    disgusted: 0,
    fearful: 0.0005,
    angry: 0.00108,
    sad: 0.0009,
    timeStamp: new Date("12/7/19"),
    count: 14,
    screenScore: 0.9669798887559723,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 5.00118,
    happy: 0,
    surprised: 0.00065,
    neutral: 0.9993,
    disgusted: 0,
    fearful: 0,
    angry: 0,
    sad: 0.00052,
    timeStamp: new Date("12/8/19"),
    count: 11,
    screenScore: 0.8747920140065567,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 5.00139,
    happy: 0,
    surprised: 0.00077,
    neutral: 0.99919,
    disgusted: 0,
    fearful: 0,
    angry: 0,
    sad: 0.00035,
    timeStamp: new Date("12/9/19"),
    count: 12,
    screenScore: 0.8780593754940202,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 5.00032,
    happy: 0.00051,
    surprised: 0.0002,
    neutral: 0.99984,
    disgusted: 0,
    fearful: 0,
    angry: 0,
    sad: 0,
    timeStamp: new Date("12/10/19"),
    count: 13,
    screenScore: 0.9674058123854092,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 4.54651,
    happy: 0.00023,
    surprised: 0.00363,
    neutral: 0.8806,
    disgusted: 0.00055,
    fearful: 0.00015,
    angry: 0.00025,
    sad: 0.11541,
    timeStamp: new Date("12/11/19"),
    count: 14,
    screenScore: 0.7898451222422401,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 4.75207,
    happy: 0.00055,
    surprised: 0.00096,
    neutral: 0.93646,
    disgusted: 0.00015,
    fearful: 0,
    angry: 0.00035,
    sad: 0.06249,
    timeStamp: new Date("12/12/19"),
    count: 15,
    screenScore: 0.9644719538280966,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 5.00042,
    happy: 0,
    surprised: 0.00028,
    neutral: 0.99969,
    disgusted: 0,
    fearful: 0,
    angry: 0.015,
    sad: 0.0025,
    timeStamp: new Date("12/13/19"),
    count: 11,
    screenScore: 0.9171868358335257,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 5.00985,
    happy: 0.00045,
    surprised: 0.00517,
    neutral: 0.99462,
    disgusted: 0,
    fearful: 0.00014,
    angry: 0.00052,
    sad: 0.00014,
    timeStamp: new Date("12/14/19"),
    count: 14,
    screenScore: 0.8952140224211634,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 5.00229,
    happy: 0.025,
    surprised: 0.00113,
    neutral: 0.9988,
    disgusted: 0.01,
    fearful: 0.01,
    angry: 0.1,
    sad: 0.3,
    timeStamp: new Date("12/15/19"),
    count: 12,
    screenScore: 0.9625792051525887,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 5.06273,
    happy: 0,
    surprised: 0.03174,
    neutral: 0.96,
    disgusted: 0,
    fearful: 0,
    angry: 0.11,
    sad: 0.02,
    timeStamp: new Date("12/16/19"),
    count: 14,
    screenScore: 0.8068972567606721,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 5.00206,
    happy: 0.00134,
    surprised: 0.00101,
    neutral: 0.99892,
    disgusted: 0.00057,
    fearful: 0.00057,
    angry: 0.00015,
    sad: 0.00025,
    timeStamp: new Date("12/17/19"),
    count: 12,
    screenScore: 0.8923296099688285,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 4.93075,
    happy: 0.00087,
    surprised: 0.0157,
    neutral: 0.95703,
    disgusted: 0.00057,
    fearful: 0,
    angry: 0.000179,
    sad: 0.02574,
    timeStamp: new Date("12/18/19"),
    count: 15,
    screenScore: 0.7096647762091651,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 2.32565,
    happy: 0.00023,
    surprised: 0.00018,
    neutral: 0.33055,
    disgusted: 0.00016,
    fearful: 0,
    angry: 0.001515,
    sad: 0.66887,
    timeStamp: new Date("12/19/19"),
    count: 14,
    screenScore: 0.9246126593884891,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 3.94906,
    happy: 0.00052,
    surprised: 0.00073,
    neutral: 0.7361,
    disgusted: 0.0065,
    fearful: 0,
    angry: 0,
    sad: 0.26309,
    timeStamp: new Date("12/20/19"),
    count: 13,
    screenScore: 0.8363629694580724,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 7.63104,
    happy: 0.00017,
    surprised: 0.3057,
    neutral: 0.052555,
    disgusted: 0.29311,
    fearful: 0.00055,
    angry: 0.03155,
    sad: 0.31702,
    timeStamp: new Date("12/21/19"),
    count: 15,
    screenScore: 0.9850796801504087,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 6.91877,
    happy: 0.00025,
    surprised: 0.02852,
    neutral: 0.4145,
    disgusted: 0.04456,
    fearful: 0.00016,
    angry: 0.19175,
    sad: 0.32048,
    timeStamp: new Date("12/22/19"),
    count: 15,
    screenScore: 0.8738671902860103,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.16564,
    happy: 0,
    surprised: 0.00034,
    neutral: 0.04027,
    disgusted: 0.00111,
    fearful: 0.00016,
    angry: 0.03836,
    sad: 0.91977,
    timeStamp: new Date("12/23/19"),
    count: 15,
    screenScore: 0.9661108438788758,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.96988,
    happy: 0,
    surprised: 0.00044,
    neutral: 0.24069,
    disgusted: 0.00134,
    fearful: 0.00086,
    angry: 0.08599,
    sad: 0.67068,
    timeStamp: new Date("12/24/19"),
    count: 15,
    screenScore: 0.9645120712920843,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 8.61921,
    happy: 0.00175,
    surprised: 0.00423,
    neutral: 0.64439,
    disgusted: 0.00026,
    fearful: 0,
    angry: 0.00037,
    sad: 0.34899,
    timeStamp: new Date("12/25/19"),
    count: 15,
    screenScore: 0.7236837110376336,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.28086,
    happy: 0.00067,
    surprised: 0.00109,
    neutral: 0.56118,
    disgusted: 0.01175,
    fearful: 0.00055,
    angry: 0.09659,
    sad: 0.32867,
    timeStamp: new Date("12/26/19"),
    count: 15,
    screenScore: 0.9064725208331947,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 6.0897,
    happy: 0.00094,
    surprised: 0.00416,
    neutral: 0.68957,
    disgusted: 0.1483,
    fearful: 0.00071,
    angry: 0.01953,
    sad: 0.13679,
    timeStamp: new Date("12/27/19"),
    count: 15,
    screenScore: 0.9820138520797688,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 6.6559,
    happy: 0.00022,
    surprised: 0.00167,
    neutral: 0.64051,
    disgusted: 0.04083,
    fearful: 0.00011,
    angry: 0.06428,
    sad: 0.25238,
    timeStamp: new Date("12/28/19"),
    count: 14,
    screenScore: 0.9850062175352103,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 7.32567,
    happy: 0.00015,
    surprised: 0.00053,
    neutral: 0.83044,
    disgusted: 0.0003,
    fearful: 0.00045,
    angry: 0.01151,
    sad: 0.15716,
    timeStamp: new Date("12/29/19"),
    count: 11,
    screenScore: 0.9866736422730208,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 6.97634,
    happy: 0,
    surprised: 0.00016,
    neutral: 0.99384,
    disgusted: 0,
    fearful: 0,
    angry: 0.00166,
    sad: 0.00433,
    timeStamp: new Date("12/30/19"),
    count: 15,
    screenScore: 0.9764896949206125,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 7.9021,
    happy: 0.00055,
    surprised: 0.00043,
    neutral: 0.97468,
    disgusted: 0.00017,
    fearful: 0,
    angry: 0.00094,
    sad: 0.01527,
    timeStamp: new Date("12/31/19"),
    count: 11,
    screenScore: 0.988415422869215,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.06885,
    happy: 0.001,
    surprised: 0.03534,
    neutral: 0.962,
    disgusted: 0.0002,
    fearful: 0,
    angry: 0.0012,
    sad: 0.00039,
    timeStamp: new Date("1/1/20"),
    count: 12,
    screenScore: 0.8382040130531873,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.02179,
    happy: 0,
    surprised: 0.00093,
    neutral: 0.00402,
    disgusted: 0,
    fearful: 0,
    angry: 0.99502,
    sad: 0,
    timeStamp: new Date("1/2/20"),
    count: 14,
    screenScore: 0.9217043852397858,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.77459,
    happy: 0.00016,
    surprised: 0.10305,
    neutral: 0.03838,
    disgusted: 0.00068,
    fearful: 0,
    angry: 0.85749,
    sad: 0.00025,
    timeStamp: new Date("1/3/20"),
    count: 11,
    screenScore: 0.8036169963645663,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.95833,
    happy: 0.00023,
    surprised: 0.02423,
    neutral: 0.2955,
    disgusted: 0.31439,
    fearful: 0,
    angry: 0.27664,
    sad: 0.08897,
    timeStamp: new Date("1/4/20"),
    count: 12,
    screenScore: 0.5268399481893639,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 8.77,
    happy: 0.00028,
    surprised: 0.11262,
    neutral: 0.48061,
    disgusted: 0.08,
    fearful: 0.00013,
    angry: 0.02475,
    sad: 0.28986,
    timeStamp: new Date("1/5/20"),
    count: 14,
    screenScore: 0.6987786523198084,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.95833,
    happy: 0.00023,
    surprised: 0.02423,
    neutral: 0.2955,
    disgusted: 0.31439,
    fearful: 0,
    angry: 0.27664,
    sad: 0.08897,
    timeStamp: new Date("1/6/20"),
    count: 15,
    screenScore: 0.9453000037478837,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 6.42321,
    happy: 0,
    surprised: 0.2367,
    neutral: 0.00061,
    disgusted: 0.00011,
    fearful: 0,
    angry: 0.7626,
    sad: 0,
    timeStamp: new Date("1/7/20"),
    count: 14,
    screenScore: 0.8301325884616017,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.01223,
    happy: 0,
    surprised: 0.00088,
    neutral: 0.00128,
    disgusted: 0.00087,
    fearful: 0,
    angry: 0.9969,
    sad: 0,
    timeStamp: new Date("1/8/20"),
    count: 12,
    screenScore: 0.9576088212809303,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 8.37901,
    happy: 0.00025,
    surprised: 0.06272,
    neutral: 0.00044,
    disgusted: 0.00028,
    fearful: 0,
    angry: 0.93645,
    sad: 0,
    timeStamp: new Date("1/9/20"),
    count: 10,
    screenScore: 0.8797936852055253,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 7.11287,
    happy: 0,
    surprised: 0,
    neutral: 0.02755,
    disgusted: 0.00105,
    fearful: 0,
    angry: 0.19997,
    sad: 0.77133,
    timeStamp: new Date("1/10/20"),
    count: 11,
    screenScore: 0.7609352729177813,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.78296,
    happy: 0.00025,
    surprised: 0.00095,
    neutral: 0.44254,
    disgusted: 0.00347,
    fearful: 0,
    angry: 0.40345,
    sad: 0.14956,
    timeStamp: new Date("1/11/20"),
    count: 12,
    screenScore: 0.7553801967616405,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.79091,
    happy: 0.00084,
    surprised: 0.25854,
    neutral: 0.30622,
    disgusted: 0.00217,
    fearful: 0.00142,
    angry: 0.12022,
    sad: 0.31055,
    timeStamp: new Date("1/12/20"),
    count: 13,
    screenScore: 0.6896599067836787,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 8.059,
    happy: 0.00017,
    surprised: 0.00145,
    neutral: 0.49914,
    disgusted: 0.02645,
    fearful: 0.00025,
    angry: 0.42747,
    sad: 0.04541,
    timeStamp: new Date("1/13/20"),
    count: 15,
    screenScore: 0.9007808613654773,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.3674,
    happy: 0.00014,
    surprised: 0.00022,
    neutral: 0.97366,
    disgusted: 0.0004,
    fearful: 0,
    angry: 0.2,
    sad: 0.0101,
    timeStamp: new Date("2/7/20 10:59"),
    count: 13,
    screenScore: 0.9650887688695561,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 6.97619,
    happy: 0.00045,
    surprised: 0.00014,
    neutral: 0.74124,
    disgusted: 0.00104,
    fearful: 0,
    angry: 0.246,
    sad: 0.01021,
    timeStamp: new Date("2/7/20 11:00"),
    count: 14,
    screenScore: 0.9650887688695561,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 7.1234,
    happy: 0.0001,
    surprised: 0.000103,
    neutral: 0.4444,
    disgusted: 0.00045,
    fearful: 0.00011,
    angry: 0,
    sad: 0.009,
    timeStamp: new Date("2/7/20 11:01"),
    count: 12,
    screenScore: 0.9044757868464902,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.44456,
    happy: 0.002,
    surprised: 0.0001,
    neutral: 0.8643,
    disgusted: 0.0012,
    fearful: 0,
    angry: 0.0001,
    sad: 0.0003,
    timeStamp: new Date("2/7/20 11:02"),
    count: 11,
    screenScore: 0.797612036729965,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 5.73136,
    happy: 0.0002,
    surprised: 0.00107,
    neutral: 0.93066,
    disgusted: 0.0002,
    fearful: 0.0002,
    angry: 0.00496,
    sad: 0.06289,
    timeStamp: new Date("2/7/20 11:03"),
    count: 14,
    screenScore: 0.8474974223182222,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 6.589,
    happy: 0.00039,
    surprised: 0.30848,
    neutral: 0.43391,
    disgusted: 0.00005,
    fearful: 0.0003,
    angry: 0.0559,
    sad: 0.20161,
    timeStamp: new Date("2/7/20 11:04"),
    count: 15,
    screenScore: 0.9542452588612251,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.93395,
    happy: 0.00041,
    surprised: 0.03908,
    neutral: 0.9239,
    disgusted: 0.00009,
    fearful: 0,
    angry: 0.03145,
    sad: 0.00506,
    timeStamp: new Date("2/7/20 11:05"),
    count: 11,
    screenScore: 0.9740140820015019,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.90814,
    happy: 0.003,
    surprised: 0.0015,
    neutral: 0.97294,
    disgusted: 0.00354,
    fearful: 0,
    angry: 0.01838,
    sad: 0.0036,
    timeStamp: new Date("2/7/20 11:06"),
    count: 14,
    screenScore: 0.9453000037478837,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 7.00335,
    happy: 0,
    surprised: 0.00471,
    neutral: 0.99357,
    disgusted: 0,
    fearful: 0.00039,
    angry: 0.00047,
    sad: 0.00086,
    timeStamp: new Date("2/7/20 11:07"),
    count: 12,
    screenScore: 0.5349370324837229,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 6.01578,
    happy: 0.00011,
    surprised: 0.01185,
    neutral: 0.9859,
    disgusted: 0.0002,
    fearful: 0,
    angry: 0.00192,
    sad: 0.0002,
    timeStamp: new Date("2/7/20 11:09"),
    count: 15,
    screenScore: 0.9044757868464902,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.12961,
    happy: 0.00353,
    surprised: 0.0578,
    neutral: 0.9377,
    disgusted: 0.0006,
    fearful: 0,
    angry: 0.00037,
    sad: 0.00016,
    timeStamp: new Date("2/7/20 11:11"),
    count: 14,
    screenScore: 0.9372568788631427,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.05049,
    happy: 0.0006,
    surprised: 0.02574,
    neutral: 0.97388,
    disgusted: 0.0002,
    fearful: 0,
    angry: 0,
    sad: 0.0003,
    timeStamp: new Date("2/7/20 11:13"),
    count: 13,
    screenScore: 0.7392784276577656,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.40929,
    happy: 0.06413,
    surprised: 0.27,
    neutral: 0.50069,
    disgusted: 0.09301,
    fearful: 0,
    angry: 0.0618,
    sad: 0.00648,
    timeStamp: new Date("2/7/20 11:15"),
    count: 12,
    screenScore: 0.9089268722409697,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.40093,
    happy: 0.0001,
    surprised: 0.25766,
    neutral: 0.71254,
    disgusted: 0.002,
    fearful: 0,
    angry: 0.001,
    sad: 0.004,
    timeStamp: new Date("2/7/20 11:16"),
    count: 15,
    screenScore: 0.9348674459634332,
    screenTime: 6
  },
  {
    userId: 1,
    trueScore: 8.9666,
    happy: 0.00048,
    surprised: 0.03,
    neutral: 0.934,
    disgusted: 0,
    fearful: 0,
    angry: 0.021,
    sad: 0.055,
    timeStamp: new Date("2/7/20 11:17"),
    count: 14,
    screenScore: 0.9740660821019738,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 6.9922,
    happy: 0.0004,
    surprised: 0.00312,
    neutral: 0.99332,
    disgusted: 0,
    fearful: 0,
    angry: 0.00031,
    sad: 0.00323,
    timeStamp: new Date("2/7/20 11:18"),
    count: 12,
    screenScore: 0.9481600701021453,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 6.4846,
    happy: 0.00304,
    surprised: 0.23536,
    neutral: 0.76126,
    disgusted: 0.007,
    fearful: 0,
    angry: 0.0006,
    sad: 0.00026,
    timeStamp: new Date("2/7/20 11:20"),
    count: 14,
    screenScore: 0.8338245574089989,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.00002,
    happy: 0,
    surprised: 0.0001,
    neutral: 0.99999,
    disgusted: 0,
    fearful: 0,
    angry: 0,
    sad: 0,
    timeStamp: new Date("2/7/20 11:22"),
    count: 13,
    screenScore: 0.9247033493351211,
    screenTime: 3
  },
  {
    userId: 1,
    trueScore: 6.84267,
    happy: 0.0008,
    surprised: 0.00419,
    neutral: 0.95419,
    disgusted: 0.0002,
    fearful: 0,
    angry: 0.04063,
    sad: 0.0009,
    timeStamp: new Date("2/7/20 11:25"),
    count: 15,
    screenScore: 0.975053322284435,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.02234,
    happy: 0,
    surprised: 0.01116,
    neutral: 0.98882,
    disgusted: 0,
    fearful: 0,
    angry: 0,
    sad: 0,
    timeStamp: new Date("2/7/20 11:26"),
    count: 15,
    screenScore: 0.917649346742229,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.00173,
    happy: 0,
    surprised: 0.00094,
    neutral: 0,
    disgusted: 0,
    fearful: 0.0003,
    angry: 0.0002,
    sad: 0.0005,
    timeStamp: new Date("2/7/20 11:27"),
    count: 15,
    screenScore: 0.9115716436817328,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.00112,
    happy: 0.0001,
    surprised: 0.00067,
    neutral: 0.99927,
    disgusted: 0,
    fearful: 0,
    angry: 0.0003,
    sad: 0.0005,
    timeStamp: new Date("2/7/20 11:28"),
    count: 15,
    screenScore: 0.8002259629303103,
    screenTime: 9
  },
  {
    userId: 1,
    trueScore: 7.02249,
    happy: 0.00486,
    surprised: 0.0007,
    neutral: 0.9945,
    disgusted: 0.00015,
    fearful: 0,
    angry: 0.00029,
    sad: 0.00013,
    timeStamp: new Date("2/7/20 11:30"),
    count: 15,
    screenScore: 0.6419621587345895,
    screenTime: 3
  }
];

const normalizeScoreSeed = [
  {
    userId: 1,
    normalizeScore: 3.3,
    runningScore: 4.5,
    sentimentDiff: 1.3636,
    timeStamp: new Date("2/7/20 11:16")
  },
  {
    userId: 1,
    normalizeScore: 6.1,
    runningScore: 5.9,
    sentimentDiff: 0.9672,
    timeStamp: new Date("2/7/20 11:17")
  },
  {
    userId: 1,
    normalizeScore: 7.9,
    runningScore: 6,
    sentimentDiff: 0.7595,
    timeStamp: new Date("2/7/20 11:18")
  },
  {
    userId: 1,
    normalizeScore: 6.3,
    runningScore: 3,
    sentimentDiff: 0.47619,
    timeStamp: new Date("2/7/20 11:20")
  },
  {
    userId: 1,
    normalizeScore: 7.2,
    runningScore: 5,
    sentimentDiff: 0.69444,
    timeStamp: new Date("2/7/20 11:22")
  },
  {
    userId: 1,
    normalizeScore: 6.8,
    runningScore: 5,
    sentimentDiff: 0.7353,
    timeStamp: new Date("2/7/20 11:25")
  },
  {
    userId: 1,
    normalizeScore: 6.5,
    runningScore: 5.2,
    sentimentDiff: 0.8,
    timeStamp: new Date("2/7/20 11:26")
  },
  {
    userId: 1,
    normalizeScore: 6.9,
    runningScore: 4.8,
    sentimentDiff: 0.6957,
    timeStamp: new Date("2/7/20 11:27")
  },
  {
    userId: 1,
    normalizeScore: 7.2,
    runningScore: 6.5,
    sentimentDiff: 0.90278,
    timeStamp: new Date("2/7/20 11:28")
  },
  {
    userId: 1,
    normalizeScore: 7.5,
    runningScore: 6.8,
    sentimentDiff: 0.90667,
    timeStamp: new Date("2/7/20 11:30")
  },
  {
    userId: 2,
    normalizeScore: 9.1,
    runningScore: 9.3,
    sentimentDiff: 1.022,
    timeStamp: new Date("1/1/20")
  },
  {
    userId: 2,
    normalizeScore: 8.9,
    runningScore: 9.4,
    sentimentDiff: 1.0562,
    timeStamp: new Date("1/2/20")
  },
  {
    userId: 2,
    normalizeScore: 8.3,
    runningScore: 9.3,
    sentimentDiff: 1.1205,
    timeStamp: new Date("1/3/20")
  },
  {
    userId: 2,
    normalizeScore: 9.2,
    runningScore: 7.9,
    sentimentDiff: 0.8587,
    timeStamp: new Date("1/4/20")
  },
  {
    userId: 2,
    normalizeScore: 8.8,
    runningScore: 7.5,
    sentimentDiff: 0.85227,
    timeStamp: new Date("1/5/20")
  },
  {
    userId: 2,
    normalizeScore: 10.0,
    runningScore: 7.5,
    sentimentDiff: 0.75,
    timeStamp: new Date("1/6/20")
  },
  {
    userId: 2,
    normalizeScore: 9.8,
    runningScore: 7.2,
    sentimentDiff: 0.7347,
    timeStamp: new Date("1/7/20")
  }
];

const seed = async () => {
  // await db.sync();
  await db.sync({ force: true });
  console.log("db synced !");

  // console.log("hmm -", emotions);
  // console.log(trueScoreGen(3));
  await User.bulkCreate(userSeed);
  await Hour.bulkCreate(hourSeed);
  await NormalizeScore.bulkCreate(normalizeScoreSeed);

  console.log(`seeded successfully`);
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

if (module === require.main) runSeed();

module.exports = seed;
