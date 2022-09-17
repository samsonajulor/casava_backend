import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Enter your first name'],
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Enter your last name'],
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    max: 50,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    unique: true,
  },
  isVerified: Boolean,
  password: {
    type: String,
    min: 5,
    max: 200,
  },
  gender: String,
  accountId: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  friends: {
    type: [
      {
        email: String,
        isFavorite: {
          type: Boolean,
          default: false,
        },
        fullName: String,
      },
    ],
  },
});

//Adding the text index to the schema will enable us to use the $text to search for words
UserSchema.index({ request: 'text' });

export default model('User', UserSchema);
