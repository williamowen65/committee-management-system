/**
 payload:{
    controller: 'driveController',
    folderId: string,
    folderName: string,
    action: ['create', 'delete', 'read'],
}
 */
function driveController(payload) {
    try {

        console.log("driveController", payload)
        if (payload.action === 'createFolder') {
            return createDriveFolder(payload);
        } else if (payload.action === 'deleteFolder') {
            return deleteDriveFolder(payload);
        } else if (payload.action === 'readFolder') {
            return readDriveFolder(payload);
        } else {
            return { status: 'error', message: 'Invalid driveController action' };
        }
    } catch (error) {
        return { status: 'error', message: error.message };
    }


    function createDriveFolder(payload) {
        var folder = DriveApp.createFolder(payload.folderName);


        return { status: 'success', message: 'Folder created', data: folder.getId() };
    }
    function deleteDriveFolder(payload) {
        var folder = DriveApp.getFolderById(payload.folderId);
        folder.setTrashed(true);
        return { status: 'success', message: 'Folder deleted' };
    }
    function readDriveFolder(payload) {
        var folder = DriveApp.getFolderById(payload.folderId);
        var files = folder.getFiles();
        var fileIds = [];
        while (files.hasNext()) {
            var file = files.next();
            fileIds.push(file.getId());
        }
        return { status: 'success', message: 'Folder read', data: fileIds };
    }
}
