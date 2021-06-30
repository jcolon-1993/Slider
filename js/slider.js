// For every Slider
$(".slider").each(function()
{
  // Get the current slider
  var $this = $(this);
  // Get the slide-group (container)
  var $group = $this.find(".slide-group");
  // jQuery object to hold all the slides
  var $slides = $this.find(".slide");
  // Create array to hold nav buttons
  var buttonArray = [];
  // Index of current slide
  var currentIndex = 0;
  // Used to store the timer
  var timeout;

  // Creates the slide from old to to new one
  function move(newIndex)
  {
    // declare variables
    var animateLeft;
    var slideLeft;

    // When slide moves, call advance() again
    advance();
    // If current slide is showing or a slide is animating, then do nothing.
    if ($group.is(":animated") || currentIndex === newIndex)
    {
      return;
    }
    // Remove class from item
    buttonArray[currentIndex].removeClass("active");
    // Add class to new item.
    buttonArray[newIndex].addClass("active");

    /*
      If new item > current, sit the new slide to the right and animate the
      curent group to the left
    */
    if (newIndex > currentIndex)
    {
      slideLeft = "100%";
      animateLeft = "-100%";
    }
    // Otherwise, sit the new slide to the left and animate the current group to the right
    else
    {
      slideLeft = "-100%";
      animateLeft = "100%";
    }
    // Position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css( {left: slideLeft, display: "block"} );
    // Animate slides and hide previous slides.
    $group.animate( {left: animateLeft}, function()
    {
      // Set position of the new item
      $slides.eq(currentIndex).css( {display:"none" });
      $slides.eq(newIndex).css( {left:0 });
      // Set position of group of slides.
      $group.css( {left:0} );
      // Set currentIndex to new image
      currentIndex = newIndex;
    });
  }

  // Sets a timer between slides
  function advance()
  {
    // Clear timer stored in timeout
    clearTimeout(timeout);
    // Start timer to run an anonymous function every 4 seconds.
    timeout = setTimeout(function()
    {
      // If not the last slide, move to next slide
      if (currentIndex < ($slides.length - 1))
      {
        move(currentIndex + 1);
      }
      // Otherwise, move to the first slide
      else
      {
        move(0);
      }
      // Will wait four seconds before slides changes (In milliseconds)
    }, 4000);
    }

    // Loops through each slider
    $.each($slides, function(index)
    {
      // Create a button element for the button
      var $button = $("<button type='button' class='slide-btn'>&bull;</button>");
      // if index is the current item, add the active class
      if (index === currentIndex)
      {
        $button.addClass("active");
      }
      // Create event handler for the button
      $button.on("click", function()
      {
        // It calls the move() function
        move(index);
        // Add to the buttons holder
      }).appendTo(".slide-buttons");
      // Add it to the button array
      buttonArray.push($button);
    });
    advance();
});
