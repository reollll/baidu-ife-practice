// 2.1.1 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	// 然而，此方法在识别不同的窗口(window)或帧(frame)里的构造的数组会失败
	// return arr && typeof arr === 'object' && arr.constructor === Array;

	//  更好的方式
	return Object.prototype.toString.apply(arr) === '[object Array]';
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
	return fn && typeof fn === "function";
}



// 了解值类型和引用类型的区别，了解各种对象的读取、遍历方式
// 2.1.2 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	var copyObj = {};
    for(var element in src) {
    	if(typeof src[element] != "object" || src[element] == null)
    	    copyObj[element] = src[element];
    	else 
    		copyObj[element] = cloneObject(src[element]);
    }
    return copyObj;
}


// 学习数组、字符串、数字等相关方法
// 2.1.3 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 参考 https://www.toobug.net/article/array_unique_in_javascript.html
function uniqArray(arr) {
	var ret = [];
    var len = arr.length;
    for(var i=0; i<len; i++){
        if(ret.indexOf(arr[i]) == -1)
        ret.push(arr[i]);
    }
    return ret;    
}



// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 2.1.4 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	var len = str.length;
	var result = "";
    for(var i = 0; i < len; i++) {
    	if(str[i] != " " && str[i] != "\t")
    		break;
    }
    for( var j = len - 1; j >= 0; j--) {
    	if(str[j] != " " && str[j] != "\t")
    		break;
    }
    result = str.slice(i, j + 1);
    return result;
}


// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var result = "";
    result = str.replace(/^\s+|\s+$/g, "");
    return result;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var len = arr.length;
    for(var i = 0; i < len; i++) {
    	fn(arr[i], i);
    }

}

// 其中fn函数可以接受两个参数：item和index


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var num = 0;
	for(var attr in  obj) {
        if(obj && obj.hasOwnProperty(attr))
        	num++;
	}
	return num;
}



//学习正则表达式，在util.js完成以下代码
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
// 第一位是【1】开头，第二位则则有【3,4,5,7,8】
// 第三位则是【0-9】，第三位之后则是数字【0-9】
function isMobilePhone(phone) {
    // your implement
    var reg = /^1[34578]\d{9}$/;
    return reg.test(phone);
}

// 参考 http://www.cnblogs.com/vs-bug/archive/2010/03/26/1696752.html




// 3. DOM
//3.1 任务描述

//先来一些简单的，在你的util.js中完成以下任务：

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    if(!hasClass(element, newClassName))
    	element.className += " " + newClassName;
}

function hasClass(element, aClass) {
	return element.className.match(new RegExp("(\\s|^)" + aClass + "(\\s|$)"));
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if(hasClass(element, oldClassName)) {
        var reg = new RegExp("(\\s|^)" + oldClassName + "(\\s|$)");
    	element.className = element.className.replace(reg, "");
    }	
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentElement === siblingNode.parentElement;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var coor = {};
    coor.X = getElementViewLeft(element);
    coor.Y = getElementViewTop(element);
    return coor;
}

function getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollLeft=document.body.scrollLeft;
　　　　} else {
　　　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
　　　　}
　　　　return actualLeft-elementScrollLeft;
　　}
　　function getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　　　}
　　　　return actualTop-elementScrollTop;
　　}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
// 通过查询知道有一个Element.getBoundingClientRect()方法。它返回一个对象，
// 其中包含了left、right、top、bottom四个属性，
// 分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
// 但是用该方法获取到的是元素的相对位置，在出现滚动时，距离会发生改变，
// 要获得绝对位置时，还需要加上滚动的距离。因为Firefox或Chrome的不兼容问题需
// 要进行兼容性处理
function getPosition2(element) {
    var position = {};
    position.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);//获取相对位置+滚动距离=绝对位置.
    position.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return position;
}



// 接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：



// 实现一个简单的Query
function jq (selector) {
	var identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	    whitespace = "[\\x20\\t\\r\\n\\f]",
	    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
	    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	    ridentifier = new RegExp( "^" + identifier + "$" ),
	    

	    matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
	    };
    var hasOwn = ({}).hasOwnProperty,
    arr = [],
    pop = arr.pop,
    push_native = arr.push,
    push = arr.push,
    slice = arr.slice,
    // Use a stripped-down indexOf as it's faster than native
    // https://jsperf.com/thor-indexof-vs-for/5
    indexOf = function( list, elem ) {
	var i = 0,
		len = list.length;
	for ( ; i < len; i++ ) {
		if ( list[i] === elem ) {
			return i;
		}
	}
	return -1;
    };
   

	// Support: IE<9
    var context = context || document;
    var nodeType = context ? context.nodeType : 9;
    var elem, m, match;
    var results = [];
    if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

			// ID selector
			if ( (m = match[1]) ) {

				// Document context
				if ( nodeType === 9 ) {
					if ( (elem = context.getElementById( m )) ) {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}

				// Element context
				} else {

					// Support: IE, Opera, Webkit
					// TODO: identify versions
					// getElementById can match elements by name instead of ID
					if ( newContext && (elem = newContext.getElementById( m )) &&
						contains( context, elem ) &&
						elem.id === m ) {

						results.push( elem );
						return results;
					}
				}

			// Type selector
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Class selector
			} else if ( (m = match[3])  &&
				context.getElementsByClassName ) {

				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			} 
	}

	else {
		var soFar = selector,
		    tokens = [];
		while ( soFar ) {
		    for ( type in matchExpr ) {
		        if ( (match = matchExpr[ type ].exec( soFar )) ){
			        matched = match.shift();
			        tokens.push({
				        value: matched,
				        type: type,
				        matches: match
			        });
			        soFar = soFar.slice( matched.length );
			        soFar = trim(soFar);
		        }
	        }
    }
        //  initially document as default
        var elements = [document];
        for(var i = 0; i < tokens.length; i++) { // tokens: object array, each object stores a selector's value, it's type, and matches used to select elements
        	elements = getCurrentElements(elements, tokens[i]);
            if(!elements)
            	return elements;
        }
        return elements;
        function getCurrentElements(roots, currentSelector) {
        	assert(isArray(roots), "roots for selection must be Array");
        	var elements = [];  // store all the results in an array
        	for(var i = 0, len = roots.length; i < len; i++) { // for each root element in the roots, apply the selector
        	    var collections = [];
				switch(currentSelector.type) {
					case "ID":
						 collections = (roots[i].getElementById(currentSelector.matches[0]));
						 elements.push(collections); 
						 break;
					case "CLASS":
						collections = (roots[i].getElementsByClassName(currentSelector.matches[0]));
						elements = elements.concat(Array.prototype.slice.call(collections));  
						break;
					case "TAG":
						collections = (roots[i].getElementsByTagName(currentSelector.matches[0]));
						elements = elements.concat(Array.prototype.slice.call(collections)); 
						break;
					case "ATTR":
						var allChildren = [];
						allChildren.push(roots[i].getElementsByTagName("*"));
						allChildren = allChildren[0];
						if (currentSelector.matches.indexOf("=") === -1) {
						// only attribute, no value
							for (var j = 0, l = allChildren.length; j < l; j++) {
								if (allChildren[j].getAttribute(currentSelector.matches[0]) !== null) {
									elements.push(allChildren[j]);
								}
							}
						}   else {
						   // both attribute and value
							for (var k = 0, le = allChildren.length; k < le; k++) {
								if (allChildren[k].getAttribute(currentSelector.matches[0]) && allChildren[k].getAttribute(currentSelector.matches[0]) === currentSelector.matches[3]) {
									elements.push(allChildren[k]);
								} 
							}
						}
						break;
					default: // []
						elements = [];
				    }
        	};
        return elements;
        }
    
    };

	
};


function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}


// 我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if (element.addEventListener) {
    	element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
    	element.attachEvent("on" + event, listener);
    } else {
    	element["on" + event] = listener;
    }
    
}


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
     if (element.removeEventListener) {
    	element.removeEventListener(event, listener, false);
    } else if (element.tachEvent) {
    	element.detachEvent("on" + event, listener);
    } else {
    	element["on" + event] = null;
    }
}


// 接下来我们实现一些方便的事件方法
// 实现对click事件的绑定
// function addClickEvent(element, listener) {
//     // your implement
//     addEvent(element, "click", listener);
    
// }

// 实现对于按Enter键时的事件绑定
// function addEnterEvent(element, listener) {
//     // your implement
//     addEvent(element, "keydown", function(e) {
//     	var oEvent = e || widow.event;
//     	if(oEvent.keyCode === 13) {
//     		listener();
//     	}
//     });
// }

// for test
// addClickEvent(span, function(e) {
// 	span.style.backgroundColor = "#FF0";
// });
// addEnterEvent(div, function(e) {
// 	div.style.backgroundColor = "#0FF";
// })
jq.on = function(selector, event, listener) {
            if (jq(selector)[0].addEventListener) {
    	        jq(selector)[0].addEventListener(event, listener, false);
            } else if (jq(selector)[0].attachEvent) {
    	        jq(selector)[0].attachEvent("on" + event, listener);
            } else {
    	        jq(selector)[0]["on" + event] = listener;
            }
    
        };
jq.un = function(selector, event, listener) {
            if (jq(selector)[0].removeEventListener) {
    	        jq(selector)[0].removeEventListener(event, listener, false);
            } else if (jq(selector)[0].tachEvent) {
    	        jq(selector)[0].detachEvent("on" + event, listener);
            } else {
    	    jq(selector)[0]["on" + event] = null;
            }
        }

jq.click = function (selector, listener) {
               jq.on(selector, "click", listener);
           };

jq.enter = function (selector, listener) {
               jq.on(selector, "keydown", function(e) {
    	           var oEvent = e || widow.event;
    	           if(oEvent.keyCode === 13) {
    		           listener();
    	           }
                });
 
            };
// for test
// jq.enter(div, function(e) { // div needs to be somewhat input
// 	div.style.backgroundColor = "#333";
// })
// jq.click(li, function(e) {
// 	li.style.backgroundColor = "#FF0";
// });


// for test
// function renderList() {
//     jq("#readme article ul")[12].innerHTML = '<li>new item</li>';
// }

jq.each = function(elements, fn) {
	for(var a = 0, elLen = elements.length; a < elLen; a++) {
		fn(elements[a]);
	}
};

// for test
// function init() {
// //     jq.each(ul.getElementsByTagName('li'), function(item) {
// //         jq.click(item, clickListener);
// //     });

//     jq.click('#btn', renderList);
// }
// init();

jq.delegate = function (selector, tag, eventName, listener) {
    // your implement
    return jq.on(selector, eventName, function(ev) {
    	var oEvent = ev || event; // 兼容处理
    	var target = oEvent.target || oEvent.srcElement;
    	if(target.tagName.toLocaleLowerCase() === tag){
    		listener.call(target, oEvent);
    	}
    })
};

// for test
// function clickListener(event) {
//     alert(event);
// }

// jq.delegate('#list', "li", "click", clickListener);


// 5. BOM

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var uUserAgent = navigator.userAgent;
    var ieAgent = uUserAgent.match(/msie (\d+.\d+)/i);
    if(ieAgent) {
    	return ieAgent[1];
    } else {
    	if (uUserAgent.match(/Trident\/7.0;/i)) {
    		ieAgent = uUserAgent.match(/rv:(\d+.\d+)/i);
    		return ieAgent[1];
    	}
    	return -1;
    }
}

// 设置cookie
function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


// 获取cookie值
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

// 检查
function checkCookie()
{
username=getCookie('username')
if (username!=null && username!="")
  {alert('Welcome again '+username+'!')}
else 
  {
  username=prompt('Please enter your name:',"")
  if (username!=null && username!="")
    {
    setCookie('username',username,365)
    }
  }
}




/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *   @config {string} [options.type] 请求发送的类型。默认为GET。
 *   @config {Object} [options.data] 需要发送的数据。
 *   @config {Function} [options.onsuccess] 请求成功时触发，function(oAjax.responseText, oAjax)。（必须）
 *   @config {Function} [options.onfail] 请求失败时触发，function(oAjax)。(oAJax为XMLHttpRequest对象)
 *
 *@returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
function ajax(url, options) {
    //1.创建ajax对象
    var oAjax = null;
        /**
         * 此处必须需要使用window.的方式,表示为window对象的一个属性.不存在时值为undefined,进入else
         * 若直接使用XMLHttpRequest,在不支持的情况下会报错
         **/
    if (window.XMLHttpRequest) {
        //IE6以上
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.连接服务器
    //open(方法,url,是否异步)
    var param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; //缓存data
    if (typeof (data) === "object") {
        for (var key in data) { //请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + "=" + data[key] + "&";
            }
        }
        param.replace(/&$/, "");
    } else {
        param = "timestamp=" + new Date().getTime();
    }
    //3.发送请求
    var type = options.type ? options.type.toUpperCase() : "GET";
    if (type === "GET") {
        oAjax.open("GET", url + "?" + param, true);
        oAjax.send();
    } else {
        oAjax.open("POST", url, true);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(param);
    }
    //4.接收返回
    //OnRedayStateChange事件
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                //先判断是否存在请求失败函数
                //存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(oAjax);
                }
            }
        }
    };
    return oAjax;//发送请求的XMLHttpRequest对象
}