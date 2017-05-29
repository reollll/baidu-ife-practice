window.onload = function() {
	// 给每个小块加上dragstart事件，获取其内容（id）
    jq.delegate("#container1", "div", "dragstart", dragListener);
    jq.delegate("#container2", "div", "dragstart", dragListener);

    // 给两个容器加上dragover时的事件，允许放置
    // bug 发现取消默认之后，子元素也会变成可以放置的容器了。解决起来有些麻烦，还没解决
    jq.on("#container1", "dragover", allowDrop);
    jq.on("#container2", "dragover", allowDrop);

    // 给两个容器加上drop时的事件，获取要添加的元素id,并加入子元素。
    jq.on("#container1", "drop", dropListener);
    jq.on("#container2", "drop", dropListener);

    function dragListener(ev) {
    	ev.dataTransfer.setData("Text", ev.target.id);
    }

    function allowDrop(ev) {
    	ev.preventDefault();
    }

    function dropListener(ev) {
    	ev.preventDefault();
    	var data = ev.dataTransfer.getData("Text");
    	ev.target.appendChild(document.getElementById(data));
    }
}