TYRANO.kag.stat.f.event = {
    mouseover: function(){
        console.log(1);
        
        $('#box_1_1').css('backgroundColor','red');
    },
    mouseout: function(){
        $('#box_1_1').css('backgroundColor','blue');
    },
    click: function(){
        TYRANO.kag.ftag.startTag('jump',{target:'sample_end'});
    }
}