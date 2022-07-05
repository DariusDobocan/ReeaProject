const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

const userSchema2 = new Schema({
  username: {type: String,
    required: true
  },
  password: {type: String,
    required: true
  },
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
mongoose.model('users2', userSchema2);
