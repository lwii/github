// JavaScript source code

window, onload = function () {
    
   // $().getId('box').css('color','black');   
    // $().getTagName('p').css('color','red');
    //$().getTagName('li').css('color','red');
    // $().getTagName('li').mouseover(function(){
    //     $().getTagName('li').css('background','blue').css('color','#fff');
    // });
    // $().getTagName('li').mouseout(function(){
    //     $().getTagName('li').css('background','linear-gradient(to right bottom,rgba(178,194,213,1),rgba(241, 235, 215, 1))').css('color','#000');
    // });
    $().getClass('box').hover(function(){
        $(this).css('background','blue');
    },function(){});
    
}
