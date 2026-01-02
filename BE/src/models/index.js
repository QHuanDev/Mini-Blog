import sequelize from "../config/database.js";
import User from "./user.model.js";
import Session from "./session.model.js";

User.hasMany(Session, {
  foreignKey: "user_id",
  as: "sessions",
  onDelete: "CASCADE",
});

Session.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options);
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error;
  }
};

export { User, Session, sequelize, syncDatabase };
export default { User, Session, sequelize, syncDatabase };
