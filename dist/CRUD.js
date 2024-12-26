
/**
 * The CRUD pattern in this app is to update both Google Sheets and Firestore
 * 
 * Google Sheets is used to give the client a way trigger database changes without having to go into the Firebase console 
 * 
 */



// CRUD pattern
window.CRUD = {
    create: async function (collection,data) {
        data.createdAt = firebase.serverTimestamp()
        return await firebase.addDoc(firebase.collection(firebase.db, collection), data)
    },
    read: async function (collection, id) {
        console.log("read data", { collection, id })
        const docRef = firebase.doc(firebase.collection(firebase.db, collection), id)
        const doc = await firebase.getDoc(docRef)
        const docData = doc.data()
        if(docData){
            docData.fbId = doc.id
        }
        return docData || {}
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
                    const docData = doc.data()
                    docData.fbId = doc.id
                    data.push(docData)
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
            // convert createdAt to a formatted date
            const docData = doc.data()
            docData.fbId = doc.id

            if(docData.createdAt){
                docData.createdAt = docData.createdAt.toDate().toLocaleDateString()
            }
            if(docData.date){
                const options = { month: 'long', day: 'numeric' };
                if(docData.date.toDate){
                docData.date = docData.date.toDate().toLocaleDateString('en-US', options);
                } else { // if it's a string
                    const [year, month, day] = docData.date.split('-');
                    const dateObj = new Date(year, month - 1, day); // Months are 0-indexed in JavaScript
                    docData.date = dateObj.toLocaleDateString('en-US', options);
                }
            }

            data.push(docData)
        })
        return data;
    },
    update: async function (collection, id, data) {
        console.log("update data", { collection, id, data })
        data.userId = id;
        const docRef = firebase.doc(firebase.collection(firebase.db, collection), id)
        await firebase.setDoc(docRef, data, { merge: true })
    },
    delete: async function (collection, id) {
        console.log("delete data", id)
        const docRef = firebase.doc(firebase.db, collection, id)
        return await firebase.deleteDoc(docRef)
    },
    /**
     * Saves an image to Firebase Storage and returns the download URL.
     * 
     * @param {File} file - The file to be uploaded.
     * @param {string} path - The storage path where the file will be saved.
     * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded file.
     */
    saveImage: async function (file, destination = "") {
        console.log("save image", { file, destination })
        // make sure the file name format has no spaces
        const fileName = file.name.replace(/\s/g, '-');

        const filePath = `${destination && destination + "/" }${fileName}`;
        const storageRef = firebase.storage.ref(firebase.storage.getStorage(), filePath);
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