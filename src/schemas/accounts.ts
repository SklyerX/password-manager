import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  Username: String,
  Password: String,
  Email: String,
  Token: Object,
  SudoPermArray: Array,
});

const name = 'accounts';

export default mongoose.models[name] || mongoose.model(name, schema);
