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
    // Website Design and Maintenance
    6: {
        title: 'Web Design/Maintenance Chair',
        committee: 'Web Design and Maintenance',
        responsibility: "Maintain the organization's website",
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
    // Sponsorship Committee
    24: {
        title: 'Sponsorship Chair',
        committee: 'Sponsorship',
        responsibility: 'Oversee sponsorship activities and relationships with sponsors (including paid ads)',
    },
    25: {
        title: 'Sponsorship Assistant',
        committee: 'Sponsorship',
        responsibility: 'Assist with sponsorship activities and maintain relationships with sponsors (including paid ads)',
    },
    // Signs for Artist Studios
    26: {
        title: 'Signs for Artist Studios Chair',
        committee: 'Signs for Artist Studios',
        responsibility: 'Oversee the creation and distribution of signs for artist studios',
    },
    27: {
        title: 'Signs for Artist Studios Assistant',
        committee: 'Signs for Artist Studios',
        responsibility: 'Sign repairs plus bundling signs for distribution and help collecting signs at end of year',
    },
    28: {
        title: 'Signs for Artist Studios Assistant',
        committee: 'Signs for Artist Studios',
        responsibility: 'Sign repairs plus bundling signs for distribution and help collecting signs at end of year',
    },
    // banners
    29: {
        title: 'Banners Chair',
        committee: 'Banners',
        responsibility: 'Oversee the creation and distribution of banners',
    },
    30: {
        title: 'Banners Assistant',
        committee: 'Banners',
        responsibility: 'Assist with the creation and distribution of banners',
    },
    // signs for general advertising
    31: {
        title: 'General Advertising Chair',
        committee: 'General Advertising',
        responsibility: 'Oversee all general advertising activities',
    },
    32: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Gig Harbor (Downtown, Pioneer Ave and Kimball Ave) then collect them after the tour – early August',
    },
    33: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Gig Harbor (Costco and Point Fosdick business corridors) then collect them after the tour – early August',
    },
    34: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in Port Orchard/Olalla (including near the Southworth ferry) then collect them after the tour – early August',
    },
    35: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Tacoma and Olympia then collect them after the tour – early August',
    },
    36: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Seattle, Bellevue and Mercer Island then collect them after the tour – early August',
    },
    37: {
        title: 'General Advertising Distributor',
        committee: 'General Advertising',
        responsibility: 'Install 4-5 signs in selected areas in Bremerton (including on the ferry), Bainbridge Island, Poulsbo and Port Townsend then collect them after the tour – early August',
    },
    // Mailing List/Mail Chimp
    38: {
        title: 'Mailing List Coordinator',
        committee: 'Mailing List/Mail Chimp',
        responsibility: 'Manage the mailing list and send out newsletters using Mail Chimp',
    },
    // Advertising/Publicity
    39: {
        title: 'Advertising/Publicity Chair',
        committee: 'Advertising/Publicity',
        responsibility: 'Oversee all advertising and publicity activities',
    },
    // GHOST Information Booth at PAL Summer Art Festival
    40: {
        title: 'Information Booth Chair',
        committee: 'Information Booth',
        responsibility: 'Oversee the setup and operation of the information booth',
    },
    41: {
        title: 'Information Booth Assistant',
        committee: 'Information Booth',
        responsibility: 'Assist chair with booth set up and tear down',
    },
    42: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 18th',
    },
    43: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 19th',
    },
    44: {
        title: 'Information Booth Volunteer',
        committee: 'Information Booth',
        responsibility: 'Man the booth Friday, July 20th',
    },
}

export default roles
