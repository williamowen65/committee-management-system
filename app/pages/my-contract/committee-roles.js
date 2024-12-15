const roles = {
    // Board Members
    1: {
        title: 'President',
        committee: 'Board',
        responsibility: 'Oversee all aspects of the organization',
        prerequisite: 'Previous experience in a leadership role',
        tasks: [],
        sideBarButtons: []
    },
    2: {
        title: 'Vice President',
        committee: 'Board',
        responsibility: 'Assist the President and oversee the committees',
        prerequisite: 'Experience in organizational management',
        tasks: [],
        sideBarButtons: []
    },
    3: {
        title: 'Treasurer',
        committee: 'Board',
        responsibility: "Manage the organization's finances",
        prerequisite: 'Experience in financial management',
        tasks: [],
        sideBarButtons: []
    },
    4: {
        title: 'Secretary',
        committee: 'Board',
        responsibility: 'Record and distribute meeting minutes',
        prerequisite: 'Strong organizational and communication skills',
        tasks: [],
        sideBarButtons: []
    },
    5: {
        title: 'Member-at-large',
        committee: 'Board',
        responsibility: 'Assist with various tasks as needed',
        prerequisite: 'Willingness to assist with various tasks',
        tasks: [],
        sideBarButtons: []
    },
    6: {
        title: 'Web Design/Maintenance Chair',
        committee: 'Web Design and Maintenance',
        responsibility: "Maintain the organization's website",
        prerequisite: 'Experience in web design and maintenance',
        tasks: [],
        sideBarButtons: []
    },
    7: {
        title: 'Social Media Chair',
        committee: 'Social Media',
        responsibility: "Manage the organization's social media accounts",
        prerequisite: 'Experience in social media management',
        tasks: [],
        sideBarButtons: []
    },
    8: {
        title: 'Design general GHOST posts (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
        prerequisite: 'Experience with Canva and social media design',
        tasks: [],
        sideBarButtons: []
    },
    9: {
        title: 'Design mosaics of individual artists (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
        prerequisite: 'Experience with Canva and social media design',
        tasks: [],
        sideBarButtons: []
    },
    10: {
        title: 'Design Sponsor and "Make It a Weekend" posts (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
        prerequisite: 'Experience with Canva and social media design',
        tasks: [],
        sideBarButtons: []
    },
    11: {
        title: 'Prepare short videos',
        committee: 'Social Media',
        responsibility: 'Create posts for the organization',
        prerequisite: 'Experience in video creation and editing',
        tasks: [],
        sideBarButtons: []
    },
    12: {
        title: 'Artist Images Chair',
        committee: 'Art Images',
        responsibility: 'Take photos of artists',
        prerequisite: 'Experience in photography',
        tasks: [],
        sideBarButtons: []
    },
    13: {
        title: 'Brochure and Poster Chair',
        committee: 'Marketing',
        responsibility: 'Design brochures and posters',
        prerequisite: 'Experience in graphic design',
        tasks: [],
        sideBarButtons: []
    },
    14: {
        title: 'Brochure and Poster Designer',
        committee: 'Marketing',
        responsibility: 'Design brochures and posters',
        prerequisite: 'Experience in graphic design',
        tasks: [],
        sideBarButtons: []
    },
    15: {
        title: 'New Artist Recruitment Chair',
        committee: 'Recruitment',
        responsibility: 'Recruit new artists',
        prerequisite: 'Experience in recruitment',
        tasks: [],
        sideBarButtons: []
    },
    16: {
        title: 'New Artist Recruitment Assistant',
        committee: 'Recruitment',
        responsibility: 'Recruit new artists',
        prerequisite: 'Experience in recruitment',
        tasks: [],
        sideBarButtons: []
    },
    17: {
        title: 'New Artist Applications Chair',
        committee: 'Artists Applications',
        responsibility: 'Review new artist applications',
        prerequisite: 'Experience in reviewing applications',
        tasks: [],
        sideBarButtons: []
    },
    18: {
        title: 'Distribution Chair',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    19: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Gig Harbor (Downtown, Pioneer Ave and Kimball Ave)',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    20: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Gig Harbor (Costco corridor and Point Fosdick business corridor)',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    21: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Port Orchard/Olalla (including on the Southworth ferry)',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    22: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to selected areas in Seattle, Bellevue and Mercer Island',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    23: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to selected areas in Bremerton (including on the ferry), Bainbridge Island, Poulsbo and Port Townsend',
        prerequisite: 'Experience in distribution',
        tasks: [],
        sideBarButtons: []
    },
    24: {
        title: 'Sponsorship Chair',
        committee: 'Sponsorship',
        responsibility: 'Oversee sponsorship activities and relationships with sponsors (including paid ads)',
        prerequisite: 'Experience in sponsorship management',
        tasks: [],
        sideBarButtons: []
    },
    25: {
        title: 'Sponsorship Assistant',
        committee: 'Sponsorship',
        responsibility: 'Assist with sponsorship activities and maintain relationships with sponsors (including paid ads)',
        prerequisite: 'Experience in sponsorship management',
        tasks: [],
        sideBarButtons: []
    },
    26: {
        title: 'Signs for Artist Studios Chair',
        committee: 'Signs for Artist Studios',
        responsibility: 'Oversee the creation and distribution of signs for artist studios',
        prerequisite: 'Experience in sign creation and distribution',
        tasks: [],
        sideBarButtons: []
    },
    27: {
        title: 'Signs for Artist Studios Assistant',
        committee: 'Signs for Artist Studios',
        responsibility: 'Sign repairs plus bundling signs for distribution and help collecting signs at end of year',
        prerequisite: 'Experience in sign creation and distribution',
        tasks: [],
        sideBarButtons: []
    },
    28: {
        title: 'Signs for Artist Studios Assistant',
        committee: 'Signs for Artist Studios',
        responsibility: 'Sign repairs plus bundling signs for distribution and help collecting signs at end of year',
        prerequisite: 'Experience in sign creation and distribution',
        tasks: [],
        sideBarButtons: []
    },
    29: {
        title: 'Banners Chair',
        committee: 'Banners',
        responsibility: 'Oversee the creation and distribution of banners',
        prerequisite: 'Experience in banner creation and distribution',
        tasks: [],
        sideBarButtons: []
    },
    30: {
        title: 'Banners Assistant',
        committee: 'Banners',
        responsibility: 'Assist with the creation and distribution of banners',
        prerequisite: 'Experience in banner creation and distribution',
        tasks: [],
        sideBarButtons: []
    },
    31: {
        title: 'General Advertising Chair',
        committee: 'General Advertising',
        responsibility: 'Oversee all general advertising activities',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    32: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Gig Harbor (Downtown, Pioneer Ave and Kimball Ave) then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    33: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Gig Harbor (Costco and Point Fosdick business corridors) then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    34: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Port Orchard/Olalla (including near the Southworth ferry) then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    35: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Tacoma and Olympia then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    36: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Seattle, Bellevue and Mercer Island then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    37: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Bremerton (including on the ferry), Bainbridge Island, Poulsbo and Port Townsend then collect them after the tour – early August',
        prerequisite: 'Experience in advertising',
        tasks: [],
        sideBarButtons: []
    },
    38: {
        title: 'Mailing List Coordinator',
        committee: 'Mailing List/Mail Chimp',
        responsibility: 'Manage the mailing list and send out newsletters using Mail Chimp',
        prerequisite: 'Experience in mailing list management',
        tasks: [],
        sideBarButtons: []
    },
    39: {
        title: 'Advertising/Publicity Chair',
        committee: 'Advertising/Publicity',
        responsibility: 'Oversee all advertising and publicity activities',
        prerequisite: 'Experience in advertising and publicity',
        tasks: [],
        sideBarButtons: []
    },
    40: {
        title: 'Information Booth Chair',
        committee: 'Information Booth',
        responsibility: 'Oversee the setup and operation of the information booth',
        prerequisite: 'Experience in event management',
        tasks: [],
        sideBarButtons: []
    },
    41: {
        title: 'Information Booth Assistant',
        committee: 'Information Booth',
        responsibility: 'Assist chair with booth set up and tear down',
        prerequisite: 'Experience in event management',
        tasks: [],
        sideBarButtons: []
    },
    42: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 18th',
        prerequisite: 'Willingness to volunteer',
        tasks: [],
        sideBarButtons: []
    },
    43: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 19th',
        prerequisite: 'Willingness to volunteer',
        tasks: [],
        sideBarButtons: []
    },
    44: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 20th',
        prerequisite: 'Willingness to volunteer',
        tasks: [],
        sideBarButtons: []
    },
}

export default roles


export default roles
