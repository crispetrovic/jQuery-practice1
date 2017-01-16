// ready event handler shortcut
$(function (){
    // create a variable for the 'rating-container' id
    var ratingContainer = $('#rating-container');

    var updateCircles = function(){
        // until the new max value has been reached
        for (var i = 0; i < ratingContainer.attr('max-value'); i++){
            // append rating circles
            ratingContainer.append('<div class="rating-circle"></div>');
        }
    };
    // click event handler for 'save-rating' button
    $('#save-rating').click(function(){
        // post the rating to server
        $.post('http://jquery-edx.azurewebsites.net/api/Rating',
            {
                // first property expected, value (contains current rating)
                value: $('.rating-chosen').length,
                // second property expcted, maxValue (contains max value)
                maxValue: ratingContainer.attr('max-value')
            },
            // server returns a JSON object with one property, message
            function(data) {
                // display the message returned
                $('#output').text(data.message);
            }
        );
    });
    // click event handler for 'update-max-value' button
    $('#update-max-value').click(function(){
        // remove the existing rating circles
        $('.rating-circle').remove();
        // get the integer input from the '#max-value' field
        $newNum = parseInt($('#max-value').val());
        // verify that the input is an integer & in the range of 1 to 99
        if (Number.isInteger($newNum) && $newNum > 0 && $newNum < 100){
            // set the input as the 'max-value' attribute
            ratingContainer.attr('max-value', $newNum);
        }
        else{
            // pop up window to alert user to try again
            alert('Please input number from 1 to 99');
        }
        // update the rating circles accordingly
        updateCircles();
    });
    // mouseover
    ratingContainer.delegate('.rating-circle', 'mouseover', function(){
        // add 'rating-chosen-removed' attributes to rating circles
        $('.rating-chosen').addClass('rating-chosen-removed');
        // remove the 'rating-chosen' attributes (purple fill color)
        // from rating circles
        $('.rating-chosen').removeClass('rating-chosen');
        // add 'rating-hover' attributes (yellow fill color) to the circle
        // hovered on, plus all circles to the left of it
        $(this).prevAll().andSelf().addClass('rating-hover');
    });
    // mouseout
    ratingContainer.delegate('.rating-circle', 'mouseout', function(){
        // add the 'rating-chosen' attributes (purple fill color) to
        // to the 'rating-chosen-removed' class
        $('.rating-chosen-removed').addClass('rating-chosen');
        // remove the 'rating-chosen-removed' attribute from the
        // 'rating-chosen' class
        $('.rating-chosen').removeClass('rating-chosen-removed');
        // remove the 'rating-hover' attributes (yellow fill color) to the
        // circle hovered on and all circles to the left of it
        $(this).prevAll().andSelf().removeClass('rating-hover');
    });
    // click
    ratingContainer.delegate('.rating-circle', 'click', function(){
        // add the 'rating-chosen' (purple fill color) to the circle
        // clicked and all circles to the left of it
        $(this).prevAll().andSelf().addClass('rating-chosen');
        // remove any attributes from the circles to the right of the
        // circle clicked
        $(this).nextAll().removeClass('rating-chosen-removed rating-chosen');
    });
    // update the rating circles accordingly
    updateCircles();
});
