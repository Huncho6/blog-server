// middlewares/authMiddleware.js
const isAdmin = (next) => async (root, args, context, info) => {
    if (context.user.role === 'admin') {
      throw new Error('Not authorized');
    }
    return next(root, args, context, info);
  };
  
  module.exports = { isAdmin };
  