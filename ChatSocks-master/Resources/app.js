var win = Ti.UI.createWindow({
	backgroundColor:'green'
});

var webview = Ti.UI.createWebView({
	url:'webview.html',
	top:0,
	left:0,
	width:'100%',
	height:'420'
	});
	
var button = Ti.UI.createButton({
	title: 'Send',
	top:420,
	height:40,
	width:'100%'
});

button.addEventListener('click', function(e) {
	Ti.App.fireEvent("app:sendMessage", { message: 'send this message'});
});
	
win.add(webview);
win.add(button);
win.open();
