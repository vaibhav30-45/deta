// createAdmin.js - Script to create default admin user
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/detagenix';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('📦 Connected to MongoDB');
    
    const exists = await Admin.findOne({ email: 'admin@detagenix.com' });
    
    if (!exists) {
      await Admin.create({
        email: 'admin@detagenix.com',
        password: 'Atarsen101@'
      });
      console.log('✅ Admin account created successfully!');
      console.log('📧 Email: admin@detagenix.com');
      console.log('🔑 Password: Atarsen101@');
    } else {
      console.log('ℹ️  Admin account already exists');
      console.log('📧 Email: admin@detagenix.com');
      console.log('🔑 Password: Atarsen101@');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
