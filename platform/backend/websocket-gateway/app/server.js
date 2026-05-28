const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/health", (_, res) => {
  res.json({
    status: "healthy",
    service: "websocket-gateway"
  });
});

io.on("connection", (socket) => {

  console.log("dashboard connected:", socket.id);

  socket.emit("portfolio_updates", {
    account: "CORE-001",
    pnl: 12500,
    exposure: 0.42
  });

  socket.emit("risk_updates", {
    drawdown: 1.2,
    risk_state: "NORMAL"
  });

  socket.emit("strategy_updates", {
    strategy: "mean_reversion",
    status: "ACTIVE"
  });

  socket.emit("approval_updates", {
    pending: 0
  });

  socket.emit("kill_switch_events", {
    active: false
  });

  socket.on("disconnect", () => {
    console.log("dashboard disconnected:", socket.id);
  });
});

server.listen(8080, () => {
  console.log("websocket-gateway listening on 8080");
});
