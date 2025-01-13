const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
});

userSchema.pre('save', async function (next){
    const user = this;
    if(!user.isModified('password')) return next();
    
    try {
        const hashedpassword = await bcrypt.hash(this.password, 10);
        user.password = hashedpassword;
        next();
    } catch(e){
        return next(e);
    }
    });

    const User = mongoose.model('User', userSchema);
    
    module.exports = User;
    