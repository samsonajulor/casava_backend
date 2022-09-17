import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Enter your username'],
    min: 3,
    max: 20,
  },
  status: {
    type: String,
    trim: true,
    required: [true, 'status'],
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Account', AccountSchema);
