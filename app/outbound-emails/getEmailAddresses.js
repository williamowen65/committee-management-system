export async function getEmailAddresses(options = {
    committees: [],
    roles: [],
}) {
    // Get all the emails listed in the committees and roles
    let { committees, roles } = options;

    

    const committeeRoles = await CRUD.readAll('committee-roles').then(roles => roles.sort((a, b) => Number(a.fbId) - Number(b.fbId)))

    const ghostContracts = await CRUD.readAll('ghost-contracts').then(contracts => contracts.sort((a, b) => Number(a.fbId) - Number(b.fbId)))

    // combine ghostContracts and committeeRoles at committeeRoles[key].members = []
    ghostContracts.forEach(contract => {
        if (contract.committeeRoleId) {
            contract.committeeRoleId.forEach(roleId => {
                if (committeeRoles[roleId]) {
                    if (!committeeRoles[roleId].members) {
                        committeeRoles[roleId].members = []
                    }
                    // console.log({ roleId, contract })
                    committeeRoles[roleId].members.push(contract)
                }
            })
        }
    })

    // console.log({ committeeRoles, ghostContracts, committees, roles })

    // get all the ids of the roles that are in the committees
    const roleIds = Object.entries(committeeRoles)
        .filter(([key, role]) => committees == role.committee)
        .map(([key]) => key);

    // combine roleIds and roles (passed in)
    roles = roles.concat(roleIds)

    // convert role to set
    roles = [...new Set(roles)]

    // convert roles to members 
    const membersToEmail = roles.map(roleId => committeeRoles[roleId].members).flat()

    // console.log({ membersToEmail })

    // get all the emails of the contracts that have the role ids
    let emails = membersToEmail.map(contract => {
        if(!contract.artistDetails) return
        return contract.artistDetails.personalEmail || contract.artistDetails.businessEmail;
    }).filter(Boolean)

    emails = [...new Set(emails)]

    // console.log({ roles, options, committeeRoles, roleIds, ghostContracts })
    return emails
}