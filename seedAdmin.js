


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Admin = require('./models/Admin');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash(process.env.ADMIN_PASS, 10);
  await Admin.deleteMany({});
  await Admin.create({ username: process.env.ADMIN_USER, password: hashed });
  console.log("✅ Admin user created:", process.env.ADMIN_USER);
  mongoose.disconnect();
}

seed();

