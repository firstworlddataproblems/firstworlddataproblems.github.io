/*$(function(){

    $("ul.user-nav-dd li, ul.global-nav-dd li").hover(function(){
    
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    
    }, function(){
    
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    
    });
    
    $("ul.user-nav-dd li ul li:has(ul), ul.global-nav-dd li ul li:has(ul)").find("a:first").append(" &raquo; ");

});*/

$(function(){

    $("ul.user-nav-dd li, ul.global-nav-dd li").hover(function(){
   
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
                $(this).children('a').addClass('selected');
   
    }, function(){
               
                //$('ul#user-nav li').find("a:first").addClass("selected");
                //$(this).parent('li').children('a').addClass('selected');

       
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
                $(this).children('a').removeClass('selected');
   
    });
   
    $("ul.user-nav-dd li ul li:has(ul), ul.global-nav-dd li ul li:has(ul)").find("a:first").append(" &raquo; ");

});