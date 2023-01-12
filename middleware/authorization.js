const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  try {
    //    import token
    // headers=> authorization
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }
    // you are not authorized
    // on doit verifie si token est valide
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // test if the user exist with that id
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    // you are not authorised
    if (!user) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }

    // si non
    req.user = user;
    // next
    next();
  } catch (error) {
    res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = Auth;
