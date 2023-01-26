const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    email: {
        type: String, unique: true, required: true
    },
    password: {
        type: String, required: true
    },
    username: {
        type: String, required: true, unique: true
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    ID: {
        type: Number, required: true
    },
    city: {
        type: String, required: true
    },
    street: {
        type: String, required: true
    },
    admin: {
        type: Boolean, default: false, 
    }
})

// hash the password
userSchema.pre('save', function (next) {
    const user = this
    !user.isModified('password') ? next() : null
    bcrypt.genSalt(10, (err, salt) => {
        err ? next(err) : null
        bcrypt.hash(user.password, salt, (err, hash) => {
            err ? next(err) : null
            user.password = hash
            next()
        })
    })
})

//compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            err ? reject(err) : null
            !isMatch ? reject(false) : null
            resolve(true)
        })
    })
}
mongoose.model('User', userSchema)