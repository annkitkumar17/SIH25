// ✅ Import required modules
const user = require('../model/user'); // not needed since 'User' is already imported below
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Mongoose model for User
const bcrypt = require('bcryptjs'); // for hashing and comparing passwords

// 🔐 Register Controller
const registerUser = async (req, res) => {
  try {
    // 📝 Extract data from request body
    const { username, email, password, role } = req.body;

    // 🔍 Check if username or email already exists in database
    const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please try with another username or email."
      });
    }

    // 🔒 Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🆕 Create a new user with hashed password and default role as 'user' if not provided
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // 💾 Save the user to database
    await newlyCreatedUser.save();

    // ✅ Respond with success if user saved properly
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          username: newlyCreatedUser.username,
          email: newlyCreatedUser.email,
          role: newlyCreatedUser.role,
        },
      });
    } else {
      // ❌ Failed to create user
      res.status(400).json({
        success: false,
        message: 'User registration failed'
      });
    }
  } catch (e) {
    // ⚠️ Internal server error
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};



// 🔐 Login Controller
const loginUser = async (req, res) => {
  try {
    // 📝 Extract login credentials
    const { username, password } = req.body;

    // 🔍 Find the user by username
    const user = await User.findOne({ username });

    // ❌ If user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User"
      });
    }

    // 🔐 Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      // ❌ Wrong password
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password"
      });
    }

    // ✅ Generate JWT token for authenticated user
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h' // 🕒 Token valid for 2 hours
    });

    // 🎉 Send token to user
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken
    });

  } catch (e) {
    // ⚠️ Handle unexpected errors
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

// 📦 Export both controllers for use in route files
module.exports = { registerUser, loginUser };
