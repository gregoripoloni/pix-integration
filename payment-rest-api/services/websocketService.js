const WebSocket = require('ws');
require('dotenv').config({ path: './config.env' });

class WebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Set();
    this.port = process.env.WEBSOCKET_PORT;
  }

  initialize() {
    this.wss = new WebSocket.Server({ port: this.port });

    this.wss.on('connection', (ws) => {
      this.clients.add(ws);

      ws.on('close', () => {
        this.clients.delete(ws);
      });

      ws.on('error', () => {
        this.clients.delete(ws);
      });
    });

    console.log(`WebSocket server started on port ${this.port}`);
  }

  broadcast(eventType, data) {
    if (!this.wss || this.clients.size === 0) {
      return;
    }

    const payload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      data
    };

    const message = JSON.stringify(payload);

    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(message);
        } catch (error) {
          this.clients.delete(client);
        }
      } else {
        this.clients.delete(client);
      }
    });
  }
}

module.exports = WebSocketService;