// Usage:
// $('.box').parentToAnimate($('.new-parent'), 200);
// $('.box').parentToAnimate($('.new-parent'), 'slow');
// $('.box').parentToAnimate('.new-parent', 'slow');

//Credit: https://gist.github.com/Symmetronic/a52d6ff79900986e70b025817366875b

jQuery.fn.extend({
    // Modified and Updated by MLM
    // Origin: Davy8 (http://stackoverflow.com/a/5212193/796832)
    parentToAnimate: function(newParent, duration) {
        duration = duration || 'slow';
        
        var $element = $(this);
        
        newParent = $(newParent); // Allow passing in either a JQuery object or selector
        var oldOffset = $element.offset();
        var oldWidth = $element.width();
        var oldHeight = $element.height();
        $(this).appendTo(newParent);
        var newOffset = $element.offset();
        var newWidth = $element.width();
        var newHeight = $element.height();
        
        var temp = $element.clone().removeAttr('id').appendTo('body');
        
        temp.css({
            'position': 'absolute',
            'left': oldOffset.left,
            'top': oldOffset.top,
            'width': oldWidth,
            'height': oldHeight,
            'zIndex': 1000
        });
        
        $element.hide();
            
        temp.animate({
            'top': newOffset.top,
            'left': newOffset.left,
            'width': newWidth,
            'height': newHeight
        }, duration, function() {
            $element.show();
            temp.remove();
        });
    }
});



//Credit: cuong0111, https://www.liketly.com/forum/thread/17527/jquery-animate-moving-dom-element-to-new-parent/
function moveAnimate(element, newParent, time='slow'){
    element = $(element); //Allow passing in either a JQuery object or selector
    newParent= $(newParent); //Allow passing in either a JQuery object or selector
    var oldOffset = element.offset();
    element.appendTo(newParent);
    var newOffset = element.offset();

    var temp = element.clone().appendTo('body');
    temp    .css('position', 'absolute')
            .css('left', oldOffset.left)
            .css('top', oldOffset.top)
            .css('zIndex', 1000);
    element.css('visibility', 'hidden');
    // element.hide();
    temp.animate( {'top': newOffset.top, 'left':newOffset.left}, time, function(){
        temp.remove();
        element.css('visibility', 'inherit');
        // element.show();
    });
}

function moveAnimateFixed(element, newParent, time='slow'){
    element = $(element); //Allow passing in either a JQuery object or selector
    newParent= $(newParent); //Allow passing in either a JQuery object or selector
    var oldOffset = {left: element.scrollLeft(), top: element.scrollTop() };
    element.appendTo(newParent);
    var newOffset = {left: element.scrollLeft(), top: element.scrollTop() };

    var temp = element.clone().appendTo('body');
    temp    .css('position', 'fixed')
            .css('left', oldOffset.left)
            .css('top', oldOffset.top)
            .css('zIndex', 1000);
    element.css('visibility', 'hidden');
    // element.hide();
    temp.animate( {'top': newOffset.top, 'left':newOffset.left}, 'slow', function(){
        temp.remove();
        element.css('visibility', 'inherit');
        // element.show();
    });
}
