$(document).ready(function() {
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

  var Questions = function(pantry, typeArr) {
    this.questions = {};
    for(i = 0; i < typeArr.length; i++) {
      this.questions[typeArr[i]] = 'Do you like your drink ' + typeArr[i];
    }
  };

  var Drink = function(length) {
    this.adjectives = ['Limey', 'Ruthless', 'Marooned', 'Pillaging', 'Swashbuckling'];
    this.nouns = ['Walk the Plank', 'Ruffian', 'Treasure Island', 'Galleon', 'Port'];
    var randNumAdj = Math.floor(Math.random() * length);
    var randNumNoun = Math.floor(Math.random() * length);
    var drink = '"' + this.adjectives[randNumAdj] + ' ' + this.nouns[randNumNoun] + '"';
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
      this.ingredients[typeArr[i]] = pantry.ingredients[typeArr[i]]
    }
    this.questionCounter = 0;
    this.questionList = new Questions(pantry, typeArr)
    this.questionsLength = Object.keys(this.questionList.questions).length
    this.propertyArray = Object.keys(this.questionList.questions)
    this.renderQuestion = function() {
      this.name = this.propertyArray[this.questionCounter];
      if(this.questionCounter < Object.keys(this.questionList.questions).length) {
        $('#question').text(this.questionList.questions[typeArr[this.questionCounter]]);
      }
    };
    this.makeDrink = function(preferencesLength) {
      new Drink(preferencesLength);
    }
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

  var bartender = new Bartender(myPantry, ['strong', 'salty', 'bitter', 'sweet', 'fruity']);
  var myPreferences = new Preferences();

  $('#yes').click(function(){
    var name = bartender.name;  
    var ingLength = Object.keys(bartender.ingredients).length;
    
    var randNum = Math.floor(Math.random() * ingLength);
    myPreferences.addPreference(bartender.ingredients[name][0][randNum]);
    bartender.questionCounter++;
    if(bartender.questionCounter >= bartender.questionsLength) {
      $('button').hide();
      bartender.makeDrink(myPreferences.preferences.length)
    } else {
      bartender.renderQuestion();
    }    
  });
  $('#no').click(function(){
    bartender.questionCounter++;
    if(bartender.questionCounter >= bartender.questionsLength) {
      $('button').hide();
      bartender.makeDrink(myPreferences.preferences.length)
    } else {
      bartender.renderQuestion();
    }
  });
  
  bartender.renderQuestion();

});