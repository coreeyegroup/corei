import type { WebsocketMessageContract } from "../contracts/websocket-message.contract";

export function publish(
  message: WebsocketMessageContract
): WebsocketMessageContract {
  return message;
}
