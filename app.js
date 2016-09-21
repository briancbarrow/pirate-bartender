$(document).ready(function() {
  // var Pantry = function(strong, salty, bitter, sweetness, fruity) {
  //   this.strong = strong;
  //   this.salty = salty;
  //   this.bitter = bitter;
  //   this.sweetness = sweetness;
  //   this.fruity = fruity;
  // };

  var Pantry = function() {
    this.ingredients = {};
    this.addToPantry = function(ingredient) {
      if(this.ingredients[ingredient.type]) {
        if(Array.isArray(ingredient.name)) {
          for(i = 0; i < ingredient.name.length; i++){
            this.ingredients[ingredient.type].push(ingredient.name[i]);
          }
        } else {
          this.ingredients[ingredient.type].push(ingredient.name);
        }
      } else {
        this.ingredients[ingredient.type] = [ingredient.name];
      }
    }
  };

  var Ingredient = function(type, name) {
    this.type = type;
    this.name = name;
  }

  // Pantry.prototype.addToPantry = function(ingredient, type) {
  //     if(this[type]) {
  //       this[type].push(ingredient);
  //     } else {
  //       this[type] = new Ingredients([ingredient]);
  //     }
  //   };

  // var Ingredients = function(ingredients) {
  //   this.ingredients = ingredients;
  // }

  var Questions = function(pantry, typeArr) {
    this.questions = {};
    for(i = 0; i < typeArr.length; i++) {
      this.questions[typeArr[i]] = [];
      this.questions[typeArr[i]].push('Do you like your drink ' + typeArr[i]);
    }
      // for(property in pantry.ingredients) {
      //   this.questions[property] = [];
      //   // this.questions.type = [];
      //   this.questions[property].push('Do you like your drink ' + property);
      // };
  };

  var Drink = function(ingredients) {
    this.adjectives = ['Limey', 'Ruthless', 'Marooned', 'Pillaging', 'Swashbuckling'];
    this.nouns = ['Walk the Plank', 'Ruffian', 'Treasure Island', 'Galleon', 'Port'];
    var randNumAdj = Math.floor(Math.random() * length);
    var randNumNoun = Math.floor(Math.random() * length);
    var drink = '"' + this.adjectives[randNumAdj] + ' ' + this.nouns[randNumNoun] + '"';
    // console.log(drink)
    $('#question').text('Enjoy yer ' + drink);
  };

  var Preferences = function() {
    this.preferences = [];
    this.addPreference = function(preference) {
      this.preferences.push(preference);
    };
  }

  var Bartender = function(pantry, typeArr) {
    this.ingredients = {};
    for(i = 0; i < typeArr.length; i++) {
      this.ingredients[typeArr[i]] = [];
      // this.ingredients[typeArr[i]].push(pantry.ingredients[typeArr[i]])
      this.ingredients[typeArr[i]] = pantry.ingredients[typeArr[i]]
    }
    var questionCounter = 0;
    this.questions = new Questions(pantry, typeArr)
    this.renderQuestion = function() {
      if(this.questionCounter < Object.keys(this.questions).length) {
        $('#question').text(this.questions[this.questionCounter].question);
      }
    };
  }

  var strongIngredients = new Ingredient('strong', ['Glug of rum', 'slug of whisky', 'splash of gin']);
  var saltyIngredients = new Ingredient('salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  var bitterIngredients = new Ingredient('bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  var sweetIngredients = new Ingredient('sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']);
  var fruityIngredients = new Ingredient('fruity', ['Slice of orange', 'dash of cassis', 'cherry on top']);

  var myPantry = new Pantry();
  myPantry.addToPantry(strongIngredients);
  myPantry.addToPantry(saltyIngredients);
  myPantry.addToPantry(bitterIngredients);
  myPantry.addToPantry(sweetIngredients);
  myPantry.addToPantry(fruityIngredients);
  console.log(myPantry)
  // console.log(myPantry.ingredients.bitter[0])

  // var myQuestions = new Questions(myPantry, ['strong', 'bitter', 'fruity']);
  // console.log(Object.keys(myQuestions.questions).length);

  var bartender = new Bartender(myPantry, ['strong', 'salty', 'bitter', 'sweet', 'fruity']);
  console.log(bartender.questions)
  // var myPreferences = new Preferences();

  $('#yes').click(function(){
    var name = bartender.questions[questionCounter].name;    
    var length = myPantry[name].ingredients.length;
    var randNum = Math.floor(Math.random() * length);
    myPreferences.addPreference(myPantry[name].ingredients[randNum]);
    console.log(myQuestions.questions[myQuestions.counter].name);
    console.log(myPreferences.preferences.length)
    myQuestions.counter++;
    if(myQuestions.counter >= myQuestions.questions.length) {
      $('button').hide();
      bartender.makeDrink(myPreferences.preferences.length)
    } else {
      bartender.renderQuestion();
    }    
  });
  $('#no').click(function(){
    myQuestions.counter++;
    if(myQuestions.counter >= myQuestions.questions.length) {
      $('button').hide();
      bartender.makeDrink(myPreferences.preferences.length)
    } else {
      bartender.renderQuestion();
    }
  });
  
  // myPantry.addToPantry('water', 'test')
  bartender.renderQuestion();
  // console.log(myPreferences)

});