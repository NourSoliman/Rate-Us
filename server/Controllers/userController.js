const express = require(`express`);
const router = express.Router();
const bcrypt = require(`bcrypt`);
const User = require(`../models/User`);
const jwt = require(`jsonwebtoken`);
const otp = require(`otp-generator`);
const nodemailer = require(`nodemailer`);
const mailgen = require(`mailgen`);
//MiddleWare to Verify UserName
async function verifyUser(req, res, next) {
  try {
    const { userName } = req.method == "GET" ? req.query : req.body;
    let exist = await User.findOne({ userName });
    if (!exist) return res.status(500).send({ error: `Cannot find User` });
    next();
  } catch (error) {
    res.status(404).send({ error: `User Not Found!` });
  }
}
// POST REGISTER ROUTER
// async function register(req, res, next) {
//   try {
//     const {
//       userName,
//       email,
//       password,
//       confirmPassword,
//       profile,
//       gender,
//       dayOfBirth,
//       monthOfBirth,
//       yearOfBirth,
//     } = req.body;
//     // check existUserName
//     const existUserName = new Promise((resolve, reject) => {
//       User.findOne({ userName })
//         .then((existUserName) => {
//           if (existUserName) {
//             reject({ error: `This User-Name already Exist` });
//           } else {
//             resolve();
//           }
//         })
//         .catch((error) => reject(new Error(error)));
//     });
//     //Check existEmail
//     const existEmail = new Promise((resolve, reject) => {
//       User.findOne({ email })
//         .then((existEmail) => {
//           if (existEmail) {
//             reject({ error: `This Email Already Exist` });
//           } else {
//             resolve();
//           }
//         })
//         .catch((error) => reject(new Error(error)));
//     });
//     Promise.all([existUserName, existEmail])
//       .then(() => {
//         if (password !== confirmPassword) {
//           return res
//             .status(400)
//             .send({ error: "Password and confirmPassword should match" });
//         }
//         bcrypt
//           .hash(password, 10)
//           .then((hashedPassword) => {
//             const user = new User({
//               userName,
//               password: hashedPassword,
//               email,
//               confirmPassword: hashedPassword,
//               gender,
//               profile,
//               role: `user`,
//               dayOfBirth,
//               monthOfBirth,
//               yearOfBirth,
//             });
//             const verificationToken = jwt.sign(
//               { email },
//               process.env.JWT_SECRET,
//               {
//                 expiresIn: "24h",
//               }
//             );
//             const ReactURL = process.env.REACT_APP_VERCEL_URL
//             user
//               .save()
//               .then((result) => {
//                 // res.status(201).send({msg:`User Created SuccessFully, You will receive an email soon!`})
//                 const transporter = nodemailer.createTransport({
//                   service: "gmail",
//                   auth: {
//                     user: process.env.EMAIL,
//                     pass: process.env.PASSWORD,
//                   },
//                 });
//                 const mailOptions = {
//                   from: `Rate Website`,
//                   to: email,
//                   subject: `Email Verification`,
//                   html: `<p>Please click on the following link to verify your email: <a href="${ReactURL}/api/verify-email?token=${verificationToken}">Verify Email</a></p>`,
//                 };
//                 transporter.sendMail(mailOptions, (error, info) => {
//                   if (error) {
//                     console.log(`error sending verification email`, error);
//                   } else {
//                     console.log("Verification email sent:", info.response);
//                   }
//                 });
//                 res.status(201).send({
//                   msg: "User Created Successfully, You will receive an email for verification",
//                 });
//                 next();
//               })
//               .catch((error) => console.log(error));
//           })
//           .catch((error) => {
//             return res.status(500).send({
//               error: `User Created Failed`,
//             });
//           });
//       })
//       .catch((error) => {
//         return res.status(500).send(error);
//       });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// }
//changed promise to async and await
async function register(req, res, next) {
  try {
    const {
      userName,
      email,
      password,
      confirmPassword,
      profile,
      gender,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
    } = req.body;

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).send({ error: 'This User-Name already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: 'This Email already exists' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ error: 'Password and confirmPassword should match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userName,
      password: hashedPassword,
      email,
      confirmPassword: hashedPassword,
      gender,
      profile,
      role: 'user',
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
    });

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const ReactURL=process.env.REACT_APP_VERCEL_URL
    const mailOptions = {
      from: 'Rate Website',
      to: email,
      subject: 'Email Verification',
      html: `<p>Please click on the following link to verify your email: <a href="${ReactURL}/api/verify-email?token=${verificationToken}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(201).send({
      msg: 'User Created Successfully, You will receive an email for verification',
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

// POST Login ROUTER
async function login(req, res) {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(500).send({ error: "This UserName does not exist!" });
    }
    if (!user.verified) {
      return res.status(500).send({ error: `Please Verify Your Email First!` });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(500).send({ error: "Please enter a valid Password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: user.role,
        email: user.email,
        gender: user.gender,
        age: user.age,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    return res.status(201).send({
      msg: "Login Successful..",
      token,
      userName: user.userName,
      creationDate: user.creationDate,
      email: user.email,
      verified: user.verified,
      gender: user.gender,
      role: user.role,
      age: user.age,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
//Logout route
async function logout(req, res) {
  try {
    // Clear token from cookies
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
    });

    return res.status(200).send({ msg: "Logout Successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
// Get GetUser ROUTER
async function getUser(req, res) {
  const { userName } = req.params;
  try {
    if (!userName) {
      return res.status(500).send({ error: `invaild UserName` });
    }
    const user = await User.findOne({ userName });
    if (!user) return res.status(500).send({ error: `Cannot find User` });
    //Remove password and confirmPassword from the data of User
    const { password, confirmPassword, ...rest } = Object.assign(
      {},
      user.toJSON()
    );
    // const { password, confirmPassword, ...userData } = Object.assign({}, user.toJSON())
    rest.age = user.age;
    return res.status(201).send(...rest);
  } catch (error) {
    return res.status(404).send({ error: `Couldn't find User Data` });
    // console.log(error)
  }
}
//allow people to visit each other profiles

async function getUserProfile(req, res) {
  const { userName } = req.params;
  try {
    if (!userName) {
      return res.status(500).json({ error: `Invalid UserName` });
    }
    const user = await User.findOne({ userName }).populate({
      path: "comments",
      populate: { path: "store" }, // Populate the store field within each comment
    });

    if (!user) {
      return res.status(500).json({ error: "cannot find user" });
    }
    const { comments, name, age, gender, creationDate } = user;

    return res
      .status(201)
      .send({
        comments,
        name,
        age,
        commentCount: comments.length,
        gender,
        creationDate,
      });
  } catch (error) {
    return res.status(500).json({ error: `Couldnt find User Profile` });
  }
}
//  PUT updateUser ROUTER
async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (userId !== undefined && userId !== ` `) {
      const body = req.body;
      await User.updateOne({ _id: userId }, body);
      res.status(201).send({ msg: `user Updated..` });
    } else {
      res.status(401).send({ error: `User Not Found...` });
    }
  } catch (error) {
    res.status(404).send({ error });
  }
}
async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    // const token = req.query.token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).send({ error: `User Not Found` });
    }
    user.verified = true;
    await user.save();
    // return res.status(200).send({ success: true });
    res.redirect(`http://localhost:3000/#/verify-email/${token}`);
    //Render
    // res.redirect(`https://rateus.onrender.com/#/verify-email/${token}`)
  } catch (error) {
    console.log(error);
    // return res.status(400).send({ error: `Invailed or Expired Token` })
  }
}
// //redirect user when OTP is valid
async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "access Granted" });
  }
  return res.status(440).send({ error: "session expired" });
}
// Change password page
async function changePassword(req, res) {
  const { userName } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // if(!req.app.locals.resetSession) return res.status(500).send({error:`Session Expired`})
    const user = await User.findOne({ userName });

    if (!user) {
      console.log(`error`);
      return res.status(500).send({ error: "userName not found" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(500)
        .send({ error: `NewPassword and Confirm Password Should Match!` });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      console.log(`error2`);
      return res.status(500).send({ error: `Invaild Current Password!` });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(201).send({ msg: "Password Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Cannot reset password" });
  }
}
module.exports = {
  register,
  login,
  verifyUser,
  getUser,
  updateUser,
  createResetSession,
  changePassword,
  verifyEmail,
  logout,
  getUserProfile,
};
