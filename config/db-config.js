const mongoose = require('mongoose')
const password = process.env.PASSWORD



const MONGOURI = `mongodb+srv://vladdic:gJClsn7LJ988qc6z@cluster0-aidmt.mongodb.net/test?retryWrites=true&w=majority`

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true 
        })
        console.log('Connected to DB !!!')
    } catch (error) {
        console.log(error)
        throw error 
    }
}



module.exports = InitiateMongoServer 
