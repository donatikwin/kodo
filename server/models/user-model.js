
const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  username: { type: String, unique: true, required: true },
  isActivated: {type: Boolean, default: true},
  activationLink: {type: String},
})

module.exports = model('User', UserSchema);