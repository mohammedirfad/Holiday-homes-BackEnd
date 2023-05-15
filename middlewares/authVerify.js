import jwt from "jsonwebtoken";


export const generateToken = (userId) => {
  console.log(userId,44111111111)
  const token = jwt.sign({ id: userId,role:userId.role }, process.env.JWT_SECRET_KEY,{expiresIn:"1hr"});
  return token;
};



export const verifyToken = async (req, res, next) => {
  try {
console.log( "rehyeg iu5yovlue9ni6")
    let token = req.header("Authorization");
   
    if (!token) {
      console.log("here is not token");
      return res.status(403).send("Access Denied");
      
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
      console.log("here is token");
    }else{
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(verified," ve");

    if(verified.id.role === "client-Login"){
      console.log(" inside")
   req.user = verified;
    next();
  }
  else{
    res.status(500).json({message: "Authentication  failed : invalid token"})
  }
  } catch (err) {
    console.log("eroor vanuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",err)
    res.status(500).json({ message: err.message });
  }
};



export const AdminverifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log("here1111111111")
   
    if (!token) {
      return res.status(403).send("Access Denied");
      
      
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
      console.log("here333331111")
     
    }else{
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET_KEY);


    console.log(verified,"1232123211111111111111111111111111111111")
   

    if(verified.id.role === "Admin-Login"){

    next();
  }
  else{
    res.status(500).json({message: "Authentication  failed : invalid token"})
  }
  } catch (err) {
    console.log("eroor vanuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",err)
    res.status(500).json({ message: err.message });
  }
};