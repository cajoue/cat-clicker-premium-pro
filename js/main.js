( function ( $ ) {
  'use strict';
  // use $(document).ready() for jQuery code in external js file
  // $(function(){}) is shorthand for $(document).ready(function(){}
  $( function () {

  //************************
  // Model
  // cat data is here
  //************************

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
    //{ // this is sooooo slow and the image changes each time too
    //   name: 'Slow Chameleon',
    //   image: 'http://loremflickr.com/300/200/kitten?random=2',
    //   sourceURL: 'http://loremflickr.com',
    //   source: 'loremflickr.com',
    //   clickCount: 0
    // },
    {
      name: 'Free',
      image: 'img/cat01.jpg',
      sourceURL: 'http://all-free-download.com/',
      source: 'all-free-download.com',
      clickCount: 0
    }
    // , this cat just freaks me out
    // {
    //   name: "Andy",
    //   image: 'img/andy.jpg',
    //   sourceURL: 'https://github.com/udacity/ud989-cat-clicker-andy',
    //   source: 'Udacity Andy',
    //   clickCount: 0
    // }
    ],

    // refactor selectedCat to be a cat Object not a cat ID
    selectedCat: null
  };

  //************************
  // Views
  // viewList for the nav menu
  // viewCat to display selected cat
  //************************

  // refactor selectedCat to be a cat Object not a cat ID

  var viewList = {
    init: function(){
      // grab elements and html for using in the render function
      this.$navList = $('#cat-list');
      this.render();
    },
    render: function(){
      // Cache vars for use in forEach() callback
      var $navList = this.$navList,
      liElem,
      catListID = '#';

  // refactor selectedCat to be a cat Object not a cat ID
  // might not id for each list item in cat nav
  // menu items might not need to be links....
  // create the elem first then append it at the end

      octopus.getCats().forEach(function(cat) {
        // list element
        liElem =   $( "<li/>", {
          "class": "cat-list-item",
          text: cat.name,
          click: function(e) {
            octopus.setSelectedCat(cat);
            viewCat.render();
          }
        });
        $navList.append(liElem);
      })
    }
  };

  var viewCat = {
    init: function(){
      // grab elements and html for using in the render function
      this.catShow = $('#selected-cat');
      this.catName = $('#cat-name');
      this.catCount = $('#cat-count');
      this.catPic = $('#cat-img');
      this.catSource = $('#cat-link');

      // moved event handler from render
      // reworked to get the reference to currently selected cat within the click
      // if an actual id is passed - it is permanent
      $(this.catPic).click(function(e){
        octopus.incrementClicksForCat();
        e.preventDefault();
      });

      // create random first cat
      octopus.setRandomCat();
      this.render();
    },
    // render cat no longer receives catID as argument
    // it retrieves selectedCat from octopus
    render: function(){
      // get the data for this cat
      // may rework to make less cumbersome
      // refactor selectedCat to be a cat Object not a cat ID - don't need catRef
      // var catRef = octopus.getSelectedCatID();
      var cat = octopus.getSelectedCat();

      $(this.catName).text(cat.name);
      $(this.catCount).text(cat.clickCount);
      $(this.catPic).attr( 'src', cat.image );
      $(this.catSource).attr( 'href', cat.sourceURL );
      $(this.catSource).text(cat.source);

      // moved event handler to init
    }
  };

  //************************
  // Octopus
  //************************

  var octopus = {
    init: function(){
      this.setCatID();
      viewList.init();
      viewCat.init();
    },
      // set all cat ids
    setCatID: function(){
      var i = 0;
      this.getCats().forEach(function(cat) {
        cat.catID = i++;
      });
    },

    //////////////////////////
    // model.selectedCat
    //////////////////////////

    // refactor selectedCat to be a cat Object not a cat ID

    // set a random id for the first cat to display
    setRandomCat: function(){
      var numCats = this.getNumCats();
      var randomCat = Math.floor(Math.random() * numCats);
      //selectedCat is an object that points to the same cat object that model.cats[randomCat] points to.
      model.selectedCat = model.cats[randomCat];
    },
    // required now for nav menu - sets selected cat in event handler
    setSelectedCat: function(catObj){
      //selectedCat is an object that points to the same cat object that model.cats[catRef] points to.
      //model.selectedCat = model.cats[catRef];
      model.selectedCat = catObj;
      //console.log('model.selectedCat: ' + JSON.stringify(model.selectedCat));
    },
      // get selected cat ID from model
    getSelectedCatID: function(){
      return model.selectedCat.catID;
    },

    //////////////////////////
    // model.cats[]
    //////////////////////////

    // refactor selectedCat to be a cat Object not a cat ID

    // get all cat objects from model
    getCats: function(){
      return model.cats;
    },
    // get number of cats from model
    getNumCats: function(){
      return model.cats.length;
    },
    // get list of cat names from model - unused
    // http://stackoverflow.com/a/19590901/6156379
    // getCatList: function(){
    //   return model.cats.map(function(catList) {return catList.name;});
    // },
    // get selected cat object from model
    // no longer requires a catRef
    getSelectedCat: function(){
      return model.selectedCat;
    },
    // get clickCount for selected cat - unused
    // getClicksForCat: function(catRef){
    //   return model.cats[catRef].clickCount;
    // },

    // increment clickCount for selected cat
    // reworked to retrieve current data rather than receive what is given (better event handling)
    // no longer needs to fetch catRef to increment selected cat now that it is an object it already has it
    incrementClicksForCat: function(){
      //var catRef = this.getSelectedCatID();
      model.selectedCat.clickCount++;
      viewCat.render();
    }
  };

  octopus.init();

  });
} ( jQuery ) );  // end of iife