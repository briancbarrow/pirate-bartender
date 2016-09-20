$(document).ready(function() {
  var Pantry = function(strong, salty, bitter, sweetness, fruity) {
    this.strong = strong;
    this.salty = salty;
    this.bitter = bitter;
    this.sweetness = sweetness;
    this.fruity = fruity;
  };
  var Ingredients = function(ingredients) {
    this.ingredients = ingredients;
  }
  var Question = function(ingredients, name) {
    this.question = "Which 'o these" + name + "in'redients do ye want in yer drink?";
    this.ingredients = ingredients;
  }
  var Drink = function(ingredientChoices){
    this.ingredients = ingredientChoices;
  }

  var strongIngredients = new Ingredients(['Glug of rum', 'slug of whisky', 'splash of gin']);
  var saltyIngredients = new Ingredients(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  var bitterIngredients = new Ingredients(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  var sweetIngredients = new Ingredients(['Sugar cube', 'spoonful of honey', 'splash of cola']);
  var fruityIngredients = new Ingredients(['Slice of orange', 'dash of cassis', 'cherry on top']);

  var pantry = new Pantry(strongIngredients, saltyIngredients, bitterIngredients, sweetIngredients, fruityIngredients);
  
  
});