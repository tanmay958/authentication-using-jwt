const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const jwt =  require("jsonwebtoken")

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
}

module.exports = UserService;