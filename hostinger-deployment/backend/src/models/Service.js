import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
    name: { type: String, required: true },
  // password: { type: String, required: true }, 
  technology: { type: String, required: true },
  service: { type: String, required: true },
  // serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  bookingDate: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
export const Booking = mongoose.model("Booking", bookingSchema); 

const Service = mongoose.model('Service', serviceSchema);
// const Booking = mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);

export { Service, User };

