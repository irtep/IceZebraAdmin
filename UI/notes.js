// add user template
db.collection("users").add({
  userName: 'ilppo',
  chatNick: 'Pääkalloluola',
  password: 'nesenta',
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
