import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordCode: {
      type: String,
      required: false,
    },
    config: {
      theme: {
        type: String,
        default: 'system',
      },
      font: {
        type: String,
        default: 'default',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
