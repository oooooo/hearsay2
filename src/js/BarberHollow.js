 // 建立一個 FIREBASE資料庫，指定給 messagesRef 變數，所以 messagesRef 是個 FIREBASE 資料庫
  var messagesRef = new Firebase('https://ooapp.firebaseio.com/');

  // 註冊 DOM 元素
  var nameField = $('#nameInput');        // 命名"姓名欄位" 給變數 nameField
  var messageField = $('#messageInput');  // 命名"留言欄位" 給變數 messageField 
  var messageList = $('#messageList');    // 命名"留言列表" 給變數 messageList

  nameField.keypress(function (e) {
    if (e.keyCode == 13) {   
      messageField.focus(); 
    }
  });







  // 監聽 "留言欄位"，當他被按下 Enter 後
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {                // (Enter = 13)
      var username = nameField.val();     //將 (姓名欄位值) "nameField" 值記在變數 username 中
      var message = messageField.val();   //將 (留言欄位值) "messageField" 值記在變數 message 中

      //SAVE DATA TO FIREBASE AND EMPTY FIELD 
      messagesRef.push({name:username, text:message});    //在資料庫中存入一個物件，裡面有兩個資料
      messageField.val('');                               //將留言欄位清空
      $('#nameInput').attr("readonly",true)               //將姓名欄位設置為 readonly 
    }
  });
  // >>> 監聽 "留言欄位"，當他被按下 Enter 後
  // >>> 在資料庫中增加資料,
  // >>> 留言欄位清空
  // >>> 姓名欄位設置為 readonly 

  // 給每个個別的聊天訊息，增加一個"被触发的 callback"(???), 即: function (snapshot)
  messagesRef.limitToLast(20).on('child_added', function (snapshot) {
      //資料庫中最後的2條新訊息
      //當 子節點新增事件 被觸發的時候，執行 以下 function...
    //GET DATA 取得資料庫上有的資料
    var data = snapshot.val();                              //取得 snapshot 的值給變數 data 
    var username = data.name || "I'm the King's Barber";    //取得 data.name 的值給變數 username，沒有的話給 "anonymous"
    var message = data.text;                                //取得 data.text 的值給變數 message 

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT 
    //建立元素、留言、消除text
    var messageElement = $("<li class='fla'></li>");                 //變數 messageElement 指定為 html 容器: <li></li>
    var nameElement = $("<span></span>") //變數 nameElement 指定為 html 容器: <span class='barbersay'></span> 

    nameElement.text(username);                         //<span class='barbersay'> username </span>
    messageElement.text(message).append(nameElement);  //<li> message </li>
    //prepend() 方法在被选元素内部的开头插入指定内容          //<li> <span class='barbersay'> message </span>
    

    //ADD MESSAGE: append() 在被选元素内部的"最後"插入指定内容: 新的在最下面
    //但這改成在最上面: prepend()
    messageList.append(messageElement); 
     
    //<ul> ... > 3 > 2 > 1 </ul> 
    //SCROLL TO BOTTOM OF MESSAGE LIST 將捲軸滑到最上面，顯示最新的。
    //messageList[0].scrollTop = messageList[0].scrollHeight;

  });
  // >>> 資料庫最後的2筆新訊息，當 child_added 事件被觸發的時候，
  // >>> 姓名用 span 包起來後接 ":"
  // >>> 留言元素 li 放入文字，前面插入姓名
  // >>> 留言列表中從最上面新增 留言元素