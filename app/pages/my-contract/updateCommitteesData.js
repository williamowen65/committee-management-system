const data = {
    "1": { 
        "committee": "Board",
        "committee-header-text": "1. Board: 5 people – All year",
        "id": "1"
     },
    "2": { 
        "committee": "Web Design and Maintenance",
        "committee-header-text": "2. Website Design and Maintenance: 1 person – All year – done from home",
        "id": "2"
    },
    "3": { 
        "committee": "Social Media",
        "committee-header-text": "3. Social Media: 5 people, including chair – April to August – done from home",
        "id": "3"
    },
    "4": { 
        "committee": "Art Images",
        "committee-header-text": "4. Artist Images: 1 person – January to early March – done from home",
        "id": "4"
    },
    "5": { 
        "committee": "Marketing",
        "committee-header-text": "5. Brochure and Poster: 2 people, including chair – January to early June",
        "id": "5"
    },
    "6": { 
        "committee": "Recruitment",
        "committee-header-text": "6. New Artist Recruitment: 2 people – Year-round",
        "id": "6"
    },
    "7": { 
        "committee": "Artists Applications",
        "committee-header-text": "7. New Artist Applications: 1 person – January to March",
        "id": "7"
    },
    "8": { 
        "committee": "Distribution",
        "committee-header-text": "8. Distribution",
        "id": "8"
    },
    "9": { 
        "committee": "Sponsorship",
        "committee-header-text": "Sponsorship",
        "id": "9"
    },
    "10": { 
        "committee": "Signs for Artist Studios",
        "committee-header-text": "Signs for Artist Studios",
        "id": "10"
    },
    "11": { 
        "committee": "Banners",
        "committee-header-text": "Banners",
        "id": "11"
    },
    "12": { 
        "committee": "General Advertising",
        "committee-header-text": "Signs for General Advertising",
        "id": "12"
    },
    "13": { 
        "committee": "Mailing List/Mail Chimp",
        "committee-header-text": "Mailing List/Mail Chimp",
        "id": "13"
    },
    "14": { 
        "committee": "Advertising/Publicity",
        "committee-header-text": "Advertising/Publicity",
        "id": "14"
    },
    "15": { 
        "committee": "Information Booth",
        "committee-header-text": "Information Booth at Summer Art Festival",
        "id": "15"
    },
    "16": { 
        "committee": "Grants",
        "committee-header-text": "Grants",
        "id": "16"
    }
};

// add data to firebase
CRUD.update('app-settings', 'committees', {
    data: {
        ...data
    }
});
