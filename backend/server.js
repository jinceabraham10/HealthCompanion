const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const WebSocket = require("ws");
const { notifyClient } = require("./utils/scheduler.js");
const {startEmailOn30Min}=require('./utils/cronSchedule.js')

const connectToMongoDB = require("./config/db.js");
const { sessionSetUp } = require("./config/sessionSetup.js");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

dotenv.config({ path: path.resolve(__dirname, "config/config.env") });

const app = express();
app.use(sessionSetUp);
const allowedOrigins = [
  "http://localhost:5173",
  "https://healthcompanion.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
port = process.env.PORT;
connectToMongoDB();



app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);

const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "register") {
      clients.push({
        id: parsedMessage._id,
        socket: ws
      });
      notifyClient(clients)
      console.log(`Client registered: ${parsedMessage._id}`);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients = clients.filter((client) => client.socket !== ws);
  });
});

setInterval(() => {
  notifyClient(clients);
}, 10 * 60 * 1000);

startEmailOn30Min()

const distPath = path.join(__dirname, '../frontend/dist/', 'index.html');
console.log('Serving static files from:', distPath);
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/', 'index.html'));
});

server.listen(port, () => {
  console.log("server is running at ", port);
});
