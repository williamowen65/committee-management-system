/*
payload:{
    controller: 'docsController',
    folderId: string,
    folderName: string,
    action: ['createDoc', 'deleteDoc', 'convertDocToPDF'],
}
*/
function docsController(payload) {
    console.log("docsController", payload)
    try {
        if (payload.action === 'createDoc') {
            return createDoc(payload);
        } else if (payload.action === 'deleteDoc') {
            return deleteDoc(payload);
        } else if (payload.action === 'convertDocToPDF') {
            return convertDocToPDF(payload);
        }

    } catch (error) {
        return { status: 'error', message: error.message };

    }
    function createDoc(payload) {
        var doc = DocumentApp.create(payload.docName);
        return { status: 'success', message: 'Doc created', data: doc.getId() };
    }

    function deleteDoc(payload) {
        var doc = DocumentApp.openById(payload.docId);
        doc.setTrashed(true);
        return { status: 'success', message: 'Doc deleted' };
    }
    function convertDocToPDF(payload) {
        var doc = DocumentApp.openById(payload.docId);
        var blob = doc.getAs('application/pdf');
        var pdfFile = DriveApp.createFile(blob);
        return { status: 'success', message: 'Doc converted to PDF', data: pdfFile.getId() };
    }
}