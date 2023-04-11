const mongoose = require('mongoose')
const mongoURI = 'mongodb://<!#@!#@>:"!@!@"@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/Customer?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true }, async (err, result) => {
  
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("user");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            }
            );
        }
    })
};