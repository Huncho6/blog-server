const jwt = require('jsonwebtoken'); // Import jwt

const generateAdminToken = (admin) => {
    return jwt.sign(
      { id: admin.id, role: "admin" }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );
};

const generateUserToken = (user) => {
    return jwt.sign(
      { id: user.id, role: "user" }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );
};

// Export the functions
module.exports = {
    generateAdminToken,
    generateUserToken,
};
