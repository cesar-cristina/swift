const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const faker = require("faker");
require("dotenv").config();

function dbConnect(cb) {
  mongoose
    .connect(`${process.env.DBR}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
      cb();
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
}

getPhone = () => {
  const characters = "0123456789";
  let phone = 91;
  for (let i = 0; i < 7; i++) {
    phone += characters[Math.floor(Math.random() * characters.length)];
  }
  return phone;
};

getMobile = () => {
  const characters = "0123456789";
  let mobile = 6;
  for (let i = 0; i < 8; i++) {
    mobile += characters[Math.floor(Math.random() * characters.length)];
  }
  return mobile;
};

const id_building = [];
const id_floor = [];
const id_owner = [];
const id_tenant = [];
const id_supplier = [];

for (let i = 0; i < 5; i++) {
  id_building.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 100; i++) {
  id_floor.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 100; i++) {
  id_owner.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 100; i++) {
  id_tenant.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 10; i++) {
  id_supplier.push(new mongoose.mongo.ObjectId());
}

dbConnect(() => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("123", salt);

  const Building = require("../models/Building");
  const Floor = require("../models/Floor");
  const Notification = require("../models/Notification");
  const User = require("../models/User");
  const Supplier = require("../models/Supplier");
  const Vencimiento = require("../models/Vencimiento");

  let buildings = [
    {
      _id: id_building[0],
      address: "Paseo de la chopera 14",
      year: 2013,
      floors: [
        { _id: id_floor[0] },
        { _id: id_floor[1] },
        { _id: id_floor[2] },
        { _id: id_floor[3] },
        { _id: id_floor[4] },
        { _id: id_floor[5] },
        { _id: id_floor[6] },
        { _id: id_floor[7] },
        { _id: id_floor[8] },
        { _id: id_floor[9] },
        { _id: id_floor[10] },
        { _id: id_floor[11] }
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 100,
          gas: 30,
          water: 40
        }
      ],
      placesOfInterest: [],
      startDate: "2013-12-01"
    },

    {
      _id: id_building[1],
      address: "Calle Tomás Bretón 41",
      year: 2015,
      floors: [
        { _id: id_floor[12] },
        { _id: id_floor[13] },
        { _id: id_floor[14] },
        { _id: id_floor[15] },
        { _id: id_floor[16] },
        { _id: id_floor[17] },
        { _id: id_floor[18] },
        { _id: id_floor[19] },
        { _id: id_floor[20] },
        { _id: id_floor[21] },
        { _id: id_floor[22] },
        { _id: id_floor[23] },
        { _id: id_floor[24] },
        { _id: id_floor[25] },
        { _id: id_floor[26] }
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 85,
          gas: 35,
          water: 40
        }
      ],
      placesOfInterest: [],
      startDate: "2015-10-07"
    },

    {
      _id: id_building[2],
      address: "Calle de Eduardo Marquina 31",
      year: 2016,
      floors: [
        { _id: id_floor[27] },
        { _id: id_floor[28] },
        { _id: id_floor[29] },
        { _id: id_floor[30] },
        { _id: id_floor[31] },
        { _id: id_floor[32] },
        { _id: id_floor[33] },
        { _id: id_floor[34] }
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 80,
          gas: 50,
          water: 45
        }
      ],
      placesOfInterest: [],
      startDate: "2016-07-10"
    },

    {
      _id: id_building[3],
      address: "Calle Jesús del Gran Poder 2",
      year: 2010,
      floors: [
        { _id: id_floor[35] },
        { _id: id_floor[36] },
        { _id: id_floor[37] },
        { _id: id_floor[38] },
        { _id: id_floor[39] },
        { _id: id_floor[40] },
        { _id: id_floor[41] },
        { _id: id_floor[42] },
        { _id: id_floor[43] },
        { _id: id_floor[44] },
        { _id: id_floor[45] },
        { _id: id_floor[46] },
        { _id: id_floor[47] },
        { _id: id_floor[48] },
        { _id: id_floor[49] },
        { _id: id_floor[50] },
        { _id: id_floor[51] },
        { _id: id_floor[52] },
        { _id: id_floor[53] },
        { _id: id_floor[54] },
        { _id: id_floor[55] }
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 120,
          gas: 60,
          water: 80
        }
      ],
      placesOfInterest: [],
      startDate: "2010-04-17"
    },

    {
      _id: id_building[4],
      address: "Calle de Ricardo Goizueta 6",
      year: 2012,
      floors: [
        { _id: id_floor[56] },
        { _id: id_floor[57] },
        { _id: id_floor[58] },
        { _id: id_floor[59] },
        { _id: id_floor[60] },
        { _id: id_floor[61] },
        { _id: id_floor[62] },
        { _id: id_floor[63] },
        { _id: id_floor[64] },
        { _id: id_floor[65] },
        { _id: id_floor[66] },
        { _id: id_floor[67] },
        { _id: id_floor[68] },
        { _id: id_floor[69] },
        { _id: id_floor[70] },
        { _id: id_floor[71] }
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 110,
          gas: 70,
          water: 70
        }
      ],
      placesOfInterest: [],
      startDate: "2012-08-30"
    }
  ];

  let floors = [
    {
      _id: id_floor[0],
      owner: id_owner[0],
      tenant: id_tenant[0],
      building: id_building[0],
      size: 40,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[1],
      owner: id_owner[1],
      tenant: id_tenant[1],
      building: id_building[0],
      size: 40,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[2],
      owner: id_owner[2],
      tenant: id_tenant[2],
      building: id_building[0],
      size: 40,
      name: "1C",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[3],
      owner: id_owner[3],
      building: id_building[0],
      size: 40,
      name: "1D",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[4],
      owner: id_owner[4],
      tenant: id_tenant[4],
      building: id_building[0],
      size: 40,
      name: "2A",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[5],
      owner: id_owner[5],
      building: id_building[0],
      size: 40,
      name: "2B",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[6],
      owner: id_owner[6],
      tenant: id_tenant[6],
      building: id_building[0],
      size: 40,
      name: "2C",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[7],
      owner: id_owner[7],
      tenant: id_tenant[7],
      building: id_building[0],
      size: 40,
      name: "2D",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[8],
      owner: id_owner[8],
      tenant: id_tenant[8],
      building: id_building[0],
      size: 40,
      name: "3A",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[9],
      owner: id_owner[9],
      tenant: id_tenant[9],
      building: id_building[0],
      size: 40,
      name: "3B",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[10],
      owner: id_owner[10],
      building: id_building[0],
      size: 40,
      name: "3C",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[11],
      owner: id_owner[11],
      tenant: id_tenant[11],
      building: id_building[0],
      size: 40,
      name: "3D",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ]
    },
    {
      _id: id_floor[12],
      owner: id_owner[12],
      tenant: id_tenant[12],
      building: id_building[1],
      size: 65,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[13],
      owner: id_owner[13],
      tenant: id_tenant[13],
      building: id_building[1],
      size: 65,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[14],
      owner: id_owner[14],
      building: id_building[1],
      size: 65,
      name: "1C",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[15],
      owner: id_owner[15],
      building: id_building[1],
      size: 65,
      name: "2A",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[16],
      owner: id_owner[16],
      tenant: id_tenant[16],
      building: id_building[1],
      size: 65,
      name: "2B",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[17],
      owner: id_owner[17],
      tenant: id_tenant[17],
      building: id_building[1],
      size: 65,
      name: "2C",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[18],
      owner: id_owner[18],
      tenant: id_tenant[18],
      building: id_building[1],
      size: 65,
      name: "3A",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[19],
      owner: id_owner[19],
      tenant: id_tenant[19],
      building: id_building[1],
      size: 65,
      name: "3B",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[20],
      owner: id_owner[20],
      tenant: id_tenant[20],
      building: id_building[1],
      size: 65,
      name: "3C",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[21],
      owner: id_owner[21],
      tenant: id_tenant[21],
      building: id_building[1],
      size: 65,
      name: "4A",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[22],
      owner: id_owner[22],
      tenant: id_tenant[22],
      building: id_building[1],
      size: 65,
      name: "4B",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[23],
      owner: id_owner[23],
      tenant: id_tenant[23],
      building: id_building[1],
      size: 65,
      name: "4C",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[24],
      owner: id_owner[24],
      tenant: id_tenant[24],
      building: id_building[1],
      size: 65,
      name: "5A",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[25],
      owner: id_owner[25],
      tenant: id_tenant[25],
      building: id_building[1],
      size: 65,
      name: "5B",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[26],
      owner: id_owner[26],
      tenant: id_tenant[26],
      building: id_building[1],
      size: 65,
      name: "5C",
      expense: [
        {
          month: "2020-01-31",
          amount: 80
        }
      ]
    },
    {
      _id: id_floor[27],
      owner: id_owner[27],
      tenant: id_tenant[27],
      building: id_building[2],
      size: 100,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[28],
      owner: id_owner[28],
      building: id_building[2],
      size: 100,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[29],
      owner: id_owner[29],
      tenant: id_tenant[29],
      building: id_building[2],
      size: 100,
      name: "1C",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[30],
      owner: id_owner[30],
      tenant: id_tenant[30],
      building: id_building[2],
      size: 100,
      name: "1D",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[31],
      owner: id_owner[31],
      tenant: id_tenant[31],
      building: id_building[2],
      size: 100,
      name: "2A",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[32],
      owner: id_owner[32],
      tenant: id_tenant[32],
      building: id_building[2],
      size: 100,
      name: "2B",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[33],
      owner: id_owner[33],
      building: id_building[2],
      size: 100,
      name: "2C",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[34],
      owner: id_owner[34],
      tenant: id_tenant[34],
      building: id_building[2],
      size: 100,
      name: "2D",
      expense: [
        {
          month: "2020-01-31",
          amount: 70
        }
      ]
    },
    {
      _id: id_floor[35],
      owner: id_owner[35],
      tenant: id_tenant[35],
      building: id_building[3],
      size: 120,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[36],
      owner: id_owner[36],
      tenant: id_tenant[36],
      building: id_building[3],
      size: 120,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[37],
      owner: id_owner[37],
      tenant: id_tenant[37],
      building: id_building[3],
      size: 120,
      name: "1C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[38],
      owner: id_owner[38],
      building: id_building[3],
      size: 120,
      name: "2A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[39],
      owner: id_owner[39],
      tenant: id_tenant[39],
      building: id_building[3],
      size: 120,
      name: "2B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[40],
      owner: id_owner[40],
      building: id_building[3],
      size: 120,
      name: "2C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[41],
      owner: id_owner[41],
      tenant: id_tenant[41],
      building: id_building[3],
      size: 120,
      name: "3A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[42],
      owner: id_owner[42],
      building: id_building[3],
      size: 120,
      name: "3B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[43],
      owner: id_owner[43],
      tenant: id_tenant[43],
      building: id_building[3],
      size: 120,
      name: "3C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[44],
      owner: id_owner[44],
      tenant: id_tenant[44],
      building: id_building[3],
      size: 120,
      name: "4A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[45],
      owner: id_owner[45],
      building: id_building[3],
      size: 120,
      name: "4B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[46],
      owner: id_owner[46],
      tenant: id_tenant[46],
      building: id_building[3],
      size: 120,
      name: "4C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[47],
      owner: id_owner[47],
      building: id_building[3],
      size: 120,
      name: "5A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[48],
      owner: id_owner[48],
      tenant: id_tenant[48],
      building: id_building[3],
      size: 120,
      name: "5B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[49],
      owner: id_owner[49],
      tenant: id_tenant[49],
      building: id_building[3],
      size: 120,
      name: "5C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[50],
      owner: id_owner[50],
      building: id_building[3],
      size: 120,
      name: "6A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[51],
      owner: id_owner[51],
      tenant: id_tenant[51],
      building: id_building[3],
      size: 120,
      name: "6B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[52],
      owner: id_owner[52],
      tenant: id_tenant[52],
      building: id_building[3],
      size: 120,
      name: "6C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[53],
      owner: id_owner[53],
      building: id_building[3],
      size: 120,
      name: "7A",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[54],
      owner: id_owner[54],
      tenant: id_tenant[54],
      building: id_building[3],
      size: 120,
      name: "7B",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[55],
      owner: id_owner[55],
      tenant: id_tenant[55],
      building: id_building[3],
      size: 120,
      name: "7C",
      expense: [
        {
          month: "2020-01-31",
          amount: 90
        }
      ]
    },
    {
      _id: id_floor[56],
      owner: id_owner[56],
      tenant: id_tenant[56],
      building: id_building[4],
      size: 150,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[57],
      owner: id_owner[57],
      building: id_building[4],
      size: 150,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[58],
      owner: id_owner[58],
      tenant: id_tenant[58],
      building: id_building[4],
      size: 150,
      name: "2A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[59],
      owner: id_owner[59],
      tenant: id_tenant[59],
      building: id_building[4],
      size: 150,
      name: "2B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[60],
      owner: id_owner[60],
      tenant: id_tenant[60],
      building: id_building[4],
      size: 150,
      name: "3A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[61],
      owner: id_owner[61],
      building: id_building[4],
      size: 150,
      name: "3B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[62],
      owner: id_owner[62],
      tenant: id_tenant[62],
      building: id_building[4],
      size: 150,
      name: "4A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[63],
      owner: id_owner[63],
      tenant: id_tenant[63],
      building: id_building[4],
      size: 150,
      name: "4B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[64],
      owner: id_owner[64],
      tenant: id_tenant[64],
      building: id_building[4],
      size: 150,
      name: "5A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[65],
      owner: id_owner[65],
      tenant: id_tenant[65],
      building: id_building[4],
      size: 150,
      name: "5B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[66],
      owner: id_owner[66],
      tenant: id_tenant[66],
      building: id_building[4],
      size: 150,
      name: "6A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[67],
      owner: id_owner[67],
      building: id_building[4],
      size: 150,
      name: "6B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[68],
      owner: id_owner[68],
      building: id_building[4],
      size: 150,
      name: "7A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[69],
      owner: id_owner[69],
      building: id_building[4],
      size: 150,
      name: "7B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[70],
      owner: id_owner[70],
      building: id_building[4],
      size: 150,
      name: "8A",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    },
    {
      _id: id_floor[71],
      owner: id_owner[71],
      tenant: id_tenant[71],
      building: id_building[4],
      size: 150,
      name: "8B",
      expense: [
        {
          month: "2020-01-31",
          amount: 110
        }
      ]
    }
  ];

  let users = [
    {
      username: "danivicario",
      password: bcrypt.hashSync("admin", bcrypt.genSaltSync(saltRounds)),
      name: "Dani Vicario",
      telephone: getPhone(),
      mobile: getMobile(),
      email: "dani.vicario@gmail.com",
      role: "admin",
      type: "boss"
    },
    {
      username: "frannaranjo",
      password: bcrypt.hashSync("expenses", bcrypt.genSaltSync(saltRounds)),
      name: "Fran Naranjo",
      telephone: getPhone(),
      mobile: getMobile(),
      email: "fran.naranjo@gmail.com",
      role: "admin",
      type: "expenses"
    },
    {
      username: "mariasimo",
      password: bcrypt.hashSync("expenses", bcrypt.genSaltSync(saltRounds)),
      name: "Maria Simó",
      telephone: getPhone(),
      mobile: getMobile(),
      email: "maria.simo@gmail.com",
      role: "admin",
      type: "expenses"
    },
    {
      username: "quique",
      password: bcrypt.hashSync("maitenance", bcrypt.genSaltSync(saltRounds)),
      name: "Enrique Montaño",
      telephone: getPhone(),
      mobile: getMobile(),
      email: "quique.montano@gmail.com",
      role: "admin",
      type: "maitenance"
    },
    {
      username: "frankymolina",
      password: bcrypt.hashSync("portero", bcrypt.genSaltSync(saltRounds)),
      name: faker.name.findName(),
      role: "employee",
      type: "portero",
      building: id_building[0],
      salary: [
        {
          month: 1,
          year: 2020,
          amount: 900
        },
        {
          month: 2,
          year: 2020,
          amount: 900
        }
      ]
    },
    {
      _id: id_owner[0],
      username: "alejandrosanchez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Alejandro Sanchez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[0],
      email: "alejandrosanchez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[0],
      username: "luisanaya",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Luis Anaya",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[0],
      email: "luisanaya@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[1],
      username: "alvaromonasterio",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Alvaro Monasterio",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[1],
      email: "alvaromonasterio@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[1],
      username: "luiscamacho",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Luis Camacho",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[1],
      email: "luiscamacho@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[2],
      username: "armandomomo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Armando Momo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[2],
      email: "armandomomo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[2],
      username: "mathiasrodriguezpires",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Mathias Rodriguez Pires",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[2],
      email: "mathiasrodriguezpires@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[3],
      username: "arturobruno",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Arturo Bruno",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[3],
      email: "arturobruno@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[4],
      username: "barbislopez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Barbis Lopez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[4],
      email: "barbislopez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[4],
      username: "maitedelila",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Maite Delila",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[4],
      email: "maitedelila@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[5],
      username: "fernandocomet",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Fernando Comet",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[5],
      email: "fernandocomet@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[6],
      username: "frankymolina",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Franky Molina",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[6],
      email: "frankymolina@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[6],
      username: "manuelalvarez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Manuel Alvarez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[6],
      email: "manuelalvarez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[7],
      username: "jaimehidalgo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Jaime Hidalgo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[7],
      email: "jaimehidalgo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[7],
      username: "margacambray",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Marga Cambray",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[7],
      email: "margacambray@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[8],
      username: "josegutierrez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Jose Gutierrez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[8],
      email: "josegutierrez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[8],
      username: "omarvega",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Omar Vega",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[8],
      email: "omarvega@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[9],
      username: "josehenche",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Jose Henche",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[9],
      email: "josehenche@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[9],
      username: "mariamunera",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Maria Munera",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[9],
      email: "mariamunera@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[10],
      username: "juancarlosmateo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Juan Carlos Mateo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[10],
      email: "juancarlosmateo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[11],
      username: "lauratobajas",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Laura Tobajas",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[11],
      email: "lauratobajas@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[11],
      username: "mariannafitos",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Marianna Fitos",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[11],
      email: "mariannafitos@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[12],
      username: "lucianosanchez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Luciano Sanchez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[12],
      email: "lucianosanchez@gmail.com",
      role: "user",
      type: "owner",
      building: id_building[1],
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[12],
      username: "martamarti",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Marta Marti",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[12],
      email: "martamarti@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[13],
      username: "manufernandez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Manu Fernandez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[13],
      email: "manufernandez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[13],
      username: "matheuslavado",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Matheus Lavado",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[13],
      email: "matheuslavado@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[14],
      username: "marzolopez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Marzo Lopez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[14],
      email: "marzolopez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[15],
      username: "miriammendez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Miriam Mendez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[15],
      email: "miriammendez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[16],
      username: "pablocarceller",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Carceller",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[16],
      email: "pablocarceller@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[16],
      username: "micaelzamarreño",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Micael Zamarreño",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[16],
      email: "micaelzamarreño@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },

    {
      _id: id_owner[17],
      username: "pedrocastañeda",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Pedro Castañeda",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[17],
      email: "pedrocastañeda@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[17],
      username: "miguelalvarez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miguel Alvarez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[17],
      email: "miguelalvarez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[18],
      username: "pedrosanchez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Pedro Sanchez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[18],
      email: "pedrosanchez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[18],
      username: "miguelgarcia",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miguel Garcia",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[18],
      email: "miguelgarcia@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[19],
      username: "soniagomez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Sonia Gomez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[19],
      email: "soniagomez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[19],
      username: "oscarmartinez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Oscar Martinez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[19],
      email: "oscarmartinez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[20],
      username: "victorrodriguez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Victor Rodriguez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[20],
      email: "victorrodriguez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[20],
      username: "opamelagonzalez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pamela Gonzalez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[20],
      email: "pamelagonzalez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[21],
      username: "aaronfernandez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Victor Rodriguez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[21],
      email: "victorrodriguez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "aaronfernandez@gmail.com",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[21],
      username: "paolapelaez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Paola Pelaez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[21],
      email: "paolapelaez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[22],
      username: "abelcolmenares",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Abel Colmenares",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[22],
      email: "abelcolmenares@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[22],
      username: "mireirafigueras",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Mireira Figueras",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[22],
      email: "mireirafigueras@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[23],
      username: "abelmoreno",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Abel Moreno",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[23],
      email: "abelmoreno@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[23],
      username: "miriam",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miriam",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[23],
      email: "miriam@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[24],
      username: "adrianllerena",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Adrian Llerena",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[24],
      email: "adrianllerena@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[24],
      username: "mirilopez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miri Lopez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[24],
      email: "mirilopez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[25],
      username: "adrianmerida",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Adrian Merida",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[25],
      email: "adrianmerida@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[25],
      username: "monicaabad",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Monica Abad",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[25],
      email: "monicaabad@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[26],
      username: "blancavelazquez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Blanca Velazquez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[26],
      email: "blancavelazquez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[26],
      username: "moritzramm",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Moritz Ramm",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[26],
      email: "moritzramm@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[27],
      username: "bielmorro",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Biel Morro",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[27],
      email: "bielmorro@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[27],
      username: "nachotramoyeres",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nacho Tramoyeres",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[27],
      email: "nachotramoyeres@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[28],
      username: "brandymcarthur",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Brandy McArthur",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[28],
      email: "brandymcarthur@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[29],
      username: "brunotavares",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Bruno Tavares",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[29],
      email: "brunotavares@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[29],
      username: "natefalconer",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nate Falconer",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[29],
      email: "natefalconer@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[30],
      username: "camiloosorio",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Camilo Osorio",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[30],
      email: "camiloosorio@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[30],
      username: "nelsonaires",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nelson Aires",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[30],
      email: "nelsonaires@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[31],
      username: "carlaonate",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Carla Onate",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[31],
      email: "carlaonate@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[31],
      username: "nicholasshermon",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nicholas Shermon",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[31],
      email: "nicholasshermon@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[32],
      username: "carlosarevalo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Carlos Arevalo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[32],
      email: "carlosarevalo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[32],
      username: "olavocarvalho",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Olavo Carvalho",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[32],
      email: "olavocarvalho@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[33],
      username: "carloscortes",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Carlos Cortes",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[33],
      email: "carloscortes@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[34],
      username: "carlosmuñoz",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Carlos Muñoz",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[34],
      email: "carlosmuñoz@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[34],
      username: "paolarodriguezbarron",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Paola Rodriguez Barron",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[34],
      email: "paolarodriguezbarron@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[35],
      username: "cesarlugo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Cesar Lugo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[35],
      email: "cesarlugo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[35],
      username: "ninalombardo",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nina Lombardo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[35],
      email: "ninalombardo@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[36],
      username: "chloeleteinturier",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Chloe Leteinturier",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[36],
      email: "chloeleteinturier@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[36],
      username: "ninoglonti",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nino Glonti",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[36],
      email: "ninoglonti@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[37],
      username: "christianbenjumea",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Christian Benjumea",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[37],
      email: "christianbenjumea@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[37],
      username: "noemigranulo",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Noemi Granulo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[37],
      email: "noemigranulo@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[38],
      username: "christianromero",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Christian Romero",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[38],
      email: "christianromero@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[39],
      username: "andreabalica",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Andrea Balica",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[39],
      email: "andreabalica@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[39],
      username: "octavefernandez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Octave Fernandez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[39],
      email: "octavefernandez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[40],
      username: "andresweber",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Andres Weber",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[40],
      email: "andresweber@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[41],
      username: "andrevitta",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Andre Vitta",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[41],
      email: "andrevitta@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[41],
      username: "mikomullen",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miko Mullen",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[41],
      email: "mikomullen@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[42],
      username: "sandrabosk",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Sandra Bosk",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[42],
      email: "sandrabosk@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[43],
      username: "alejandrotorun",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Alejandro Torun",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[43],
      email: "alejandrotorun@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[43],
      username: "nachomartinez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Nacho Martinez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[43],
      email: "nachomartinez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[44],
      username: "alfredogonzalez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Alfredo Gonzalez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[44],
      email: "alfredogonzalez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[44],
      username: "nosheitchang",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Osheit Chang",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[44],
      email: "osheitchang@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[45],
      username: "anahorta",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ana Horta",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[45],
      email: "anahorta@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[46],
      username: "diegosantos",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Diego Santos",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[46],
      email: "diegosantos@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[46],
      username: "pablosanchez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Sanchez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[46],
      email: "pablosanchez@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[47],
      username: "elviraramirez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Elvira Ramirez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[47],
      email: "elviraramirez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[48],
      username: "elvisvolk",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Elvis Volk",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[48],
      email: "elvisvolk@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[48],
      username: "pabloiriarte",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Iriarte",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[48],
      email: "pabloiriarte@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[49],
      username: "emiliopatiño",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Emilio Patiño",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[49],
      email: "emiliopatiño@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[49],
      username: "pacovaca",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Paco Vaca",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[49],
      email: "pacovaca@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[50],
      username: "enriqueanaya",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Enrique Anaya",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[50],
      email: "enriqueanaya@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[51],
      username: "estefaniaconocchioli",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Estefania Conocchioli",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[51],
      email: "estefaniaconocchioli@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[51],
      username: "pabloonieva",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Onieva",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[51],
      email: "pabloonieva@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[52],
      username: "estafaniadelcastillo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Estafania del Castillo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[52],
      email: "estefaniaconocchioli@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[52],
      username: "pabloonieva",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Onieva",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[52],
      email: "pabloonieva@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[53],
      username: "estefaniamarchena",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Estefania Marchena",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[53],
      email: "estefaniamarchena@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[54],
      username: "esterbarroso",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ester Barroso",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[54],
      email: "esterbarroso@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[54],
      username: "marianeladobal",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Marianela Dobal",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[54],
      email: "marianeladobal@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[55],
      username: "estherdiaz",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Esther Diaz",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[55],
      email: "estherdiaz@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[55],
      username: "pablogiral",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Pablo Giral",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[55],
      email: "pablogiral@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[56],
      username: "eugeniochang",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Eugenio Chang",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[56],
      email: "eugeniochang@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[56],
      username: "maxstuart",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Max Stuart",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[56],
      email: "maxstuart@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[57],
      username: "gonzalofidalgo",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Gonzalo Fidalgo",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[57],
      email: "gonzalofidalgo@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[58],
      username: "gonzalohernandez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Gonzalo Hernandez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[58],
      email: "gonzalohernandez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[58],
      username: "milenatyree",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Milena Tyree",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[58],
      email: "milenatyree@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[59],
      username: "gregoryafentoudilis",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Gregory Afentoudilis",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[59],
      email: "gregoryafentoudilis@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[59],
      username: "patriciacarmona",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Patricia Carmona",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[59],
      email: "patriciacarmona@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[60],
      username: "gretacrocket",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Greta Crocket",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[60],
      email: "gretacrocket@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[60],
      username: "patriciamartin",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Patricia Martin",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[60],
      email: "patriciamartin@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[61],
      username: "henryhoyos",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Henry Hoyos",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[61],
      email: "henryhoyos@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[62],
      username: "humbertobuniotto",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Humberto Buniotto",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[62],
      email: "humbertobuniotto@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[62],
      username: "mafaldafragoso",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Mafalda Fragoso",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[62],
      email: "mafaldafragoso@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[63],
      username: "ignaciopalacios",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ignacio Palacios",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[63],
      email: "ignaciopalacios@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[63],
      username: "magalidit",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Magali Dit",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[63],
      email: "magalidit@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[64],
      username: "igorguitard",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Igor Guitard",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[64],
      email: "igorguitard@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[64],
      username: "mariapedauyé",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Maria Pedauyé",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[64],
      email: "mariapedauyé@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[65],
      username: "indragonzalez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Indra Gonzalez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[65],
      email: "indragonzalez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[65],
      username: "omaravelar",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Omar Avelar",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[65],
      email: "omaravelar@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[66],
      username: "inescarballido",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ines Carballido",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[66],
      email: "inescarballido@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[66],
      username: "miguelvian",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Miguel Vian",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[66],
      email: "miguelvian@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[67],
      username: "ingridisidro",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ingrid Isidro",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[67],
      email: "ingridisidro@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[68],
      username: "irenedemas",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Irene Demas",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[68],
      email: "irenedemas@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[69],
      username: "isabelalemos",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Isabela Lemos",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[69],
      email: "isabelalemos@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[70],
      username: "israelmartinez",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Israel Martinez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[70],
      email: "israelmartinez@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_owner[71],
      username: "ivomatos",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "Ivo Matos",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[71],
      email: "ivomatos@gmail.com",
      role: "user",
      type: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      _id: id_tenant[71],
      username: "mannygaraboa",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Manny Garaboa",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[71],
      email: "mannygaraboa@gmail.com",
      role: "user",
      type: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    }
  ];

  let notifications = [
    {
      building: id_building[0],
      subject: "Cambio de cañería",
      message:
        "Se les comunica que el día 28/02 no habrá agua en todo el día debido al mencionado trabajo"
    },
    {
      building: id_building[1],
      subject: "Portero eléctrico",
      message:
        "Está funcionando mal. Les comunicaremos cuándo pasarán a arreglarlo"
    }
  ];

  let suppliers = [
    {
      _id: id_supplier[0],
      name: "EdP Energia - Luz",
      address: "paseo virgen del puerto 0",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Luz"
    },
    {
      _id: id_supplier[1],
      name: "EdP Energia - Gas",
      address: "calle goya 2",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Gas"
    },
    {
      _id: id_supplier[2],
      name: "Canal de Ysabel II",
      address: "calle doctor fleming 1",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Agua"
    },
    {
      _id: id_supplier[3],
      name: "Pedro Lopez",
      address: "calle Manuel Alexander 16",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Electricista"
    },
    {
      _id: id_supplier[4],
      name: "Facundo Gomez",
      address: "calle doctor fleming 10",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Fontanero"
    },
    {
      _id: id_supplier[5],
      name: "Horacio Gimenez",
      address: "calle Paseo de la Chopera 8",
      telephone: getPhone(),
      mobile: getMobile(),
      service: "Albañil"
    }
  ];

  let vencimientos = [
    {
      building: id_building[2],
      supplier: id_supplier[4],
      amount: 150,
      expireDate: "2020-02-28"
    },
    {
      building: id_building[1],
      supplier: id_supplier[5],
      amount: 50,
      expireDate: "2020-01-31"
    }
  ];

  User.deleteMany()
    .then(() => {
      return User.create(users);
    })
    .then(() => {
      return Building.deleteMany();
    })
    .then(() => {
      return Building.create(buildings);
    })
    .then(() => {
      return Floor.deleteMany();
    })
    .then(() => {
      return Floor.create(floors);
    })
    .then(() => {
      return Notification.deleteMany();
    })
    .then(() => {
      return Notification.create(notifications);
    })
    .then(() => {
      return Supplier.deleteMany();
    })
    .then(() => {
      return Supplier.create(suppliers);
    })
    .then(() => {
      return Vencimiento.deleteMany();
    })
    .then(() => {
      return Vencimiento.create(vencimientos);
    })
    .then(() => {
      console.log("succesfully added all the data");
      mongoose.connection.close();
      process.exit(0);
    });
});
