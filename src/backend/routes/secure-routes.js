const express = require("express");
const { User } = require("../config/database");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware auth
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "votre_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware 
const isAdmin = (req, res, next) => {
  req.user?.isAdmin ? next() : res.sendStatus(403);
};

// Supprimer un utilisateur / admin
router.delete("/users/rm/:id", authenticateToken, isAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("Utilisateur non trouvé");

  await user.destroy();
  res.send("Utilisateur supprimé");
});

// Bloquer un utilisateur / admin
router.post("/users/ban/:id", authenticateToken, isAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("Utilisateur non trouvé");

  user.isBanned = true;
  await user.save();
  res.send("Utilisateur bloqué");
});

// Lister les utilisateurs
router.get("/users/list", authenticateToken, isAdmin, async (req, res) => {
    res.send(await User.findAll());
  });

// Élever un utilisateur / admin
router.post("/user/up/:id", authenticateToken, isAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("Utilisateur non trouvé");

  user.isAdmin = true;
  await user.save();
  res.send("Utilisateur élevé en admin");
});

// Rétrograder un admin / admin
router.post("/user/down/:id", authenticateToken, isAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("Utilisateur non trouvé");

  user.isAdmin = false;
  await user.save();
  res.send("Admin rétrogradé");
});


module.exports = router;
