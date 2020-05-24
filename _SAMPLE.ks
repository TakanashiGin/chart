[plugin name="chart"]
[layopt layer="message0" visible="false"]
[layopt layer="0" visible="true"]

[loadjs storage="plugin/chart/_SAMPLE.js"]
[set_chart ver="1" side="1" color='blue' mouseover_exp="f.event.mouseover()" mouseout_exp="f.event.mouseout()" click_exp="f.event.click()" log="true"]

[chart fix="true" ver="10" side="10" color="gray" opacity="0.2" graphic="../bgimage/room.jpg" left="50" top="50" width="500" height="500"]
[s]

*sample_end
[free_chart]
[eval exp="console.log('sample_end')"]
[s]
