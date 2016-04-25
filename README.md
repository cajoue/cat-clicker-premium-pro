# cat-clicker-premium-pro

Frontend Nanodegree project

Javascript application for cat clicker game

Based on [Cat Clicker Premium MVO](https://github.com/cajoue/cat-clicker-premium-mvo) 

**Requirements for Cat Clicker Premium Pro**

_Visuals_

* The application should display
    - [x] a list of at least 5 cats, listed by name
    - [x] an area to display the selected cat
    - [x] an admin button
    - [x] an admin area with inputs for changing the cat's name, url, and number of clicks (hidden by default)
* In the cat display area, the following should be displayed
    - [x] the cat's name
    - [x] a picture of the cat
    - [x] text showing the number of clicks

The specifics of the layout do not matter, so style it however you'd like.

_Interaction_

* [x] When a cat name is clicked in the list, the cat display area should update to show the data for the selected cat.
* [x] The number of clicks in the cat area should be unique to each cat, and should increment when the cat's picture is clicked.
* [x] When the admin button is clicked, the admin area should appear with the inputs filled in for the currently-selected cat.
* [x] When the cancel button in the admin area is pressed, the admin area disappears.
* [x] When the save button in the admin area is pressed, the currently-selected cat's values update with the values in the admin area, and the admin area disappears.

**To Do:**
* [x] Review existing Cat Clicker Premium MVO
* [x] Plan separation of concerns
* [x] create viewAdmin
* [x] clear up redundant code - don't need catID, add more comments where necessary 

**Thoughts/Mods**
* [x] Remember Objects are always referenced - never copied.  
* [x] refactor current code to make better use of cat object - use cat object as selected cat not just it's id. 
* [x] create visible admin area then make hidden after interaction worked out.
* [ ]

**Helpful Resources**

http://api.jquery.com

https://www.udacity.com/course/viewer#!/c-ud989/l-3417188540/m-3480348671

http://api.jquery.com/attr/

https://discussions.udacity.com/t/cat-clicker-premium-mvo-event-handler-for-clicks/165477

https://discussions.udacity.com/t/cat-clicker-premium-pro-questions-on-closure-and-scope/161808/3

http://api.jquery.com/jQuery/#creating-new-elements

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form

http://www.w3schools.com/jquery/jquery_css_classes.asp

http://api.jquery.com/toggleClass/


