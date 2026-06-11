import { io, type Socket } from "socket.io-client";
import { getAccessToken } from "./api";

/**
 * Single shared Socket.io connection for real-time features (battles, and later
 * group chat). Re-authenticates with the current in-memory access token on
 * every (re)connect. Connects to the same origin — Vite proxies /socket.io to
 * the API in dev.
 */
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io({ autoConnect: false, auth: { token: getAccessToken() } });
  }
  socket.auth = { token: getAccessToken() };
  if (!socket.connected) socket.connect();
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
}
