import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    lastEdited: {
      type: Date,
      default: Date.now,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
