import { io } from "socket.io-client";

const socket = io("/ws");

socket.on("connect", () => {
  console.log("Connected to websocket gateway");
});

socket.on("portfolio_updates", (data) => {
  console.log("portfolio_updates", data);
});

socket.on("risk_updates", (data) => {
  console.log("risk_updates", data);
});

socket.on("strategy_updates", (data) => {
  console.log("strategy_updates", data);
});

socket.on("approval_updates", (data) => {
  console.log("approval_updates", data);
});

socket.on("kill_switch_events", (data) => {
  console.log("kill_switch_events", data);
});

export default socket;
