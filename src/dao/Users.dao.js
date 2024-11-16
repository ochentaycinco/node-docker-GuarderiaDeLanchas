const {userModel}=require("./models/User.js")

class Users {

    get = (params) => {
        return userModel.find(params)
    }
    getByOne = (params) => {
        return userModel.findOne(params)
    }
    save = (doc) => {
        return userModel.create(doc)
    }
    update = (id, doc) => {
        return userModel.findOneAndUpdate({_id: id}, { $set: doc })
    }
    delete = (id) => {
        return userModel.findByIdAndDelete(id)
    }
}

module.exports = {
    Users
 }