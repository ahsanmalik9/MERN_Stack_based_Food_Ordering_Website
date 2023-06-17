const express = require('express')
const router = express.Router(); 
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require ("bcryptjs");

const jwtSecret = "Mynameisahsanmalikseekmernstak#";

router.post("/createuser", [
  // Validation
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect Password').isLength({ min: 5 })],
  async (req, res) => {

    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // BCRYPT SALT

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt) //secPassword means secure password


    try {
      await User.create({

      
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      })

      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.json({ success: false }); //ye tb chaly ga jb end point hit kr k response wapis laye ga
    }
  })

router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 })]

  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({email});
      if (!userData) {
        return res.status(400).json({ errors: "Entered Email is wrong" })
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password) 
      if (!pwdCompare)
      {
        return res.status(400).json({ errors: "Entered Password is wrong" })
      }
      
      const data = {
        user:{
          id:userData.id 
        }
      }

      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true, authToken:authToken }); 


      //res.json({success:true});
    }
    catch (error) {
      console.log(error)
      res.json({ success: false }); //ye tb chaly ga jb end point hit kr k response wapis laye ga
    }
  })

module.exports = router;
