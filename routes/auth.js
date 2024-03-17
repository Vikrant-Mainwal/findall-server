const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    password: 
      req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    isAdmin: req.body.isAdmin,
    img: req.body.img,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log("Body data ",req.body)
    const user = await User.findOne({ username: req.body.username });
    console.log(user)
    !user && res.status(401).json("No user found!");

    // const hashedPassword = CryptoJS.AES.decrypt(
    //   user.password,
    //   process.env.PASS_SECRET
    // );

    // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    
    user.password !== req.body.password &&
      res.status(401).json("Wrong credentials!");
       console.log("reached")
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    )
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
    
  }

});

module.exports = router;
