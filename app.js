$(document).ready(function() {
  var Pantry = function(strong, salty, bitter, sweetness, fruity) {
    this.strong = strong;
    this.salty = salty;
    this.bitter = bitter;
    this.sweetness = sweetness;
    this.fruity = fruity;
  };
  Pantry.prototype.addToPantry = function(ingredient, name) {
      if(this[name]) {
        this[name].push(ingredient);
      } else {
        this[name] = new Ingredients([ingredient]);
      }
    };

  var Ingredients = function(ingredients) {
    this.ingredients = ingredients;
  }

  var Questions = function(pantry) {
    this.counter = 0;
    this.questions = [
      {
        question: 'Do ye like yer drinks strong?',
        // answer: '',
        name: 'strong'
      },
      {
        question: 'Do ye like it with a salty tang?',
        // answer: '',
        name: 'salty'
      },
      {
        question: 'Are ye a lubber who likes it bitter?',
        // answer: '',
        name: 'bitter'
      },
      {
        question: 'Would ye like a bit of sweeness with yer poison?',
        // answer: '',
        name: 'sweetness'
      },
      {
        question: 'Are ye one for a fruity finish?',
        // answer: '',
        name: 'fruity'
      }
    ];
    this.addQuestion = function(question, name, pantry) {
      this.questions.push({
        question: question,
        // answer: '',
        name: name
      });
      pantry.addToPantry('', name);
    }
    // for(variable in pantry){
    //   if(pantry.hasOwnProperty(variable)) {
    //     var question = "Do ye want yer drink to be " + variable + "?";
    //     this.questions.push({question, answer: '', name: variable});
    //   }
    // }
  }

  var Preferences = function() {
    this.preferences = [];
    this.addPreference = function(preference) {
      this.preferences.push(preference);
    };
  }

  var Drink = function(pantry, questions) {
    this.renderQuestion = function() {
      if(questions.counter < questions.questions.length){
        $('#question').text(myQuestions.questions[myQuestions.counter].question);
      }
    },
    this.adjectives = ['Limey', 'Ruthless', 'Marooned', 'Pillaging', 'Swashbuckling'];
    this.nouns = ['Walk the Plank', 'Ruffian', 'Treasure Island', 'Galleon'];
    this.makeDrink = function(length) {
      var randNumAdj = Math.floor(Math.random() * length);
      var randNumNoun = Math.floor(Math.random() * length);
      var drink = '"' + this.adjectives[randNumAdj] + ' ' + this.nouns[randNumNoun] + '"';
      console.log(drink)
      $('#question').text('Enjoy yer ' + drink);
    }
  }

  var strongIngredients = new Ingredients(['Glug of rum', 'slug of whisky', 'splash of gin']);
  var saltyIngredients = new Ingredients(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  var bitterIngredients = new Ingredients(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  var sweetIngredients = new Ingredients(['Sugar cube', 'spoonful of honey', 'splash of cola']);
  var fruityIngredients = new Ingredients(['Slice of orange', 'dash of cassis', 'cherry on top']);

  var myPantry = new Pantry(strongIngredients, saltyIngredients, bitterIngredients, sweetIngredients, fruityIngredients);

  var myQuestions = new Questions(myPantry);

  var myDrink = new Drink(myPantry, myQuestions);
  var myPreferences = new Preferences();

  $('#yes').click(function(){
    var name = myQuestions.questions[myQuestions.counter].name;    
    var length = myPantry[name].ingredients.length;
    var randNum = Math.floor(Math.random() * length);
    myPreferences.addPreference(myPantry[name].ingredients[randNum]);
    console.log(myQuestions.questions[myQuestions.counter].name);
    console.log(myPreferences.preferences.length)
    myQuestions.counter++;
    if(myQuestions.counter >= myQuestions.questions.length) {
      $('button').hide();
      myDrink.makeDrink(myPreferences.preferences.length)
    } else {
      myDrink.renderQuestion();
    }    
  });
  $('#no').click(function(){
    // var name = myQuestions.questions[myQuestions.counter].name;    
    // var length = myPantry[name].ingredients.length;
    // var randNum = myDrink.getRandomNumber(length);
    // myQuestions.questions[myQuestions.counter].answer = false;
    // console.log(myQuestions.questions);
    myQuestions.counter++;
    if(myQuestions.counter >= myQuestions.questions.length) {
      $('button').hide();
      myDrink.makeDrink(myPreferences.preferences.length)
    } else {
      myDrink.renderQuestion();
    }
  });
  
  // myPantry.addToPantry('water', 'test')
  myDrink.renderQuestion();
  // console.log(myPreferences)

});