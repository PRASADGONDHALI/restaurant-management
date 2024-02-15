const bcrypt=require('bcrypt');

exports.hashPassword = async (password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
    }
}
exports.comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}