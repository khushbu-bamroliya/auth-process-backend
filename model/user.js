import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  email: String,
  name: String,
  
});

const User = mongoose.model("users", UserSchema);

export default User;