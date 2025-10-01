import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    note_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
