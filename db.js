const {
  Sequelize,
  DataTypes,
  STRING,
  DATE,
  NUMBER,
  INTEGER,
} = require("sequelize");
const pg = require("pg");
const db = new Sequelize("postgres://localhost/purchases");

const people = db.define("people", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const places = db.define("places", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const things = db.define("things", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const purchases=db.define('purchases',{
  count:{
    type:INTEGER,
    allowNull:false
  },
  date:{
    type:DATE,
    allowNull:false
  }
})

purchases.belongsTo(places)
purchases.belongsTo(things)
purchases.belongsTo(people)
people.hasMany(purchases)

const init = async () => {
  try {
    await db.sync({ force: true });
    const [moe, lucy, larry] = await (
      await Promise.all(["moe", "lucy", "larry"])
    ).map((name) => {
      people.create({ name });
    });
    const [nyc, chicago, la, dallas] = await (
      await Promise.all(["nyc", "chicago", "la", "dallas"])
    ).map((name) => {
      places.create({ name });
    });
    const [foo, bar, baz, quq] = await (
      await Promise.all(["foo", "bar", "baz", "quq"])
    ).map((name) => {
      things.create({ name });
    });
  } catch (err) {
    console.log(err);
  }
};
init();

module.exports = { init, models: { people, places, things } };
