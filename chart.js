TYRANO.kag.stat.f.chart_information_for_each_square = [];


tyrano.plugin.kag.chartEvent = function(id,val){
    var mouseover = val.mouseover;
    var mouseout = val.mouseout;
    var click = val.click;
    $(id).on('mouseover',function(){
        if (mouseover) TYRANO.kag.embScript(mouseover);
    }).on('mouseout',function(){
        if (mouseout) TYRANO.kag.embScript(mouseout);
    }).on('click',function(){
        if (click) TYRANO.kag.embScript(click);
    });
}





tyrano.plugin.kag.tag.chart = {


    vital: [],


    pm: {
        layer: 0,
        fix: false,
        ver: 5,
        side: 5,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        graphic: 'none',
        color: 'none',
        opacity: 1,
    },




    start: function(pm){


        var div = {
            ver: parseInt(pm.ver),
            side: parseInt(pm.side),
            left: parseInt(pm.left),
            top: parseInt(pm.top),
            width: parseInt(pm.width),
            height: parseInt(pm.height)
        };

        var object = TYRANO.kag.stat.f.chart_information_for_each_square;


        if (pm.fix == 'true') $('#tyrano_base').append('<div id="tyrano_chart" class="fixlayer"></div>');
        else $('.' + pm.layer + '_fore').append('<div id="tyrano_chart"></div>');
        $('#tyrano_chart').css({
            position: 'absolute',
            left: div.left + 'px',
            top: div.top + 'px',
            width: div.width + 'px',
            height: div.height + 'px',
            zIndex: 9999999,
        });
        if (pm.graphic != 'none') {
          var src = './data/image/' + pm.graphic;
          $('#tyrano_chart').append('<img id="tyrano_chart_bg" src=' + src + '>');
          $('#tyrano_chart_bg').css({
            left: '0px',
            top: '0px',
            width: div.width + 'px',
            height: div.height + 'px',
            opacity: pm.opacity
          });
        }


        for (var i=0; i<div.ver; i++) {
            var line_name = 'line_' + i;
            var top = (div.height/div.ver)*i;
            var height = div.height/div.ver;
            $('#tyrano_chart').append('<div id=' + line_name + '></div>');
            $('#' + line_name).css({
                position: 'absolute',
                left: '0px',
                top: top + 'px',
                width: div.width + 'px',
                height: height + 'px'
            });

            for (var j=0; j<div.side; j++) {
                var box_name = 'box_' + i + '_' + j;
                var id = '#' + box_name;
                var left = (div.width/div.side)*j;
                var width = div.width/div.side;
                $('#' + line_name).append('<div id=' + box_name + '></div>');
                $(id).css({
                    position: 'absolute',
                    left: left + 'px',
                    top: '0px',
                    width: width + 'px',
                    height: height + 'px'
                });
                if (pm.color != 'none') $(id).css('backgroundColor',pm.color);
                $(id).css('opacity',pm.opacity)

                object.forEach(function(val){
                    if (i == val.ver && j == val.side) {
                        if (val.color != 'none') $(id).css('backgroundColor',val.color);
                        if (val.graphic != 'none') {
                            var src = './data/image/' + val.graphic;
                            $(id).append('<img id="' + box_name + '_bg" src=' + src + '>');
                            $(id + '_bg').css({
                                position: 'absolute',
                                left: '0px',
                                top: '0px',
                                width: width + 'px',
                                height: height + 'px'
                            });
                        }
                        $(id).css('opacity',val.opacity);
                        TYRANO.kag.chartEvent(id,val);
                    }
                });
            }
        }
        this.kag.ftag.nextOrder();
    },


    doEvent: function(id,val){
        var mouseover = val.mouseover;
        var mouseout = val.mouseout;
        var click = val.click;
        $(id).on('mouseover',function(){
            if (mouseover) TYRANO.kag.embScript(mouseover);
        }).on('mouseout',function(){
            if (mouseout) TYRANO.kag.embScript(mouseout);
        }).on('click',function(){
            if (click) TYRANO.kag.embScript(click);
        });
    }
};





tyrano.plugin.kag.tag.free_chart = {
    start: function(pm){
        $('#tyrano_chart').remove();
        this.kag.ftag.nextOrder();
    }
};





tyrano.plugin.kag.tag.set_chart = {
    pm: {
        ver: 0,
        side: 0,
        graphic: 'none',
        color: 'none',
        opacity: 1,
        mouseout_exp: null,
        mouseover_exp: null,
        click_exp: null,
        log: null
    },
    start: function(pm){
        var chart_array = TYRANO.kag.stat.f.chart_information_for_each_square;
        var object = {
            ver: parseInt(pm.ver),
            side: parseInt(pm.side),
            graphic: pm.graphic,
            color: pm.color,
            opacity: parseInt(pm.opacity),
            mouseout: pm.mouseout_exp,
            mouseover: pm.mouseover_exp,
            click: pm.click_exp
        };
        TYRANO.kag.stat.f.chart_information_for_each_square.filter(function(val){
            if (val.ver != object.ver && val.side != object.side) return val;
        });
        TYRANO.kag.stat.f.chart_information_for_each_square.push(object);
        if (pm.log) console.log(TYRANO.kag.stat.f.chart_information_for_each_square);
        this.kag.ftag.nextOrder();
    }
};





tyrano.plugin.kag.tag.clear_chart = {
    start: function(pm){
        TYRANO.kag.stat.f.chart_information_for_each_square = [];
        this.kag.ftag.nextOrder();
    }
};





tyrano.plugin.kag.tag.make_chart = {
    start: function(pm){
        TYRANO.kag.stat.f.chart_information_for_each_square.forEach(function(val){
            var id = 'box_' + val.ver + '_' + val.side;
            TYRANO.kag.chartEvent(id,val);
        });
        this.kag.ftag.nextOrder();
    }
};





(function(tag_names){
    for (var i=0; i<tag_names.length; i++) {
        var tag_name = tag_names[i];
        tyrano.plugin.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
        tyrano.plugin.kag.ftag.master_tag[tag_name].kag = TYRANO.kag;
    }
}(['chart','free_chart','set_chart','clear_chart','make_chart']));
