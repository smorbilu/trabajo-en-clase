"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class UserProfile extends sequelize_1.Model {
}
exports.UserProfile = UserProfile;
UserProfile.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "user_profile",
    timestamps: false
});
