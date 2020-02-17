const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const faker = require("faker");

function dbConnect(cb) {
  mongoose
    .connect("mongodb://localhost/proyectodos", {
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

for (let i = 0; i < 5; i++) {
  id_building.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 100; i++) {
  id_floor.push(new mongoose.mongo.ObjectId());
}

for (let i = 0; i < 100; i++) {
  id_owner.push(new mongoose.mongo.ObjectId());
}

dbConnect(() => {
  const salt = bcrypt.genSaltSync(saltRounds);

  const Admin = require("../models/Admin");
  const Employee = require("../models/Employee");
  const Building = require("../models/Building");
  const Floor = require("../models/Floor");
  const Expense = require("../models/Expense");
  const User = require("../models/User");

  let admins = [
    {
      username: "danivicario",
      password: bcrypt.hashSync("admin", bcrypt.genSaltSync(saltRounds)),
      name: "Dani",
      lastname: "Vicario",
      telephone: 981520492,
      mobile: 672814057,
      email: "dani.vicario@gmail.com",
      role: "boss"
    },
    {
      username: "frannaranjo",
      password: bcrypt.hashSync("expenses", bcrypt.genSaltSync(saltRounds)),
      name: "Fran",
      lastname: "Naranjo",
      telephone: 981520492,
      mobile: 672814057,
      email: "fran.naranjo@gmail.com",
      role: "expenses"
    },
    {
      username: "mariasimo",
      password: bcrypt.hashSync("expenses", bcrypt.genSaltSync(saltRounds)),
      name: "Maria",
      lastname: "Simo",
      telephone: 981520492,
      mobile: 672814057,
      email: "maria.simo@gmail.com",
      role: "expenses"
    },
    {
      username: "quique",
      password: bcrypt.hashSync("maitenance", bcrypt.genSaltSync(saltRounds)),
      name: "Enrique",
      lastname: "Montaño",
      telephone: 981520492,
      mobile: 672814057,
      email: "quique.montano@gmail.com",
      role: "maitenance"
    }
  ];

  let employees = [
    {
      username: "frankymolina",
      password: "portero",
      name: faker.name.firstName(),
      lastname: faker.name.firstName(),
      building: id_building[0],
      salary: [
        {
          month: '2020-01-31',
          amount: 900
        }
      ]
    }
  ];

  let buildings = [
    {
      _id: id_building[0],
      address: "Paseo de la chopera 14",
      year: 2013,
      floors: [
        {_id: id_floor[0]},
        {_id: id_floor[1]},
        {_id: id_floor[2]},
        {_id: id_floor[3]},
        {_id: id_floor[4]}
      ],
      expenses: [
        {
          month: "2020-01-31",
          light: 100,
          gas: 30,
          water: 40,
          salary: 900
        }
      ],
      placesOfInterest: [],
      startDate: "2013-12-01"
    }
  ];

  let floors = [
    {
      _id: id_floor[0],
      owner: id_owner[0],
      building: id_building[0],
      size: 40,
      name: "1A",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ],
      rent: true
    },
    {
      owner: id_owner[1],
      building: id_building[0],
      size: 40,
      name: "1B",
      expense: [
        {
          month: "2020-01-31",
          amount: 100
        }
      ],
      rent: true
    }
  ];

  let users = [
    {
      _id: id_owner[0],
      username: "cesarvalleiva",
      password: bcrypt.hashSync("owner", bcrypt.genSaltSync(saltRounds)),
      name: "César Val Leiva",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[0],
      email: "cesarvalleiva@gmail.com",
      role: "owner",
      imgName: "",
      imgPath: faker.image.avatar()
    },
    {
      username: "cristinasuarez",
      password: bcrypt.hashSync("tenant", bcrypt.genSaltSync(saltRounds)),
      name: "Cristina Suarez",
      telephone: getPhone(),
      mobile: getMobile(),
      floor: id_floor[0],
      email: "cristinasuarez@gmail.com",
      role: "tenant",
      imgName: "",
      imgPath: faker.image.avatar()
    }
  ];

  Admin.deleteMany()
    .then(() => {
      return Admin.create(admins);
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
      return Employee.deleteMany();
    })
    .then(() => {
      return Employee.create(employees);
    })
    .then(() => {
      return User.deleteMany();
    })
    .then(() => {
      return User.create(users);
    })
    .then(() => {
      console.log("succesfully added all the data");
      mongoose.connection.close();
      process.exit(0);
    });
});
