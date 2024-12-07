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
    listen: async function (collection, id, cb) {
        if(id) {
            return firebase.onSnapshot(firebase.doc(firebase.collection(firebase.db, collection), id), (doc) => {
                cb(doc.data())
            });
        } else { // listening to collection
            return firebase.onSnapshot(firebase.collection(firebase.db, collection), (snapshot) => {
                const data = []
                snapshot.forEach(doc => {
                    data.push(doc.data())
                })
                cb(data)
            });
        }
    },
    readAll: async function (collection) {
        const query =  firebase.query(firebase.collection(firebase.db, collection))
       const docs = await firebase.getDocs(query)
       const data = []
        docs.forEach(doc => {
            data.push(doc.data())
        })
        return data;
    },
    update: async function (collection, id, data) {
        console.log("update data", { collection, id, data })
        data.userId = id;
        const docRef = firebase.doc(firebase.collection(firebase.db, collection), id)
        await firebase.setDoc(docRef, data, {merge: true})
    },
    delete: async function (id) {
        console.log("delete data", id)
    }
}