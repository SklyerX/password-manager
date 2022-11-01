import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  Name: { type: String, required: true, unique: true },
});

const name = 'tags';

export default mongoose.models[name] || mongoose.model(name, schema);
