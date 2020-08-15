require('dotenv').config();

module.exports = {
  testUser: {
    testUserID: 2,
    testUserName: 'test_order',
    testUserEmail: 'test_order@email.com',
    testUserPassword: 'test_order_password'
  },
  adminUser: {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
  },
  locationID: 1234567
};
