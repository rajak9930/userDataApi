import User from "../Models/clientModel.js";
import bcrypt from "bcrypt";



// export const registerUser = (req, res) => {
//     res.send("Register User");
//   };
// Register a new user
export const registerUser = async (req, res) => {
    try {
      // Log the entire request body to see what is being sent
      console.log("Request Body:", req.body);
  
      const { userName, lastName, email, password, confirmPassword } = req.body;
  
      // Validate required fields
      if (!userName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Validate passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const user = new User({
        userName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
  
      // Save to the database
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      // Handle error
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email or Username already exists" });
      } else {
        return res.status(500).json({ message: "Server Error", error: error.message });
      }
    }
  };
  
