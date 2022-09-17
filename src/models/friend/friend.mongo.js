import { Schema, model } from 'mongoose';

const FriendSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'full name is required'],
    min: 3,
    max: 20,
  },
  canViewStatus: {
    type: String,
    trim: true,
    required: [true, 'canViewStatus is required'],
  },
  isFavorite: {
    type: String,
    trim: true,
    required: [true, 'isFavorite is required'],
  },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Friend', FriendSchema);
