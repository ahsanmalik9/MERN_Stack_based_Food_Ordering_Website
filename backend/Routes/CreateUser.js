const express = require('express')
const router = express.Router(); //calling
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");// will be generated in login
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

        // ------------ this is the data send by thunder client (body) ----------
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,

        // ------------ this is the static data that we add ----------
        //name:"malak jee",
        //password:"123456",
        //email:"malakjee123@gmail.com",
        //location:"Rawalpindi"
      })

      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.json({ success: false }); //ye tb chaly ga jb end point hit kr k response wapis laye ga
    }
  })

//check / match user email and password
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

      // Bcrypt compare orignal password with enrypted hash
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password) 
      if (!pwdCompare)
      {
        return res.status(400).json({ errors: "Entered Password is wrong" })
      }
      
      // if (req.body.password !== userData.password) {
      //   return res.status(400).json({ errors: "Entered Password is wrong" })
      // }


      // Take id from mongodb (Data is work as the payload in jwt), Header by default ho ga, and Secret b add kr diya hai
      const data = {
        user:{
          id:userData.id 
        }
      }

      //JWT SIGN
      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true, authToken:authToken }); // yaha py hm expiry date b add kr skty taky dubara login credentials mangy if login after a long time


      //res.json({success:true});
    }
    catch (error) {
      console.log(error)
      res.json({ success: false }); //ye tb chaly ga jb end point hit kr k response wapis laye ga
    }
  })

module.exports = router;