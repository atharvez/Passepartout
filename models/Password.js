import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Password = mongoose.models.Password || mongoose.model('Password', PasswordSchema);

export default Password;
