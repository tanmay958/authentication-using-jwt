const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const jwt =  require("jsonwebtoken")
const bcrypt =  require("bcrypt");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
    async createToken(user)
    {
        try{
            const token  = await  jwt.sign({email :  user.email , id :  user.id},JWT_KEY,{expiresIn: '1d'});
            return token;
        }
        catch(error)
        {
            console.log("error in token creation");
            throw {error};
        }
    }
    async verifyToken(token)
    {
        try {
            const response =  await jwt.verify(token,JWT_KEY);
            return response;// it contains the decrypted json
            
        } catch (error) {
            console.log("bad token");
            throw {error};
        }
    }
    async checkPassword(userInputPlainPassword,encryptedPassword)
    {   try{
        return await bcrypt.compare(userInputPlainPassword,encryptedPassword);
        }
        catch(error)
        {
            console.log("error while comparing the password");
            throw {error};
        }
    }


    async signIn(email,plainpassword){
      try
          { //1 -  fetch the user using the email
        const user  =  await this.userRepository.getByEmail(email);
        //copare the passwrod
        const passwordsmatch =  await this.checkPassword(plainpassword,user.password);
        
        if(!passwordsmatch)
        {
            console.log("password doesnt match");
            throw {error:"incorrect passwor"};

        }
        const newJWT =  this.createToken({email:user.email,id:user.id});
        return newJWT;}
        catch(error)
        {
            console.log("something went wrong in signin  service");
            throw  {error};
        }
   
   
   
    }
    async isAuthenticated(token)
    {
        try {
            const response =  jwt.verify(token,JWT_KEY);
            if(!response)
            {
                throw {error : "Invalid token"};
            }
            const user  =   this.userRepository.getById(response.id);
            if(!user)
            {
                throw {error :  "user not found"}
            }
            return user.id;
            
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }

}

module.exports = UserService;