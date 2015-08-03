/* Author: 
    David McCreath
*/

$('document').ready(function(){

    // Fixing up some IE deficiencies
    if($.browser.msie) {
        $('.post-excerpt:nth-child(odd)').addClass('row-alt');
        $('ul li:first-child').addClass('first');
        $('ol li:first-child').addClass('first');
        $('.small-card:nth-child(3n+3)').addClass('third');
    }

/* jskfix: no pdf icon for now    
    $('a[href$=".pdf"]').addClass('pdf');
*/
    
    $('.home-feature').hover(function(){
        $(this).toggleClass('hovered');
    });
    $('.home-feature').click(function(){
        var featureID = $(this).attr('id');
        var whichExcerpt = $('#'+featureID+'-excerpt');
        var openExcerpt = $('.home-feature-excerpt.open').attr('id');
        if(openExcerpt){
            if(openExcerpt == 'home-feature-01-excerpt' || openExcerpt == 'home-feature-02-excerpt'){
                $('#'+openExcerpt).animate({width:'0px'},1000,function(){
                    $('#'+openExcerpt).css('display','none').removeClass('open');
                });
            } else {
                $('#'+openExcerpt).animate({height:'0px'},1000,function(){
                    $('#'+openExcerpt).css('display','none').removeClass('open');
                });
            }
        }
        if((whichExcerpt.css('height') == '478px') || (whichExcerpt.css('width') == '478px')) {
            $(whichExcerpt).css('display','block').animate({height:'478px',width:'478px'},1000).addClass('open');
        } else {
            $(whichExcerpt).css('display','block').animate({height:'480px',width:'480px'},1000).addClass('open');
        }
        return false;
    });
 
    $('.home-feature-excerpt').click(function(){
        var ex = $(this).attr('id');
        if(ex == 'home-feature-01-excerpt' || ex == 'home-feature-02-excerpt'){
            $(this).animate({width:'0px'},1000,function(){
                $(this).css('display','none').removeClass('open');
            });
        } else {
            $(this).animate({height:'0px'},1000,function(){
                $(this).css('display','none').removeClass('open');
            });
        }
    });

    $('#past-fellows-link').click(function(){
        $(this).parents('#past-fellows-item').toggleClass('show-menu');
        return false;
    });

    $('#banner-util form label').click(function(){
        if($('#banner-util #s').css('display') == 'inline-block'){
            $('#banner-util #s').animate({width:'0px'},500,function(){
                $(this).css('display','none');
                $('#searchform-banner').removeClass('open');
            });
        } else {
            $('#searchform-banner').addClass('open');
            $('#banner-util #s').css('display','inline-block').animate({width:'150px'},500);
        }
    });
    
    $('.tabs a').click(function(){
        whichItem = $(this).attr('href');
        var top = $(this).parents('.tab-set');
        $('.tabs a').removeClass('active');
        $(top).find('.tab-item.active').removeClass('active');
        $(whichItem).addClass('active');
        $(this).addClass('active');
        return false;
    });
    

});






















