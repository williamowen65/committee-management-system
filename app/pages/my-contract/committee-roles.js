const roles = {
    // Board Members
    1: {
        title: 'President',
        committee: 'Board',
        responsibility: 'Oversee all aspects of the organization',
    },
    2: {
        title: 'Vice President',
        committee: 'Board',
        responsibility: 'Assist the President and oversee the committees',
    },
    3: {
        title: 'Treasurer',
        committee: 'Board',
        responsibility: "Manage the organization's finances",
    },
    4: {
        title: 'Secretary',
        committee: 'Board',
        responsibility: 'Record and distribute meeting minutes',
    },
    5: {
        title: 'Member-at-large',
        committee: 'Board',
        responsibility: 'Assist with various tasks as needed',
    },
    /* Committees */
    // New Artist Recruitment
    15: {
        title: 'New Artist Recruitment Chair',
        committee: 'Recruitment',
        responsibility: 'Recruit new artists',
    },
    16: {
        title: 'New Artist Recruitment Assistant',
        committee: 'Recruitment',
        responsibility: 'Recruit new artists',
    },
    // New Artist Applications
    17: {
        title: 'New Artist Applications Chair',
        committee: 'Artists Applications',
        responsibility: 'Review new artist applications',
    },
    // Website Design and Maintenance
    6: {
        title: 'Web Design/Maintenance Chair',
        committee: 'Web Design and Maintenance',
        responsibility: "Maintain the organization's website",
    },
    // Artist Images
    12: {
        title: 'Artist Images Chair',
        committee: 'Art Images',
        responsibility: 'Take photos of artists',
    },
    // Brochure and Poster 
    13: {
        title: 'Brochure and Poster Chair',
        committee: 'Marketing',
        responsibility: 'Design brochures and posters',
    },
    14: {
        title: 'Brochure and Poster Designer',
        committee: 'Marketing',
        responsibility: 'Design brochures and posters',
    },
    // Distribution
    18: {
        title: 'Distribution Chair',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters',
    },
    19: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Gig Harbor (Downtown, Pioneer Ave and Kimball Ave)',
    },
    20: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Gig Harbor (Costco corridor and Point Fosdick business corridor)',
    },
    21: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to Port Orchard/Olalla (including on the Southworth ferry)',
    },
    22: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to selected areas in Seattle, Bellevue and Mercer Island',
    },
    23: {
        title: 'Distribution Assistant',
        committee: 'Distribution',
        responsibility: 'Distribute brochures and posters to selected areas in Bremerton (including on the ferry), Bainbridge Island, Poulsbo and Port Townsend',
    },

    // Social Media Committee
    7: {
        title: 'Social Media Chair',
        committee: 'Social Media',
        responsibility: "Manage the organization's social media accounts",
    },
    8: {
        title: 'Design general GHOST posts (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
    },
    9: {
        title: 'Design mosaics of individual artists (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
    },
    10: {
        title: 'Design Sponsor and "Make It a Weekend" posts (using Canva)',
        committee: 'Social Media',
        responsibility: "Create posts for the organization's social media accounts",
    },
    11: {
        title: 'Prepare short videos',
        committee: 'Social Media',
        responsibility: 'Create posts for the organization',
    },

    // Sponsorship Committee
    // add 2 roles

    // Signs for Artist Studios
    // add 3 roles for Signs for Artist Studios

    // banners
    // add 2 roles

    // signs for general advertising
    // add 7 roles

    // Mailing List/Mail Chimp
    // add 1 role

    // Advertising/Publicity
    // add 1 role

    // GHOST Information Booth at PAL Summer ARt Festival
    // add 5 roles



}

export default roles
