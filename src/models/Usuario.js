import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin','manager','employee'], required: true }
});


usuarioSchema.methods.isCorrectPassword = async function (password, hash) {
  
  const same = await bcrypt.compare(password, hash);

  return same;
};

usuarioSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
})
  
const Usuario = mongoose.model('Usuario', usuarioSchema);
  
export default Usuario