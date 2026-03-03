// // const app = require("./app");
// // const sequelize = require("./db/config/database");
// // const { PORT } = require("./config/env");

// // require("./models/userProfile.model");
// // require("./models/familyProfile.model");
// // require("./models/healthProfile.model");
// // require("./models/coverageProfile.model");
// // require("./models/financialProfile.model");
// // require("./models/policyProfile.model");

// // require("./models/associations");

// // async function startServer() {
// //   try {
// //     await sequelize.authenticate();
// //     console.log("Database connected");

// //     await sequelize.sync({ alter: true });

// //     app.listen(PORT, () => {
// //       console.log(`Server running on ${PORT}`);
// //     });
// //   } catch (error) {
// //     console.error("Server failed to start:", error);
// //   }
// // }

// // startServer();
// const app = require("./app");
// const sequelize = require("./db/config/database");
// const { PORT } = require("./config/env");

// // Load all models
// require("./models/user.model");
// require("./models/refreshToken.model");
// require("./models/userProfile.model");
// require("./models/familyProfile.model");
// require("./models/healthProfile.model");
// require("./models/coverageProfile.model");
// require("./models/financialProfile.model");
// require("./models/policyProfile.model");

// // Load relations
// require("./models/associations");

// async function startServer() {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected");

//     await sequelize.sync({ alter: true });

//     app.listen(PORT, () => {
//       console.log(`Server running on ${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// startServer();


const app = require("./app");
const sequelize = require("./db/config/database");
const { PORT } = require("./config/env");
const seedSuperAdmin = require("./seeders/superAdminSeeder");

// Load all models
require("./models/user.model");
require("./models/refreshToken.model");
require("./models/userProfile.model");
require("./models/familyProfile.model");
require("./models/healthProfile.model");
require("./models/coverageProfile.model");
require("./models/financialProfile.model");
require("./models/policyProfile.model");

// Load relations
require("./models/associations");

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });

    // 🔴 IMPORTANT: create super admin automatically
    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();