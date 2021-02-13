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
    <h1>Purchases</h1>
    <div><SELECT id='users'>
    ${user.map((obj) => `<option>${obj.name}</option>`).join("")}
    </SELECT></div>
    <div><SELECT id='locations'>
    ${locations.map((obj) => `<option>${obj.name}</option>`).join("")}
    </SELECT></div>
    <div><SELECT id='items'>
    ${items.map((obj) => `<option>${obj.name}</option>`).join("")}
    </SELECT></div>
    <input type='text' value='count' id='count'>
    <input type='text' value='date' id='date'>
    <div><button type='button' id='submit'>create purchase</button></div>
    <script src="app.js"></script>
    </body>
    </html>
    `);
  
const grabUsers=await document.getElementById('users')
const grabLocations=await document.getElementById('locations')
const grabItems=await document.getElementById('items')
const grabCount=await document.getElementById('count')
const grabDate=await document.getElementById('date')
const grabSubmit=await document.getElementById('submit')

grabSubmit.addEventListener('click',()=>{
  console.log(grabCount.innerHTML)
})
  } catch (err) {
    next(err);
  }
});


