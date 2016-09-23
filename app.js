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
      this.name = this.propertyArray[this.questionCounter];
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
      console.log(this.item.display)
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
  var chef = new Worker(myPantry, ['meat', 'lettuce', 'tomato', 'cheese', 'sauce'], 'Do you like your burger with ')
  var myPreferences = new Preferences();
  var worker;
  var customerName;
  

  $('#customer-info').submit(function(e) {
    e.preventDefault();    
    var nameCheck = false;
    customerName = $('#customer-name').val();
    $('#customer-info').hide();
    if(Object.keys(customers).length > 0) {
      for(property in customers) {
        console.log(property)
        if(property === customerName) {
          nameCheck = true;
          // console.log(customers);
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
        console.log(customers);
        console.log(customers[customerName].name);
        console.log(Object.keys(customers).length);
      } else {
        $('#question').text('Hi ' + customers[customerName].name + ', do you want your usual?')
        $('#question').show();
      }
    }
  });

  $('#burger').click(function() {
    worker = chef;
    worker.product = 'burger';
    chef.adjectives = ['Mighty', 'Ruthless', "Dead Man's", 'Pillaging', 'Big'];
    chef.nouns = ['Mouth', 'Vesssel', 'Treasure', 'Scoundrel', 'Kahuna'];
    worker.renderQuestion();
  });
  $('#drink').click(function() {
    worker = bartender;
    worker.product = 'drink';
    bartender.adjectives = ['Limey', 'Ruthless', 'Marooned', 'Pillaging', 'Swashbuckling'];
    bartender.nouns = ['Walk the Plank', 'Ruffian', 'Treasure Island', 'Galleon', 'Port'];
    worker.renderQuestion();
  });

  $('#yes').click(function() {
    var ingName = worker.name;  
    var ingLength = Object.keys(worker.ingredients).length;    
    var randNum = Math.floor(Math.random() * ingLength);
    myPreferences.addPreference(worker.ingredients[ingName][0][randNum]);
    worker.questionCounter++;
    if(worker.questionCounter >= worker.questionsLength) {
      $('#yes, #no').hide();
      worker.makeItem(myPreferences.preferences.length);
      customers[customerName][worker.product] = worker.item.display;
      console.log(customers);
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
      customers[customerName][worker.product] = worker.item.display;
      $('#new').show();
    } else {
      worker.renderQuestion();
    };
  });
  $('#new').click(function() {
    $('#question').hide();
    $('#new').hide();
    $('#customer-info').show();
  })
  // console.log(customers.length)
  // console.log(customers)
});