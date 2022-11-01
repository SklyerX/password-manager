import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  AppIcon: String,
  Name: String,
  Username: Object,
  Password: Object,
  Url: String,
  Id: Number,
});

const name = 'favourites';

export default mongoose.models[name] || mongoose.model(name, schema);
