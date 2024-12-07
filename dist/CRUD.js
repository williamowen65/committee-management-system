/**
 * The CRUD pattern in this app is to update both Google Sheets and Firestore
 * 
 * Google Sheets is used to give the client a way trigger database changes without having to go into the Firebase console 
 * 
 */


window.CRUD = {
    create: async function (data) {
        console.log("create data", data)
    },
    read: async function () {
        console.log("read data", {firebase})
    },
    readAll: async function () {
        const query =  firebase.query(firebase.collection(firebase.db, 'ghost-contracts'))
       const docs = await firebase.getDocs(query)
       const data = []
        docs.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            data.push(doc.data())
        })
        return data;
    },
    update: async function (id, data) {
        console.log("update data", id, data)
    },
    delete: async function (id) {
        console.log("delete data", id)
    }
}