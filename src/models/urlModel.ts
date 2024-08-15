import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  urlCode: { type: String, required: true, unique: true },
  qrCode: { type: String },
  date: { type: Date, default: Date.now }, // Fix here
  clicks: { type: Number, default: 0 },
  clickDetails: [
    {
      ip: String,
      country: String,
      city: String,
      clickedAt: { type: Date, default: Date.now },
    },
  ],
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
