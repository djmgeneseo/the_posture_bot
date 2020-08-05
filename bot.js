const tmi = require('tmi.js');
const conf = require('conf.json')

// Define configuration options
const opts = {
  identity: {
    username: conf["user"],
    password: conf["pass"]
  },
  channels: [
    "MOONMOON", "the_posture_bot"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!posture') {
    client.say(target, `Fix your posture! Fully support your back by scooting back into your seat, lower your chin, place your feet on the floor, adjust your screen to eye level, and keep your keyboard straight in front of you.`);
    console.log(`* Executed ${commandName} command`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}