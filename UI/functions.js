
/*
export function updateChatsPanel(leftSide, db, myFile) {
  db.collection("chats").get().then((snapshots) => {
    snapshots.forEach( chatInDb => {
      if (myFile.allChats === []) {
        myFile.allChats.push(chatInDb.data());
      }
    });
    // write chats to left side
    if (myFile.identified) {
      let adjective = '';
      let helper = '';
      leftSide.innerHTML = '';
      myFile.allChats.forEach( chat => {
        chat.hasAgent ? adjective = 'is being helped by' : adjective = 'needs agent!';
        console.log('chat in case: ', chat);
        if (chat.agent !== null) { helper = chat.agent } else { helper = ''; };
        leftSide.innerHTML += `<div class= "chatsAtLeft ${chat.borders}" id= "${chat.chatId}">
        ${chat.name} ${adjective} ${helper}</div>`;
      });
    }
    // event listener for chats at left
    const elements = document.getElementsByClassName('chatsAtLeft');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', clickedChat, false);
    }
  });
}
*/
