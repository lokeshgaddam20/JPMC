const jwt=require('jsonwebtoken');
const ex=require('express')
const app=ex();
const secret="secret";

app.get('/login',(req,res)=>{
    const user={
        uname:"sohan",
        pass:"cvr123"
    }

    jwt.sign({user},secret,(err,token)=>{
        res.status(200).json({token});
    });
})

function verifyJWT(req,res,next){
    console.log(req.headers); 
    token=req.headers.authorization.split(' ')[1];
    req.token=token;

    next();
}

app.get('/profile',verifyJWT,(req,res)=>{
    console.log(req.token);
    jwt.verify(req.token,secret,(err,data)=>{
        if(!err){
            res.status(200).json({message:"Profile Accessed"});
        } else {    
            res.status(401).json({message:"YOU ARE NOT AUTHORIZED!!!!"});
        }
    });
});

app.listen(2000,()=>{
    console.log("Server is listening in 2000");
})