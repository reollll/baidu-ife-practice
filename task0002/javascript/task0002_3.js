window.onload = function() {
	var container = jq("#container")[0];
	var list = jq("#list")[0];
	var btns = jq("#btns span");
	var index;
	var animated = false;
	var timer;
	play();
	container.onmouseover = stop;
	container.onmouseleave = play; 
	function play() {
		timer = setInterval(function() {
			if(!animated) {
			    animate(-500);
			}
		}, 2000);
	}
	function stop() {
		clearInterval(timer);
	}
	function showButton(index) {
		jq(".on")[0].className = "";
        btns[index - 1].className = "on";
	}
	function animate(offset) {
		if(offset === 0) {
			return;
		}
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 150; // total time
		var interval = 2; // interval time 
		var speed = offset / (time / interval);
		var t;
		function go() {
            list.style.left = parseInt(list.style.left) + speed + "px";
            t = setTimeout(go, interval);
            if((speed > 0 && parseInt(list.style.left) + speed > newLeft) || (speed < 0 && parseInt(list.style.left) + speed < newLeft)) {
            	list.style.left = newLeft + "px";
            	animated = false;
                if(newLeft < -2500) {
        	        list.style.left = -500 + "px";
                } if(newLeft > -500) {
        	        list.style.left = -2500 + "px";
                }
                index = Math.floor(parseInt(list.style.left) / (-500));
                showButton(index);
                clearTimeout(t);
            };
		}
		go();
	}
	jq.click("#next", function() {
		if(!animated) {
			animate(-500);
		}
	});
	jq.click("#prev", function() {
		if(!animated) {
			animate(500);
		}
	});
	jq.delegate("#btns", "span", "click", function() {
		var nextIndex = this.getAttribute("index");
		var currentIndex = jq(".on")[0].getAttribute("index");
		var indexDiff = nextIndex - currentIndex;
		if(!animated) {
			animate(-500 * indexDiff);
		}
	});
}