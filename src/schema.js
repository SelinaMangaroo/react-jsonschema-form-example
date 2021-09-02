const schema = {
    title: "Metadata form",
    description: "A metadata form example.",
    type: "object",
    required: ["title"],

    // "definitions": {
    //     "largeEnum": {
    //         "type": "string",
    //         "enum": [
    //             "option #0",
    //             "option #1",
    //             "option #2",
    //             "option #3",
    //             "option #4",
    //             "option #5",
    //             "option #6",
    //             "option #7",
    //             "option #8",
    //             "option #9",
    //             "option #10"
    //         ]
    //     }
    // },

    properties: {

        title: {
            type: "string",
            title: "Title",
            minLength: 1,
        },
        description: {
            'type': "string",
            'title': "Description",
            'maxLength': 1000,
        },
        bioRegions: {
            "title": "Bio-Regions",
            "type": "number",
            "enum": [1, 2, 3],
            "enumNames": ["Turtle Island", "Lizard Island", "Tortise Island"],
            "format": "number"
        },
        date: {
            type: 'string',
            format: 'date',
            title: 'Date',
        },
        extent: {
            description:"A region defined by characteristics of the natural environment rather than man-made division.",
            title: "Extent",
            type: "number",
            "minimum": 0,
            "maximum": 100,
        },

        relatedEntity: {
            description:"A list of related entities.",
            format: 'string',
            type: "string",
            title: "Photographer",
        },

        "relatedEntities": {
            "type": "array",
            "format": "string",
            "title": "Related Entities",
            "items": {
                "type": "string",
                // "default": "bazinga"
            }
        },

        "multipleChoicesList": {
            "type": "array",
            "title": "A multiple choices list",
            "items": {
                "type": "string",
                "enum": [
                "Selina",
                "Seth",
                "Maria",
                "Wai-Yin"
                ]
            },
            "uniqueItems": true
        },

        // relatedSubjects: {
        //     type: "array",
        //     title: "Related Subjects",
        //     items: {
        //         type: "object",
        //         required: [ "title" ],
        //         properties: {
        //             relatedSubject: {
        //                 type: "string",
        //                 title: "Related Subjects",
        //             },
        //         }
        //     }
        // },
        
    },
    
};

export default schema;