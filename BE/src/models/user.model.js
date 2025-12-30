import { DataTypes, Op } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
      validate: {
        isIn: [["user", "editor", "admin"]],
      },
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verification_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    otp_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.otp;
  delete values.verification_token;
  return values;
};

User.findByEmail = async function (email) {
  return await this.findOne({ where: { email } });
};

User.findByUsername = async function (username) {
  return await this.findOne({ where: { username } });
};

User.findByEmailOrUsername = async function (email, username) {
  return await this.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
};

User.findByVerificationToken = async function (token) {
  return await this.findOne({
    where: { verification_token: token },
  });
};

User.findByValidOTP = async function (email, otp) {
  return await this.findOne({
    where: {
      email,
      otp,
      otp_expires: { [Op.gt]: new Date() },
    },
  });
};

User.findByEmailAndOTP = async function (email, otp) {
  return await this.findOne({
    where: { email, otp },
  });
};

User.createWithVerification = async function (
  userData,
  verificationToken,
  verificationTokenExpires
) {
  return await this.create({
    ...userData,
    verification_token: verificationToken,
    verification_token_expires: verificationTokenExpires,
  });
};

User.prototype.verifyEmail = async function () {
  this.email_verified = true;
  this.verification_token = null;
  this.verification_token_expires = null;
  return await this.save();
};

User.prototype.updateVerificationToken = async function (token, expires) {
  this.verification_token = token;
  this.verification_token_expires = expires;
  return await this.save();
};

User.prototype.setOTP = async function (otp, expires) {
  this.otp = otp;
  this.otp_expires = expires;
  return await this.save();
};

User.prototype.clearOTPAndLogin = async function () {
  this.otp = null;
  this.otp_expires = null;
  this.last_login = new Date();
  return await this.save();
};

export default User;
