jq.click("#btn", function() {
	var inp = jq("#user_input")[0];
    var out = jq("#user_output")[0];
	var value = inp.value.split(/\n|\s+|\,|\，|\、|\;|\；/); //1.根据半角逗号分割成数组。
    var unValue = uniqArray(value); //2.数组去重
    for (var i = 0, len = unValue.length; i < len; i++) {
        var trimValue = trim(unValue[i]); //3.对每一项进行去除首尾空格操作
        console.log(trimValue);
        if (trimValue !== "") { //4.只有在去除首尾空格后不为空的数组才输出。
            out.innerHTML += "<label><input type = 'checkbox'>" + trimValue + "<label>"
        }
    }
    jq("#btn")[0].disabled = true;
});
jq("#btn")[0].disabled = true;
jq("#user_input")[0].oninput = function() {
	if(this.value == "" || this.value.split(/\n|\s+|\,|\，|\、|\;|\；/).length > 10) {
        jq("span")[0].style.display = "";
        jq("#btn")[0].disabled = true;
	} else {
		jq("span")[0].style.display = "none";
		jq("#btn")[0].disabled = false;
	} 
}
