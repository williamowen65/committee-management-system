export async function getEmailAddresses(options = {
    committees: [],
    roles: [],
}){
    // Get all the emails listed in the committees and roles
    const { committees, roles } = options;

    const emails = []

    const committeeRoles = await CRUD.readAll('committee-roles')

    const ghostContracts = await CRUD.readAll('ghost-contracts')

    ghostContracts.forEach(contract => {
        const email = contract.artistDetails.personalEmail || contract.artistDetails.businessEmail;

        // compare roles to the contract role
        if(roles.some((roleId) => contract.committeeRoleId && contract.committeeRoleId.includes(roleId))) {
            emails.push(email);
            return;
        }

        // check committees like  "Board"
        if (committees.some(committee => committee == committeeRoles[roleId].committee)) {
            emails.push(email);
            return;
        }
        
    })

    return emails
}