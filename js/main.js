( function ( $ ) {
  'use strict';
  // use $(document).ready() for jQuery code in external js file
  // $(function(){}) is shorthand for $(document).ready(function(){}
  $( function () {

  /* ======= Model ======= */

  var model = {
    cats: [
    {
      name: 'Mystery',
      image: 'http://placekitten.com/300/200',
      sourceURL: 'http://placekitten.com',
      source: 'placekitten.com',
      clickCount: 0
    },
    {
      name: 'Elsa',
      image: 'img/elsa.jpg',
      sourceURL: '#',
      source: "Mum's Cat",
      clickCount: 0
    },
    {
      name: 'Molly',
      image: 'img/molly.jpg',
      sourceURL: '#',
      source: "Lin's Cat",
      clickCount: 0
    },
    {
      name: 'Nero',
      image: 'img/nero.jpg',
      sourceURL: '#',
      source: "Mum's Cat",
      clickCount: 0
    },
    {
      name: 'Reggie',
      image: 'img/reggie.jpg',
      sourceURL: '#',
      source: "Mum's Cat",
      clickCount: 0
    },
    {
      name: 'Free',
      image: 'img/cat01.jpg',
      sourceURL: 'http://all-free-download.com/',
      source: 'all-free-download.com',
      clickCount: 0
    }
    ],

    // refactor selectedCat to be a cat Object not a cat ID
    selectedCat: null
  };

  /* ======= Octopus ======= */

  var octopus = {
    init: function(){
      viewList.init();
      viewCat.init();
      viewAdmin.init();
    },

    // set a random cat object to display in viewCat init
    setRandomCat: function(){
      var numCats = this.getNumCats();
      var randomCat = Math.floor(Math.random() * numCats);
      //selectedCat is an object that points to the same cat object that model.cats[randomCat] points to.
      model.selectedCat = model.cats[randomCat];
    },
    // sets selected cat in viewList to create a separate event handler for each list element
    setSelectedCat: function(catObj){
      //selectedCat is an object that points to the same catObj that is passed to it
      model.selectedCat = catObj;
    },

    // get all cat objects from model for viewList
    getCats: function(){
      return model.cats;
    },

    // get number of cats from model for octopus random cat
    getNumCats: function(){
      return model.cats.length;
    },

    // get selected cat object from model for viewCat
    getSelectedCat: function(){
      return model.selectedCat;
    },

    // increment clickCount in model for selected cat object for viewCat
    // reworked to retrieve current data rather than receive what is passed (better event handling)
    incrementClicksForCat: function(){
      model.selectedCat.clickCount++;
      viewCat.render();
      viewAdmin.render();
    },

    // update cat object in model with data input in viewAdmin area
    getNewName: function(){
      return $('#admin-name').val();
    },
    getNewURL: function(){
      return $('#admin-url').val();
    },
    getNewClicks: function(){
      return $('#admin-clicks').val();
    },
    updateCat: function(){
      model.selectedCat.name = this.getNewName();
      model.selectedCat.image = this.getNewURL();
      model.selectedCat.clickCount = this.getNewClicks();
      viewList.render();
      viewCat.render();
      $('#admin-area').hide();
    }
  };


  /* ======= Views ======= */

  /* ------- viewList for nav menu ------- */

  var viewList = {
    init: function(){
      // grab elements and html for using in the render function
      this.$navList = $('#cat-list');
      this.render();
    },
    render: function(){
      // Cache vars for use in forEach() callback
      var $navList = this.$navList,
          liElem;

      //clear any existing list items
      $navList.empty();

      // create the elem first then append it at the end
      octopus.getCats().forEach(function(cat) {
        // create list element
        liElem =   $( '<li/>', {
          'class': 'cat-list-item',
          text: cat.name,
          click: function(e) {
            octopus.setSelectedCat(cat);
            viewCat.render();
            viewAdmin.render();
          }
        });
        $navList.append(liElem);
      });
    }
  };

  /* ------- viewCat to display selected cat ------- */

  var viewCat = {
    init: function(){
      // grab elements and html for using in the render function
      this.catShow = $('#selected-cat');
      this.catName = $('#cat-name');
      this.catCount = $('#cat-count');
      this.catPic = $('#cat-img');
      this.catSource = $('#cat-link');

      // reworked to use reference to currently selected cat within the event
      // if an actual id is passed - it is permanent in init
      $(this.catPic).click(function(e){
        octopus.incrementClicksForCat();
        e.preventDefault();
      });

      // set initial selectedCat randomly
      octopus.setRandomCat();
      this.render();
    },

    render: function(){
      // get the data for selectedCat cat object
      var cat = octopus.getSelectedCat();

      $(this.catName).text(cat.name);
      $(this.catCount).text(cat.clickCount);
      $(this.catPic).attr( 'src', cat.image );
      $(this.catSource).attr( 'href', cat.sourceURL );
      $(this.catSource).text(cat.source);
    }
  };

  /* ------- viewAdmin for admin area ------- */

  var viewAdmin = {
    init: function(){
      // grab elements and html for using in the render function
      this.adminBtn = $('#admin-btn');
      // click handler for admin button
      $(this.adminBtn).click(function(e){
        $('#admin-area').toggle();
        e.preventDefault();
      });
      this.render();
    },

    render: function(){
      // admin area inputs show current cat info
      // get cat object from octopus
      var adminCat = octopus.getSelectedCat();

      // set input text
      $('#admin-name').val(adminCat.name);
      $('#admin-url').val(adminCat.image);
      $('#admin-clicks').val(adminCat.clickCount);

      // click handler for cancel button
      $('#admin-btn-cancel').click(function(e){
        $('#admin-area').hide();
        e.preventDefault();
      });

      // click handler for save button
      $('#admin-btn-save').click(function(e){
        octopus.updateCat();
        e.preventDefault();
      });
    }
  };

  octopus.init();

  });
} ( jQuery ) );  // end of iife