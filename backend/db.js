// connecting backend with database mongodb using the mongoose
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://yourprojectName.yourpassword@cluster0.0kvoegm.mongodb.net/foodwebmern?retryWrites=true&w=majority' //  change url to your db you created in atlas 

const mongoDB = () => { 
     mongoose.connect(mongoURI, {useNewUrlParser: true},async(err,result) => { 
        if(err) console.log("---",err)
        else{
        console.log("connected ");
        
        //Read / Fetch data from database
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray( async function(err, data){ 

            const foodCategory = await mongoose.connection.db.collection("foodCategory"); 
            foodCategory.find({}).toArray(function (err, catData){
                if(err)console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;

                }

            })
        })        
        
    }
    });
}
module.exports = mongoDB;
