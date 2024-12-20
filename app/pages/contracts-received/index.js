document.addEventListener('DOMContentLoaded', () => {

    CRUD.readAll('ghost-contracts').then(renderContracts)
})

function renderContracts(contracts) {
    console.log("contracts", contracts)
    const contractsDiv = document.querySelector('#contracts')
    contractsDiv.innerHTML = ''
    contracts.forEach(contract => {
        const contractDiv = document.createElement('contract-received')

        const contractData = {
            firstName: contract?.artistDetails?.firstName || '',
            lastName: contract?.artistDetails?.lastName || '',
            membershipPaid: contract?.artistDetails?.membershipPaid || '',
            scholarshipApplied: contract?.artistDetails?.scholarshipApplied || '',
            studioSharingAnswer: contract?.artistDetails?.studioSharingAnswer || '',
            artisticDemonstration: contract?.artistDetails?.artisticDemonstration || '',
            artistStatement: contract?.artistDetails?.artistStatement || '',
            artistTagline: contract?.artistDetails?.artistTagline || '',
            businessEmail: contract?.artistDetails?.businessEmail || '',
            facebook: contract?.artistDetails?.facebook || '',
            instagram: contract?.artistDetails?.instagram || '',
            mailingAddress: contract?.artistDetails?.mailingAddress || '',
            personalEmail: contract?.artistDetails?.personalEmail || '',
            phone: contract?.artistDetails?.phone || '',
            studioAddress: contract?.artistDetails?.studioAddress || '',
            website: contract?.artistDetails?.website || '',
            committeeRoleId: contract?.committeeRoleId || '',
            artistInStudioImage: contract?.images?.artistInStudioImage || '',
            brochureImage: contract?.images?.brochureImage || '',
            digitalImage1: contract?.images?.digitalImage1 || '',
            digitalImage2: contract?.images?.digitalImage2 || '',
            digitalImage3: contract?.images?.digitalImage3 || '',
            signature: contract?.signature || '',
        }

        // set each attribute
        Object.keys(contractData).forEach(key => {
            contractDiv.setAttribute(key, contractData[key])
        })




        contractDiv.init()


        contractsDiv.appendChild(contractDiv)
    })
}