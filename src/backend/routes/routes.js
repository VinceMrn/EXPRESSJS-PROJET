const express = require("express");
const { users, generateToken } = require("../auth/auth");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../config/database");
const multer = require("multer");
const path = require("path");

// Middleware auth
const authenticateToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, "votre_secret", async (err, user) => {
        if (err) return res.sendStatus(403);
        const dbUser = await User.findByPk(user.id);
        if (dbUser?.isBanned) return res.status(403).send("Utilisateur banni");

        req.user = user;
        next();
    });
};

// Multer
const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });

// Test
router.get("/test", (req, res) => res.send("hello"));

// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).send(info.message);

        const dbUser = await User.findByPk(user.id);
        if (dbUser?.isBanned) return res.status(403).send("Utilisateur banni");

        res.send({ token: generateToken(user) });
    })(req, res, next);
});

// Register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { password: hashedPassword, isAdmin: false },
    });

    created ? res.status(201).send("Utilisateur enregistré") : res.status(400).send("L'utilisateur existe déja");
});

// Profil
router.get("/profil", authenticateToken, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé");

    const { password, ...userInfo } = user.dataValues;
    res.send(userInfo);
});

// Upload un fichier
router.post("/add-file", authenticateToken, upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: "Aucun fichier upload" });

    res.json({
        success: true,
        message: "Fichier upload",
        file: req.file,
    });
});

module.exports = router;
