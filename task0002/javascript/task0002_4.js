window.onload = function() {
	var suggestData = ["abide", "abolish", "allowance", "ambient", "bachelor", "badge", "balcony", "catalogue", "charcoal"];

	// 给input加监听
	var inputArea = jq("input")[0];
	var ulArea = jq("ul")[0];
	ulArea.style.display = "none";

	addInputListener();
	clickLi();
	keydownLi();
	function addInputListener() {
		if(inputArea.addEventListener) {
			inputArea.addEventListener("input", inputHandle);
		} else if(inputArea.attachEvent) {
			inputArea.attachEvent("onpropertychange", ieInputHandle);
		} else {
			inputArea["on" + event] = inputHandle;
		}
	}

	// Firefox, Google Chrome, Opera, Safari from version 5, IE from version 9
	function inputHandle(event) {
		var inputValue = event.target.value;
		inputValueHandle(inputValue);
	} 
	// ie
	function ieInputHandle(event) {
		var inputValue = "";
		if (event.propertyName.toLowerCase() == "value") {
	        inputValue = event.srcElement.value;
	        inputValueHandle(inputValue);
	    }
	}

	/**
	 * 处理input数据
	 * @param  {String} inputValue 实时输入的字符串
	 */
	function inputValueHandle(inputValue) {
		var reg = new RegExp("^" + inputValue, "i");
		if(inputValue) {
			ajax("task0002_4.txt", {
				onsuccess: prompt
			});
		} else {
			ulArea.style.display = "none";
		}

		function prompt(data) {
	    	var promptArr = eval(data);
	    	var liElement = "";
	    	for(var i = 0, len = promptArr.length; i < len; i++) {
	    		var valueMatch = promptArr[i].match(reg);
	    		if(valueMatch) {
	    			liElement += "<li><span>" + valueMatch[0] + "</span>" + promptArr[i].substr(valueMatch[0].length) + "</li>";
	    		}
	    	}
	    	ulArea.innerHTML = liElement;
		    addClass(jq("li")[0], "highlight");
			ulArea.style.display = "";
        }
	}


    
	/**
	 * 事件代理
	 * 鼠标点击li
	 * 悬停li
	 * 离开li
	 */
	function clickLi() {
	    jq.delegate("ul", "li", "mouseover", function() {
	    	addClass(this, "active");
	    });
	    jq.delegate("ul", "li", "mouseout", function() {
	    	removeClass(this, "active");
	    });
	    jq.delegate("ul", "li", "click", function() {
	    	inputArea.value = deleteSpan(this.innerHTML);
	    	ulArea.style.display = "none";
	    });
	}

	function deleteSpan(string) {
		var pattern = /^<span>(\w+)<\/span>(\w+)$/;
		var stringArr = string.match(pattern);
		return stringArr[1] + stringArr[2];
	}

	function keydownLi() {
        addEvent(inputArea, "keydown", function(event) {
	        var highLightLi = jq(".highlight")[0];
	        //down
	        if(event.keyCode == 40) {
                removeClass(highLightLi, "highlight");
                if(highLightLi.nextSibling) {
                	addClass(highLightLi.nextSibling, "highlight");
                } else {
                	addClass(jq("li")[0], "highlight");
                }
	        }
	        
	        //up
	        if(event.keyCode == 38) {
                removeClass(highLightLi, "highlight");
                if(highLightLi.previousSibling) {
                	addClass(highLightLi.previousSibling, "highlight");
                } else {
	                var len = jq("li").length;
	        	    addClass(jq("li")[len - 1], "highlight");
	        	}
	        }
	        
	        //enter
	        if(event.keyCode == 13) {
                inputArea.value = deleteSpan(highLightLi.innerHTML);
	    	    ulArea.style.display = "none";
	        }
        
        });
    }

};

