import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: function () {
            return this.authMethod !== 'google';
        }
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        required: function () {
            return this.authMethod === 'email';
        }
    },
    social_Id: {
        type: String,
        unique: true,
        sparse: true
    },
    social_Provider: {
        type: String,
        enum: ['google', 'apple', 'facebook'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    authMethod: {
        type: String,
        enum: ['email', 'google', 'apple', 'facebook'],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
});

UsersSchema.index({ email: 1, authMethod: 1 }, { unique: true });

export const User = mongoose.model('User', UsersSchema);
