$(document).ready(function() {
  var customers = {};
  var Pantry = function() {
    this.ingredients = {};
    this.addToPantry = function(ingredient) {
      if(this.ingredients[ingredient.type]) {
        if(Array.isArray(ingredient.name)) {
          for(i = 0; i < ingredient.name.length; i++){
            this.ingredients[ingredient.type].push(ingredient.name[i]);
          };
        } else {
          this.ingredients[ingredient.type].push(ingredient.name);
        };
      } else {
        this.ingredients[ingredient.type] = [ingredient.name];
      };
    };
  };

  var Customer = function(name) {
    this.name = name;
  };

  var Ingredient = function(type, name) {
    this.type = type;
    this.name = name;
  };

  var Questions = function(pantry, typeArr, phrase) {
    this.questions = {};
    for(i = 0; i < typeArr.length; i++) {
      this.questions[typeArr[i]] = phrase + typeArr[i] + '?';
    }
  };

  var Item = function(length) {
    var randNumAdj = Math.floor(Math.random() * length);
    var randNumNoun = Math.floor(Math.random() * length);
    this.displayItem = function() {
      this.display = this.adjectives[randNumAdj] + ' ' + this.nouns[randNumNoun];
      $('#question').text('Enjoy yer "' + this.display + '"');
    };
  };

  var Preferences = function() {
    this.preferences = [];
    this.addPreference = function(preference) {
      this.preferences.push(preference);
    };
  };

  var Worker = function(pantry, typeArr, phrase) {
    this.ingredients = {};
    for(i = 0; i < typeArr.length; i++) {
      this.ingredients[typeArr[i]] = pantry.ingredients[typeArr[i]]
    };
    this.questionCounter = 0;
    this.questionList = new Questions(pantry, typeArr, phrase)
    this.questionsLength = Object.keys(this.questionList.questions).length
    this.propertyArray = Object.keys(this.questionList.questions)
    this.renderQuestion = function() {
      this.ingName = this.propertyArray[this.questionCounter];
      if(this.questionCounter < Object.keys(this.questionList.questions).length) {
        $('#question').text(this.questionList.questions[typeArr[this.questionCounter]]);
        $('#burger, #drink').hide();
        $('#yes, #no').show();
      };
    };
    this.makeItem = function(preferencesLength) {
      this.item = new Item(preferencesLength);      
      this.item.adjectives = this.adjectives;
      this.item.nouns = this.nouns;
      this.item.displayItem();
    };
  };

  var strongIngredients = new Ingredient('strong', ['Glug of rum', 'slug of whisky', 'splash of gin']);
  var saltyIngredients = new Ingredient('salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  var bitterIngredients = new Ingredient('bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  var sweetIngredients = new Ingredient('sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']);
  var fruityIngredients = new Ingredient('fruity', ['Slice of orange', 'dash of cassis', 'cherry on top']);
  var meatIngredients = new Ingredient('meat', ['Single Patty', 'Double Patty', 'Double with Bacon']);
  var lettuceIngredients = new Ingredient('lettuce', ['One Leaf', 'Two Leaves', 'Three Leaves']);
  var tomatoIngredients = new Ingredient('tomato', ['One Tomato', 'Two Tomatoes', 'Three Tomatoes']);
  var cheeseIngredients = new Ingredient('cheese', ['One Slice', 'Two Slices', 'Three Slices']);
  var sauceIngredients = new Ingredient('sauce', ['Sweet', 'Tangy', 'Spicy']);

  var myPantry = new Pantry();
  myPantry.addToPantry(strongIngredients);
  myPantry.addToPantry(saltyIngredients);
  myPantry.addToPantry(bitterIngredients);
  myPantry.addToPantry(sweetIngredients);
  myPantry.addToPantry(fruityIngredients);
  myPantry.addToPantry(meatIngredients);
  myPantry.addToPantry(lettuceIngredients);
  myPantry.addToPantry(tomatoIngredients);
  myPantry.addToPantry(cheeseIngredients);
  myPantry.addToPantry(sauceIngredients);

  var bartender = new Worker(myPantry, ['strong', 'salty', 'bitter', 'sweet', 'fruity'], 'Do you like your drink ');
    bartender.product = 'drink';
    bartender.adjectives = ['Limey', 'Ruthless', 'Marooned', 'Pillaging', 'Swashbuckling'];
    bartender.nouns = ['Walk the Plank', 'Ruffian', 'Treasure Island', 'Galleon', 'Port'];
  var chef = new Worker(myPantry, ['meat', 'lettuce', 'tomato', 'cheese', 'sauce'], 'Do you like your burger with ')
    chef.product = 'burger';
    chef.adjectives = ['Mighty', 'Ruthless', "Dead Man's", 'Pillaging', 'Big'];
    chef.nouns = ['Mouth', 'Vesssel', 'Treasure', 'Scoundrel', 'Kahuna'];
  var myPreferences = new Preferences();
  var worker;
  var customerName;
  var customer;
  

  $('#customer-info').submit(function(e) {
    e.preventDefault();    
    var nameCheck = false;
    customerName = $('#customer-name').val();
    $('#customer-info').hide();
    if(Object.keys(customers).length > 0) {
      for(property in customers) {
        if(property === customerName) {
          nameCheck = true;
          break;
        } else {
          nameCheck = false;
        }
      }
    }    
    
    if(customerName !== null) {
      if(nameCheck === false) {
        $('#burger, #drink, #question').show();
        customer = new Customer(customerName);
        customers[customerName] = customer;
      } else {
        $('#question').text('Hi ' + customers[customerName].name + ', do you want your usual?');
        $('#question').append('<div class="usual-cont"></div>')
        if(customers[customerName].drink) {
          $('.usual-cont').append('<p>Drink: ' + customers[customerName].drink.name)
        }
        if(customers[customerName].burger) {
          $('.usual-cont').append('<p>Burger: ' + customers[customerName].burger.name)
        }
        $('#question, #returnYes, #returnNo').show();
      }
    }
  });

  $('#returnYes').click(function() {
    $('#question').text('Coming right up ' + customers[customerName].name);
    $('#returnYes, #returnNo').hide();
    $('#new').show();
  });
  $('#returnNo').click(function() {
    $('#question').text('Do ye want a burger or a drink?');
    $('#returnYes, #returnNo').hide();
    $('#burger, #drink').show();
  });

  $('#burger').click(function() {
    worker = chef;
    chef.renderQuestion();
  });
  $('#drink').click(function() {
    worker = bartender;
    bartender.renderQuestion();
  });

  $('#yes').click(function() {
    var ingName = worker.ingName;  
    var ingLength = worker.ingredients[ingName].length;    
    var randNum = Math.floor(Math.random() * ingLength);
    myPreferences.addPreference(worker.ingredients[ingName][0][randNum]);
    worker.questionCounter++;
    if(worker.questionCounter >= worker.questionsLength) {
      $('#yes, #no').hide();
      worker.makeItem(myPreferences.preferences.length);
      customers[customerName][worker.product] = {};
      customers[customerName][worker.product].name = worker.item.display;
      customers[customerName][worker.product].preferences = myPreferences.preferences;
      myPreferences = new Preferences();
      worker.questionCounter = 0;
      $('#new').show();
    } else {
      worker.renderQuestion();
    };  
  });
  $('#no').click(function() {
    worker.questionCounter++;
    if(worker.questionCounter >= worker.questionsLength) {
      $('#yes, #no').hide();
      worker.makeItem(myPreferences.preferences.length)
      customers[customerName][worker.product] = {};
      customers[customerName][worker.product].name = worker.item.display;
      customers[customerName][worker.product].preferences = myPreferences.preferences;
      myPreferences = new Preferences();
      $('#new').show();
    } else {
      worker.renderQuestion();
    };
  });
  $('#new').click(function() {
    $('#question').hide();
    $('#question').text('Do ye want a burger or a drink?');
    $('#new').hide();
    $('#customer-info').show();
  })
});