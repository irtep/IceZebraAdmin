// add user template
db.collection("users").add({
  userName: 'ilppo',
  chatNick: 'Pääkalloluola',
  password: 'xxxxxxxxxx',
  admin: false,
  myChats: []
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
  myChat.docRefId = docRef.id;
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
// Delete old chat from database
//db.collection("chats").doc(myChat.docRefId).delete();


// not working atm:
/*
when clicked should add serving agents name.. doenst really work now...
new message should show somehow..
...after chat is deleted, i think it should be removed from the list.. too
*/
