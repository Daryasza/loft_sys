const user = require('./user.js');
const message = require('./message.js');

module.exports = (io) => {
  io.on("connection", socket => {
    // The reasons why there is no sense in autz flow on the socket.io backend now:
    // 1. There is no auth functionality on the frontend (each socket can send any user ID)
    // 2. There is no refreshToken functionality on the frontend (I don't see how to use it)
    //
    // Theoretical autz plan:
    // 1. get accessToken from request queries
    // 2. get [real] userId by accessToken
    // 3. check user's permission before actions
    //
    socket.on('users:connect', data => user.connect(socket, data));
    socket.on('message:add', data => message.add(io, socket, data));
    socket.on('message:history', data => message.history(socket, data));
    socket.on('disconnect', () => user.disconnect(socket));
  });
};
