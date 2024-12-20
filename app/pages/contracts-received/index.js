document.addEventListener('DOMContentLoaded', () => {

    CRUD.readAll('ghost-contracts').then(renderContracts)
})

function renderContracts(contracts){
    console.log("contracts", contracts)
    const contractsDiv = document.querySelector('#contracts')
    contractsDiv.innerHTML = ''
    contracts.forEach(contract => {
        const contractDiv = document.createElement('contract-received')





        contractDiv.init()


        contractsDiv.appendChild(contractDiv)
    })
}