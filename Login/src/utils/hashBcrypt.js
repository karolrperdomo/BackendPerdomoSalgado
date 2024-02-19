import bcrypt from 'bcrypt';

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (password, passwordUser) => {
    console.log(password, passwordUser)
    return bcrypt.compareSync(password, passwordUser)
}

export default {
    createHash,
    isValidPassword
};