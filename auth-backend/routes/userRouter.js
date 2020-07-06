const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // Validation

    if (!email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 6 characters long. " });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });

    // Promise that will look for user in database

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    // Check for null & undefined

    if (!displayName) displayName = email

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    })
    const savedUser = await newUser.save()
    res.json(savedUser)

  } catch (err) {
    res.status(500).json({ error: err.message }); // Internal server error and give it to front end
  }
});

module.exports = router;
