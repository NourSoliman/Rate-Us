const mongoose = require(`mongoose`);
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Provide Unique UserName"],
    unique: [true, `userName Exist`],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: `user`,
  },
  firstName: { type: String },
  LastName: { type: String },
  adress: { type: String },
  profile: { type: String },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  dayOfBirth: {
    type: Number,
    required: true,
  },
  monthOfBirth: {
    type: Number,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
});
userSchema.virtual('age').get(function() {
  const today = new Date();
  const birthDate = new Date(this.yearOfBirth, this.monthOfBirth - 1, this.dayOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
module.exports = mongoose.model(`User`, userSchema);
