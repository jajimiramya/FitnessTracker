const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')


//resgiter a user

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, age, height, weight } = req.body; // ✅ Extract all fields properly

        console.log("Received request body:", req.body); // Debugging

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: 'User Already Exists'
            });
        }

        // Validate age, height, and weight
        if (!age || age < 10 || age > 100) {
            return res.status(400).send({ success: false, message: "Age must be between 10 and 100" });
        }
        if (!height || height < 50 || height > 250) {
            return res.status(400).send({ success: false, message: "Height must be between 50cm and 250cm" });
        }
        if (!weight || weight < 20 || weight > 300) {
            return res.status(400).send({ success: false, message: "Weight must be between 20kg and 300kg" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // ✅ Use extracted password
       
        // Create new user
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            age, 
            height, 
            weight 
        });

        await newUser.save();

        res.status(201).send({ success: true, message: "Registration Successful, Please login" });

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});



//login Routes

router.post('/login' , async (req , res)=>{
    const user = await User.findOne({email : req.body.email})
   if(!user){
        return res.send({
            success : false,
            message : 'User does not exist'
        })
    }


    const validPassword = await bcrypt.compare(req.body.password , user.password)
     
    if(!validPassword){
        return res.send({
            success : false,
            message : 'Invalid Password'
        })
    }


    const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn :"30d"})
    

    console.log(token)


   res.send({
        success : true,
        message : 'User Logged in',
        data : token
    })
})

// Get user details by id

router.get('/get-current-user',authMiddleware, async (req , res)=>{
    try {
        const user = await User.findById(req.body.userId).select('-password')

        res.send({
            success : true,
            message : 'User details fetched Successfully',
            data : user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
})

// Get User Profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.body.userId).select("-password");
      res.send({ success: true, data: user });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });


  // Update User Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, req.body, { new: true });
    res.send({ success: true, message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router




