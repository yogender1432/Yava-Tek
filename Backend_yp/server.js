const app = require("./src/app");
const connectDB = require("./src/db/db");
// require('dotenv').config({ quiet: true });

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

connectDB()

app.get("/", (req, res) => {
    res.send("Hello , I am your server");
});

app.listen(PORT, HOST, () => {
    console.log(`server is listen on http://${HOST}:${PORT}`);
});
