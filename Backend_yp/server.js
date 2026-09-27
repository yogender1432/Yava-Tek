const app = require("./src/app");
const connectDB = require("./src/db/db");
// require('dotenv').config({ quiet: true });

const PORT = process.env.PORT || 7000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
const HOST = process.env.HOST || "localhost";

connectDB()

app.get("/", (req, res) => {
    res.send("Hello , I am your server");
});

app.listen(PORT, HOST, () => {
    console.log(`server is listen on http://${HOST}:${PORT}`);
});
