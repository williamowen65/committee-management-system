/**
  payload:{
    controller: 'sheetsController',
    sheetName: string,
    spreadsheetId: string,
    action: ['upsert', 'delete'],
    data: {object},
    key: string,
    header: [string]
  }
 */
  function sheetsController(payload) {

    console.log("sheetsController", payload)

    const targetSpreadSheet = SpreadsheetApp.openById(payload.spreadsheetId)
    // get the sheet
    var sheet = targetSpreadSheet.getSheetByName(payload.sheetName);
    // Check if the sheet exists, if not create it
    if (!sheet) {
        sheet = targetSpreadSheet.insertSheet(payload.sheetName);
    }
    // apply action
    if (payload.action === 'upsert') {
        // get the headers
        // Get the headers from the first row of the sheet

        var headers = Object.keys(payload.data);

        var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn() + 1).getValues()[0];
        var newHeaders = headers.filter(function (header) {
            return existingHeaders.indexOf(header) === -1;
        }).sort((a, b) => {
            if (payload.header) {
                return payload.header.indexOf(a) - payload.header.indexOf(b);
            }
            return 0;
        });

        // set the headers if they don't exist
        if (newHeaders.length > 0) {
            sheet.getRange(1, sheet.getLastColumn() + 1, 1, newHeaders.length).setValues([newHeaders]);
            existingHeaders = existingHeaders.concat(newHeaders).filter(Boolean);
        }



        // get the values
        var values = existingHeaders.map(function (header) {
            return payload.data[header] || '';
        });


        // Find out if the row exists by checking for the rowId
        var rowId = payload.data[payload.key];
        // get column of rowId
        var rowIdColumn = existingHeaders.indexOf(payload.key);
        // get the row by searching the rowId column
        var row = null;
        if (rowId) {
            var rowIdValues = sheet.getRange(1, rowIdColumn + 1, sheet.getLastRow(), 1).getValues();
            var rowIndex = rowIdValues.findIndex(function (rowIdValue) {
                return rowIdValue[0] === rowId;
            });
            if (rowIndex > -1) {
                row = sheet.getRange(rowIndex + 1, 1, 1, sheet.getLastColumn() + 1);
            }
        }


        if (row) {
            console.log("Updating row", { row })
            // update the row
            row.setValues([values]);
        } else {
            console.log("Appending row", { values })
            // append the values
            var lastRow = sheet.getLastRow();
            var lastColumn = sheet.getLastColumn();
            var range = sheet.getRange(lastRow + 1, 1, 1, lastColumn + 1);
            range.setValues([values]);
        }
        // iterate over all the values of the sheet and update image cells with function
        sheet.getDataRange().getValues().forEach(function (row, index) {
            console.log("row", row)
            row.forEach(function (cell, cellIndex) {
                console.log("cell", cell)
                console.log("cellIndex", cellIndex)
                const cellValue = cell.trim && cell.trim() || cell
                if (cellValue.includes && cellValue.includes('https://firebasestorage.googleapis.com')) {
                    var cellRange = sheet.getRange(index + 1, cellIndex + 1);
                    cellRange.setFormula('=HYPERLINK("' + cellValue + '", IMAGE("' + cellValue + '"))');

                }
            }
            );
        });


    } else if (payload.action === 'delete') {
        // get the row
        var row = sheet.getRange(payload.data.row, 1, 1, sheet.getLastColumn());
        // delete the row
        row.clear();
    } else if (payload.action === 'upsertAll') {
        // perform the upsert for all the rows
        payload.data.forEach(function (data) {
            sheetsController({
                controller: 'sheetsController',
                sheetName: payload.sheetName,
                spreadsheetId: payload.spreadsheetId,
                action: 'upsert',
                key: payload.key,
                data: data,
                header: payload.header
            });
        });
    }


    return { status: 'success', action: payload.action, message: 'Sheets controller', sheetUrl: targetSpreadSheet.getUrl() };
}