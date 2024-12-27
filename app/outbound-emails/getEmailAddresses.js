export async function getEmailAddresses(options = {
    committees: [],
    roles: [],
}){
    // Get all the emails listed in the committees and roles
    const { committees, roles } = options;

    const emails = []

    const committeeRoles = await CRUD.readAll('committee-roles')

    const ghostContracts = await CRUD.readAll('ghost-contracts')

    // get all the ids of the roles that are in the committees
    const roleIds = Object.entries(committeeRoles).filter(([key, role]) => {
        if (committees.some(committee => committee == role.committee)) return key
    }).filter(Boolean)

    // combine roleIds and roles (passed in)
    roles = roles.concat(roleIds)

    // get all the emails of the contracts that have the role ids
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