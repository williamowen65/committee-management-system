export async function processContractsToSheets() {

    // get all roles
    const roles = await CRUD.readAll('committee-roles')

    const sheetName = `GHOST Contracts ${new Date().getFullYear()}`
    if (!sheetName) return



    // get all contracts
    const contracts = await CRUD.readAll('ghost-contracts').then(contracts => {
        return contracts.map(contract => {
            console.log({ contract })
            return {
                "GHOST Member Id": contract?.userId || "", //          "GHOST Member Id",
                "First Name": contract?.artistDetails?.firstName || "", //             "First Name",
                "Last Name": contract?.artistDetails?.lastName || "", //             "Last Name",
                "Membership Paid:": contract?.artistDetails.membershipPaid || 'FALSE', //             "Membership Paid:",
                "Committee Role(s)": contract?.committeeRoleId?.map(roleId => roles[roleId]?.title).join(", ") || "", //             "Committee Role(s)",
                "Personal Email": contract?.artistDetails?.personalEmail || "", //             "Personal Email",
                "Business Email": contract?.artistDetails?.businessEmail || "", //             "Business Email",
                "Phone": contract?.artistDetails?.phone || "", //             "Phone",
                "Mailing Address": contract?.artistDetails?.mailingAddress || "", //             "Mailing Address",
                "Studio Address": contract?.artistDetails?.studioAddress || "", //             "Studio Address",
                "Medium": contract?.artistDetails?.medium || "", //             "Medium",
                "Artist Tagline": contract?.artistDetails?.artistTagline || "", //             "Artist Tagline",
                "Artist Statement": contract?.artistDetails?.artistStatement || "", //             "Artist Statement",
                "Artistic Demonstration": contract?.artisticDemonstration || "", //             "Artistic Demonstration",
                "Mentorship Requested": contract?.artistMentor ? true : false, //             "Mentorship Requested",
                "Website": contract?.artistDetails?.website || "", //             "Website",
                "Facebook": contract?.artistDetails?.facebook || "", //             "Facebook",
                "Instagram": contract?.artistDetails?.instagram || "", //             "Instagram",
                'Digital Image 1': contract?.images?.digitalImage1 || "", //             'Digital Image 1',
                'Digital Image 2': contract?.images?.digitalImage2 || "", //             'Digital Image 2',
                'Digital Image 3': contract?.images?.digitalImage3 || "", //             'Digital Image 3',
                'Artist in Studio Image': contract?.images?.artistInStudioImage || "", //             'Artist in Studio Image',
                'Brochure Image': contract?.images?.brochureImage || "", //             'Brochure Image',
                'Studio Sharing Answer': contract?.StudioSharingAnswer || "", //             'StudioSharingAnswer',
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
            "Membership Paid:",
            "Committee Role(s)",
            "Personal Email",
            "Business Email",
            "Phone",
            "Mailing Address",
            "Studio Address",
            "Medium",
            'Studio Sharing Answer',
            "Artist Tagline",
            "Artist Statement",
            "Artistic Demonstration",
            "Mentorship Requested",
            "Website",
            "Facebook",
            "Instagram",
            'Digital Image 1',
            'Digital Image 2',
            'Digital Image 3',
            'Artist in Studio Image',
            'Brochure Image',
        ]
    })
}



