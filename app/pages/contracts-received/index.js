document.addEventListener('DOMContentLoaded', () => {

    CRUD.readAll('ghost-contracts').then(renderContracts)
})

function renderContracts(contracts){
    console.log("contracts", contracts)
    const contractsDiv = document.querySelector('#contracts')
    contractsDiv.innerHTML = ''
    contracts.forEach(contract => {
        const contractDiv = document.createElement('div')
        contractDiv.innerHTML = `
            <h3>${contract.title}</h3>
            <p>${contract.description}</p>
        `
        contractsDiv.appendChild(contractDiv)
    })
}