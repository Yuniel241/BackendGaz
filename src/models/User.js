const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est obligatoire"]
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Veuillez entrer un email valide"
        ]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "controller", "driver"],
        default: "driver"
    }
}, { timestamps: true });

//  Hachage du mot de passe avant sauvegarde
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);
