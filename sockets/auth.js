// This module will be used when auth functionality for socket connection
// is added on the frontend. Otherwise, autz doesn't make sense
exports.checkAuth = (permission, eventType) => {
  switch (eventType) {
    // In fact, chat.C and chat.D are not needed at the moment
    case 'users:connect':
      return permission.chat.R;
    case 'message:history':
      return permission.chat.R;
    case 'message:add':
      return permission.chat.R && permission.chat.U;
    default:
      return false;
  }
}
