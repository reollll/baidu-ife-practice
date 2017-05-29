window.onload = winLoad();
function winLoad() {
	function start() {
		var show = jq("#cacuValue")[0]; // 显示倒计时的div
		var btn = jq("#start")[0];
		var input = jq("input")[0];
		var time, setTime;
		btn.disabled = true;
		show.innerHTML = "<div class = 'hint'>请输入一个日期</div>";
        input.oninput = function() {
        	if(this.value && this.value != "") {
        		show.innerHTML = "";
        		btn.disabled = false;
        	    time = input.value.split("-");
        	    setTime = new Date(time[0], time[1] - 1, time[2]); // 设置目标时间
        	}
        }
		function clickStart() {
            var thisTime = new Date();
            var timeDiff = parseInt((setTime.getTime() - thisTime.getTime())/1000);
            var d = parseInt(timeDiff / (60 * 60 * 24));
            var h = parseInt(timeDiff / (60 * 60) % 24);
            var m = parseInt(timeDiff / 60 % 60);
            var s = parseInt(timeDiff % 60);
            show.innerHTML = "距离<code>" + time[0] +  "</code>年<code>" + time[1] + "</code>月<code>" + time[2] + "</code>日" + 
            "还有<code>" + d + "</code>天<code>" + h + "</code>小时<code>" + m + "</code>分<code>" + s + "</code>秒";
            setTimeout(clickStart, 50);
            if (timeDiff <= 0) {
            	clearTimeout(clickStart);
            	show.innerHTML = "<div class = 'hint'>事件已经到了，你完成目标了吗？</div>";
            }
		}
		jq.click("#start", clickStart);
	}
	start();
}