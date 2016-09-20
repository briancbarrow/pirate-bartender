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
        this[name] = [];
        this[name].push(ingredient);
      }
    };

  var Ingredients = function(ingredients) {
    this.ingredients = ingredients;
  }
  var Questions = function(pantry) {
    this.counter = 0;
    this.questions = [];
    for(variable in pantry){
      if(pantry.hasOwnProperty(variable)) {
        var question = "Do ye want yer drink to be " + variable + "?";
        this.questions.push({question, answer: '', name: variable});
      }
    }
  }


  // var Drink = function(ingredients) {

  // }

  var strongIngredients = new Ingredients(['Glug of rum', 'slug of whisky', 'splash of gin']);
  var saltyIngredients = new Ingredients(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  var bitterIngredients = new Ingredients(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  var sweetIngredients = new Ingredients(['Sugar cube', 'spoonful of honey', 'splash of cola']);
  var fruityIngredients = new Ingredients(['Slice of orange', 'dash of cassis', 'cherry on top']);

  var myPantry = new Pantry(strongIngredients, saltyIngredients, bitterIngredients, sweetIngredients, fruityIngredients);

  var myQuestions = new Questions(myPantry);

  var myDrink = {
    renderQuestion: function() {
      $('#question').text(myQuestions.questions[myQuestions.counter].question);
    },
    getRandomNumber: function(length) {
      Math.floor(Math.random() * length);
    }
  };

  $('#yes').click(function(){
    var name = myQuestions.questions[myQuestions.counter].name;    
    var length = myPantry[name].ingredients.length;
    var randNum = myDrink.getRandomNumber(length);
    myQuestions.questions[myQuestions.counter].answer = true;
    console.log(myQuestions.questions);
  });
  
  myDrink.renderQuestion();
  console.log(myQuestions.questions[myQuestions.counter].answer)

});