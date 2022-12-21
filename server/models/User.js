const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// user: id, username, email, password, 
//     [recipes: id, recipeName, img, likes, tags, prepTime, servings, [ingredients], [directions],
//         [poaches: id, recipeName, likes, tags, serving,  prepTime, [ingredients], [directions]]
//     collections: {name: [recipes: id, recipeName, img, likes, tags, prepTime, servings, [ingredients], [directions],
//         [poaches: id, recipeName, likes, tags, serving,  prepTime, [ingredients], [directions]]]}]

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 12,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 20
  },
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;