// connecting backend with database mongodb using the mongoose
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://mernproject1:882229mernproject1@cluster0.0kvoegm.mongodb.net/foodwebmern?retryWrites=true&w=majority' //? is sy database ka name likhna hai

// above link is in -> atlas -> database -> connect -> connect your application -> copy link and change password 
const mongoDB = () => { //funtion
     mongoose.connect(mongoURI, {useNewUrlParser: true},async(err,result) => { // ()=> arrow function
        if(err) console.log("---",err)
        else{
        console.log("connected ");//display output
        
        //Read / Fetch data from database
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray( async function(err, data){ // empty curly k through sara data fetch kr ley ga

            const foodCategory = await mongoose.connection.db.collection("foodCategory"); // food item and category ko aik sth call krwa rhy
            foodCategory.find({}).toArray(function (err, catData){
                if(err)console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;

                }

            })
            //     if(err)console.log(err);
        //    else {

        //     global.food_items = data;
        //     //console.log(global.food_items) comment short key (cntrl + k + c)
            
        //    }
        })        
        
    }
    });
}
module.exports = mongoDB;
