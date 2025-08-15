// server.js

const WebSocket = require('ws');

// අපි server එකක් හදනවා port 8080 එකෙන් අහන් ඉන්න
const wss = new WebSocket.Server({ port: 8080 });

console.log('Chat Server එක වැඩ කරන්න පටන් ගත්තා!');

// කවුරුහරි අලුතෙන් chat එකට connect වුණාම මොකද වෙන්න ඕන කියලා මෙතන කියනවා
wss.on('connection', ws => {
  console.log('අලුත් කෙනෙක් chat එකට ආවා!');

  // ඒ කෙනාගෙන් message එකක් ආවම මොකද වෙන්න ඕන කියලා මෙතන කියනවා
  ws.on('message', message => {
    console.log(`Message එකක් ආවා: ${message}`);

    // ආපු message එක අනිත් හැමෝටම යවනවා
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // කවුරුහරි chat එකෙන් ගියාම console එකේ පෙන්නනවා
  ws.on('close', () => {
    console.log('කෙනෙක් chat එකෙන් ගියා.');
  });
});