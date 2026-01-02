import { DataTypes, Op } from "sequelize";
import sequelize from "../config/database.js";

const Session = sequelize.define(
  "Session",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    refresh_token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    refresh_expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    is_revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "sessions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);

Session.createSession = async function (
  userId,
  refreshToken,
  expiresAt,
  metadata = {}
) {
  return await this.create({
    user_id: userId,
    refresh_token: refreshToken,
    refresh_expires: expiresAt,
    ip_address: metadata.ipAddress || null,
  });
};

Session.findByRefreshToken = async function (refreshToken) {
  return await this.findOne({
    where: {
      refresh_token: refreshToken,
      is_revoked: false,
      refresh_expires: { [Op.gt]: new Date() },
    },
  });
};

Session.revokeToken = async function (refreshToken) {
  return await this.update(
    { is_revoked: true },
    { where: { refresh_token: refreshToken } }
  );
};

Session.revokeAllUserSessions = async function (userId) {
  return await this.update(
    { is_revoked: true },
    { where: { user_id: userId, is_revoked: false } }
  );
};

Session.cleanupExpiredSessions = async function () {
  return await this.destroy({
    where: {
      [Op.or]: [
        { refresh_expires: { [Op.lt]: new Date() } },
        { is_revoked: true },
      ],
    },
  });
};

Session.prototype.revoke = async function () {
  return await this.destroy();
};

Session.prototype.isValid = function () {
  return !this.is_revoked && new Date() < this.refresh_expires;
};

export default Session;
