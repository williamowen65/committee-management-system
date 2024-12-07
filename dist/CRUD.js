
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
        console.log("read data", { firebase })
    },
    listen: async function (collection, id, cb) {
        if (id) {
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
        const query = firebase.query(firebase.collection(firebase.db, collection))
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
        await firebase.setDoc(docRef, data, { merge: true })
    },
    delete: async function (id) {
        console.log("delete data", id)
    },
    /**
     * Saves an image to Firebase Storage and returns the download URL.
     * 
     * @param {File} file - The file to be uploaded.
     * @param {string} path - The storage path where the file will be saved.
     * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded file.
     */
    saveImage: async function (file) {
        console.log("save image", { file })
        // make sure the file name format has no spaces
        const fileName = file.name.replace(/\s/g, '-');


        const storageRef = firebase.storage.ref(firebase.storage.getStorage(), fileName);
        const snapshot = await firebase.storage.uploadBytesResumable(storageRef, file);
        console.log('Uploaded a blob or file!', snapshot);
        // return the url to view 
        return await firebase.storage.getDownloadURL(storageRef)
    },
    removeImage: async function (fileName, userId, path, fieldToRemove) {
        console.log("remove image", { fileName, userId, path })
        const storageRef = firebase.storage.ref(firebase.storage.getStorage(), fileName);
        await firebase.storage.deleteObject(storageRef)
        if(userId){
            const docRef = firebase.doc(firebase.collection(firebase.db, path), userId)
            await firebase.setDoc(docRef, { [fieldToRemove]: firebase.deleteField() }, { merge: true })
        }

    }
}