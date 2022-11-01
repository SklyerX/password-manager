import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  Name: String,
  Base64: String,
  Id: Number,
});

const name = 'attachments';

export default mongoose.models[name] || mongoose.model(name, schema);
