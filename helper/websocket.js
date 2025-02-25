let clients = [];

// Broadcast to client -> mesasge
const announce = (msg) => {
    clients.forEach(client => {
        client.send(msg);
    });
}

module.exports = { clients, announce };