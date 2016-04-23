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
    // ,
    // {
    //   name: "Andy",
    //   image: 'img/andy.jpg',
    //   sourceURL: 'https://github.com/udacity/ud989-cat-clicker-andy',
    //   source: 'Udacity Andy',
    //   clickCount: 0
    // }
    ],
    selectedCat: 0
  };

  //************************
  // Views
  // viewList for the nav menu
  // viewCat to display selected cat
  //************************

  var viewList = {
    init: function(){
      // grab elements and html for using in the render function
      this.$navList = $('#cat-list');
      this.render();
    },
    render: function(){
      // Cache vars for use in forEach() callback
      var $navList = this.$navList,
          catListID = '#';
      // for each cat create a nav <li> item with unique id
      // and click handler to display chosen cat
      octopus.getCats().forEach(function(cat) {
        // nav item
        $navList.append('<li><a href="#" class="cat-list-item" id="show' + cat.catID + '">' + cat.name + '</a></li>');
        // save unique menu id
        catListID = '#show' + cat.catID;
        // attach click event to unique id
        // the id is remembered for each of the nav items
        $(catListID).click(function(e){
          octopus.setSelectedCat(cat.catID);
          viewCat.render();
        });
      });
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
      var catRef = octopus.getSelectedCatID();
      var cat = octopus.getSelectedCat(catRef);

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

    // set a random id for the first cat to display
    setRandomCat: function(){
      var numCats = this.getNumCats();
      model.selectedCat = Math.floor(Math.random() * numCats);
    },
    // required now for nav menu - sets selected cat in event handler
    setSelectedCat: function(catRef){
      model.selectedCat = catRef;
    },
      // get selected cat ID from model
    getSelectedCatID: function(){
      return model.selectedCat;
    },

    //////////////////////////
    // model.cats[]
    //////////////////////////

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
    getSelectedCat: function(catRef){
      return model.cats[catRef];
    },
    // get clickCount for selected cat - unused
    // getClicksForCat: function(catRef){
    //   return model.cats[catRef].clickCount;
    // },

    // increment clickCount for selected cat
    // reworked to retrieve current data rather than receive what is given (better event handling)
    incrementClicksForCat: function(){
      var catRef = this.getSelectedCatID();
      model.cats[catRef].clickCount++;
      viewCat.render();
    }
  };

  octopus.init();

  });
} ( jQuery ) );  // end of iife