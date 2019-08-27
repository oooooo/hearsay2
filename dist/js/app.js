var messagesRef = new Firebase("https://ooapp.firebaseio.com/"),
    nameField = $("#nameInput"),
    messageField = $("#messageInput"),
    messageList = $("#messageList");
	nameField.keypress(function(e) { 
		13 == e.keyCode && messageField.focus() 
	}), 
	messageField.keypress(function(e) {
    	if (13 == e.keyCode) {
	        var s = nameField.val(),
	            a = messageField.val();
	        messagesRef.push({ name: s, text: a }), 
	        messageField.val(""), 
	        $("#nameInput").attr("readonly", !0) 
	        // 講話
			var speakkk = new SpeechSynthesisUtterance(a);
			speechSynthesis.speak(speakkk);
	    } 
	}), 
	messagesRef.limitToLast(20).on("child_added", function(e) {
	    var s = e.val(),
	        a = s.name || "I'm the King's Barber",
	        i = s.text,
	        n = $("<li class='fla'></li>"),
	        t = $("<span></span>");
	    t.text(a), 
	    n.text(i).append(t), 
	    messageList.append(n) 
	});
