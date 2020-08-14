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

// notes dev day 13aug20
/*
connection ok in and out, admin and customer!
*/
// need to add:
/*
  when admin is connected, then set to db: helper is online and refresher to chatter list.
  ok, now sets ++ to helpers and shows chatters list, however list comes twice
  when customer connects, chat opens only if helper is online,  done!
  if not, then there is chat not available. done!
  when customer clicks close chat, sends request to db to delete that chat

*/
/*
db.collection("helpFiles").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().question} => ${doc.data().response}`);
        // add entry to allData
        const newEntry = {id: doc.id, question: doc.data().question, response: doc.data().response};
        allData.push(newEntry);
        console.log('allData: ', allData);
        // add question to page
        downLeft.innerHTML += `<p id= ${doc.id} class= "clickable">${doc.data().question}</p>`;
        // add event listener to this
        const elements = document.getElementsByClassName('clickable');
        for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', showData, false);
        }
    });
    infoScreen.innerHTML = 'database valmis!'
});
*/
