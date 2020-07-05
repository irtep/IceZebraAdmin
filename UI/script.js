import { firebaseConfig } from './config.js';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const upperPanel = document.getElementById('upperPanel');
const leftSide = document.getElementById('leftSide');
const mainPart = document.getElementById('mainPart');
const listenSend = document.getElementById('sendMsg').addEventListener('click', sMbuttonClicked);
const messageLine = document.getElementById('chatInput');
const messut = document.getElementById('chatWindow');
const usersName = document.getElementById('usersName');
const usersPw = document.getElementById('pswField');
const listenName = document.getElementById('submitName').addEventListener('click', subName);
const myFile = {
  identified: false,
  myDetails: [],
  myChats: [],
  activeChat: null,
  allChats: []
};
// event listener for enter:
messageLine.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    console.log('myFile.identified', myFile.identified);
    if (myFile.identified === false) {
      console.log('trying enter...');
      subName();
    } else {
      if (messageLine.value !== '') {
        sMbuttonClicked()
      }
    }
  }
});
// destroys chat in its online checks
function delChat(theChat) {
  const toDelete = theChat.target.id.substring(0, theChat.target.id.length-8);
  // Delete old chat from database
  db.collection("chats").doc(toDelete).delete();
  // refresh leftSide
}
// makes correct message line
function sendMessage(myName, myMessage){
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const newMsg = messageLine.value;
  const allMsg = `<br>${h}:${m}:${s} ${myName}: ${myMessage}`;
  return allMsg;
}
// sendMessageButton clicked
function sMbuttonClicked() {
  if (messageLine.value !== '') {
    //console.log('sending. myFile: ', myFile);
    const freshMsg = sendMessage(myFile.myDetails[0].chatNick, messageLine.value);
    messageLine.value = '';
    // find ref number
    myFile.allChats.forEach( (chat, idx) => {
      if (chat.docRefId === myFile.activeChat) {
        //console.log('found the chat...', chat.docRefId, myFile.activeChat);
        chat.messages.push(freshMsg);
        //console.log('pushing: ', chat.messages);
        db.collection('chats').doc(myFile.activeChat).update({
          messages: chat.messages
        });
      }
    });
  }
}
// submits users name
function subName() {
  if (usersName.value !== '' && usersPw.value !== '') {
    // check if username and psw are ok
    db.collection("users").get().then( (querySnapshot) => {
      querySnapshot.forEach( (doc) => {
        if (doc.data().userName === usersName.value &&
        doc.data().password === usersPw.value) {
          // username and psw found
          myFile.myDetails.push(doc.data());
          console.log('id ok');
          myFile.identified = true;
          // show what need to show, and dont want dont
          mainPart.classList.remove('noShow');
          upperPanel.innerHTML = ' tänne tulee työkalupainikkeita, josta voi esim vaihella omia chatnickejä tms.';
          leftSide.innerHTML = 'chatit:<br>'
        }
      });
    });
  }
}
function clickedChat(chat) {
  console.log('clicked: ', chat.target.id);
  myFile.allChats.forEach( (xhat, idx) => {
    if (chat.target.id === xhat.chatId) {
      if (xhat.hasAgent === false) {
        xhat.hasAgent = myFile.myDetails[0].userName;
        xhat.hasAgent = true;
      }
      messut.innerHTML = xhat.messages;
      myFile.activeChat = xhat.docRefId;
      // scrolling to down
      messut.scrollTop = messut.scrollHeight;
      // check if customer still online
      const seconds = new Date().getTime() / 1000;
      const docRef = db.collection("connectionCheck").doc(myFile.activeChat);
      docRef.get().then((doc) => {
        if (doc.exists) {
        //console.log("Document data:", doc.data().lastCheck);
        if (seconds-doc.data().lastCheck > 120) {
          //console.log('result: ', seconds-doc.data().lastCheck);
          //console.log('this guy has disconnected');
          const deleteToken = JSON.parse(JSON.stringify(myFile.activeChat)) + '_destroy';
          messut.innerHTML += 'customer has disconnected.';
          messut.innerHTML += `<button id= "${deleteToken}">delete chat</button>`;
          //const deleteToken = JSON.parse(JSON.stringify(myFile.activeChat));
          document.getElementById(deleteToken).addEventListener('click', delChat);
        } else {
          //console.log('result: ', seconds-doc.data().lastCheck);
          //console.log('this guy is online');
        }
        // here check the erotus...
        } else {
          // doc.data() will be undefined in this case
          //console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  });
}
// real time listener of firestore
db.collection("chats").orderBy("name").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    let adjective = '';
    let helper = '';
    //console.log(change.doc.data());
    // New chat came
    if (change.type == "added") {
  //   if (change.doc.data().chatId === myChat.id) {
      myFile.allChats.push(change.doc.data());
    //  console.log('new chat!', );
  //    }
   // chat disconnected
    } else if (change.type == "removed") {
      myFile.allChats.forEach( chat => {
        if (chat.chatId === change.doc.data().chatId) {
          chat.borders = 'redBorders';
          //chat.messages.push(`<br><input type= "button" value= "close chat" id= "${chat.chatId}">`);
        }
      });
    //  console.log('chat disconnected');
    // New message to chat
    } else if (change.type === 'modified') {
      myFile.allChats.forEach( chat => {
        if (chat.chatId === change.doc.data().chatId) {
          chat.borders = 'blueBorders';
          chat.messages = change.doc.data().messages;
          // if this is active at the moment
          if (myFile.activeChat === change.doc.data().docRefId) {
            messut.innerHTML = change.doc.data().messages;
            // scrolling to down
            messut.scrollTop = messut.scrollHeight;
          }
        }
      });
    //  console.log('new message in chat');
    }
    // write chats to left side
    if (myFile.identified) {
      leftSide.innerHTML = '';
      myFile.allChats.forEach( chat => {
        chat.hasAgent ? adjective = 'is being helped by' : adjective = 'needs agent!';
        if (chat.agent !== null) { helper = chat.agent };
        leftSide.innerHTML += `<div class= "chatsAtLeft ${chat. borders}" id= "${chat.chatId}">
        ${chat.name} ${adjective} ${helper}</div>`;
      });
    }
    // event listener for chats at left
    const elements = document.getElementsByClassName('chatsAtLeft');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', clickedChat, false);
    }
  });
});

// when window is loaded
window.onload = ( ()=> {
  // focus on command line:
  usersName.focus();
});
// when window is closed
window.onbeforeunload = ( ()=> {
  // if need something here...
});
