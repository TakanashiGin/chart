TYRANO.kag.stat.f.event = {
    mouseover: function(){
        $('#box_1_1').css('backgroundColor','red');
    },
    mouseout: function(){
        $('#box_1_1').css('backgroundColor','blue');
    },
    click: function(){
        TYRANO.kag.ftag.startTag('jump',{target:'sample_end'});
    }
}
