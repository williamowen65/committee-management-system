export async function processContractsToSheets(){

    
    const sheetName = `GHOST Contracts ${new Date().getFullYear()}`
    if (!sheetName) return



    // get all contracts
    const contracts = await CRUD.readAll('ghost-contracts').then(contracts => {
      return contracts.map(contract => {
        console.log({ contract })
        return {
          "GHOST Member Id": contract?.userId || "",
          "First Name": contract?.artistDetails?.firstName || "",
          "Last Name": contract?.artistDetails?.lastName || "",
          "Committee Role(s)": contract?.committeeRoleId?.map(roleId => roles[roleId]?.title).join(", ") || "",
          "Personal Email": contract?.artistDetails?.personalEmail || "",
          "Business Email": contract?.artistDetails?.personalEmail || "",
          "Phone": contract?.artistDetails?.phone || "",
          "Medium": contract?.artistDetails?.medium || "",
          "Artist Statement": contract?.artistDetails?.artistStatement || "",
          "Website": contract?.artistDetails?.website || "",
          "Facebook": contract?.artistDetails?.facebook || "",
          "Instagram": contract?.artistDetails?.instagram || "",
          'Digital Image 1': contract?.images?.digitalImage1 || "",
          'Digital Image 2': contract?.images?.digitalImage2 || "",
          'Digital Image 3': contract?.images?.digitalImage3 || "",
          'Artist in Studio Image': contract?.images?.artistInStudioImage || "",
        }
      })
    })

    window.sendMessageToParent({
      controller: 'sheetsController',
      sheetName: sheetName,
      spreadsheetId: '1cmfgdGc8L5li_kx79W9SO5-ZwukiaXxlV5EZ3o8RYpY', // spreadsheet "GHOST Spreadsheet Data"
      action: 'upsertAll',
      key: "GHOST Member Id",
      data: contracts,
      header: [
        "GHOST Member Id",
        "First Name",
        "Last Name",
        "Committee Role(s)",
        "Personal Email",
        "Business Email",
        "Phone",
        "Medium",
        "Artist Statement",
        "Website",
        "Facebook",
        "Instagram",
        'Digital Image 1',
        'Digital Image 2',
        'Digital Image 3',
        'Artist in Studio Image'
      ]
    })

}