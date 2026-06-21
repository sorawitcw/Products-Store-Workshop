// const jwt = require("jsonwebtoken")

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token" })
//   }

//   const token = authHeader.split(" ")[1]

//   try {
//     const decoded = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OWMxM2U0MTUwODFiMGRjODE2Y2RiNyIsInVzZXJuYW1lIjoiZGVrdSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcyMDE0NTgwLCJleHAiOjE3NzIxMDA5ODB9.ReWcTBpSOEqYbHqYZr9IyU5OBXLzS48XfNrGt0GeYVM")
//     req.user = decoded
//     next()
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" })
//   }
// }

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "No token" })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    )

    req.user = decoded
    next()

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }

}