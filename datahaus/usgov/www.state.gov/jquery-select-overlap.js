jQuery.fn.activeXOverlap = function() { 

    $(this).each(function(i){
        var h   = $(this).outerHeight();
        var w   = $(this).outerWidth();
        var iframe  = '<!--[if IE 6]>' +
                      '<iframe src="javascript:false;" style="height: ' +
                      h +
                      'px; width: ' +
                      w +
                      'px" class="selectOverlap">' +
                      '</iframe>' +
                      '<![endif]-->'
        $(this).prepend(iframe);
    });
}