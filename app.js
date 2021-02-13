const {
  init,
  models: { people, places, things },
} = require("./db");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("dev"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`${PORT} is open`);
});

app.get("/", async (req, res, next) => {
  try {
    const [user, locations, items] = await Promise.all([
      people.findAll(),
      places.findAll(),
      things.findAll(),
    ]);
    res.send(`
    <html>
    <head>
    <title>
    Purcases
    </title>
    </head>
    <body>
    <h1>People</h1>
    <ul>
    ${user.map((obj) => `<li>${obj.name}</li>`).join("")}
    </ul>
    </body>
    </html>
    `);
  } catch (err) {
    next(err);
  }
});
