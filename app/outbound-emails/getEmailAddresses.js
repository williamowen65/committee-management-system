export async function getEmailAddresses(options = {
    committees: [],
    roles: [],
}){
    // Get all the emails listed in the committees and roles
    let { committees, roles } = options;

    const emails = []

    const committeeRoles = await CRUD.readAll('committee-roles')

    const ghostContracts = await CRUD.readAll('ghost-contracts')

    // get all the ids of the roles that are in the committees
    const roleIds = Object.entries(committeeRoles)
        .filter(([key, role]) => committees.includes(role.committee))
        .map(([key]) => key);

    // combine roleIds and roles (passed in)
    roles = roles.concat(roleIds)

    // convert role to set
    roles = [...new Set(roles)]
    
    // get all the emails of the contracts that have the role ids
    ghostContracts.forEach(contract => {
        const email = contract.artistDetails.personalEmail || contract.artistDetails.businessEmail;
        // compare roles to the contract role
        if(roles.some((roleId) => contract.committeeRoleId && contract.committeeRoleId.includes(roleId))) {
            emails.push(email);
        }
        
    })

    console.log({roles, options, committeeRoles})
    return emails
}