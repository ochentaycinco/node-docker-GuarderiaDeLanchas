const {vehicleModel} = require("./models/Vehicle.js");

class Vehicle {

    get = (params) =>{
        return vehicleModel.find(params)
    }
    
    getManyByIds = (ids) => {
        return vehicleModel.find({ _id: { $in: ids } })
    }

    getByOne = (params) =>{
        return vehicleModel.findOne(params)
    }
    
    save = (doc) =>{
        return vehicleModel.create(doc)
    }
    update = (id, doc) =>{
        return vehicleModel.findByIdAndUpdate(id,{$set:doc})
    }
    delete = (id) =>{
        return vehicleModel.findByIdAndDelete(id)
    }
}

module.exports = {
    Vehicle
}