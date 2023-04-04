const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://marcel:1234@cluster0.laho3nn.mongodb.net/test';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      title: 'Tortilla de patatas',
      level: 'Easy Peasy',
      ingredients: ['potatoes', 'eggs', 'onion', 'oil'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      image: 'https://www.recetasderechupete.com/wp-content/uploads/2018/05/tortilla-de-patatas.jpg',
      duration: 30,
      creator: 'Marcel Ramsy',
      created: Date.now()
    })
    .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
    Recipe.insertMany(data)
          .then(recipes => recipes.forEach(recipe => console.log(recipe.title)))
      .then(() => {
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
                 .then(() => console.log('The Rigatoni recipe has been updated'))
      })
      .then(() => {
          Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(() => console.log('The Carrot Cake recipe has been deleted'))
      })
  })
  .then(() => {

    mongoose.close()
      .then(() => console.log('The connection to the database has been closed'))
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
