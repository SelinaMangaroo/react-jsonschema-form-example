const uiSchema = {

    "description": {        
        "ui:widget": "textarea"
    },
    "bioRegions": {
        "ui:placeholder": "Choose one"
    },

    "relatedEntity": {
        "ui:field": "typeahead",
        "typeahead": {
            "id": 1,
            "minLength": 0,
            // "options": [{"id": 1, "label": 'Selina'}, {"id": 2, "label": "Seth"}, {"id": 3, "label": "Maria"}, {"id": 4, "label": "Red"},{"id": 5, "label": "Lauren"}],
            "options": ["Selina", "Seth", "Maria", "Red", "Lauren"],
            "labelKey": "entities",
        }
    },

    "relatedEntities": {
        "items": {
        // "ui:emptyValue": ""
            "ui:field": "typeahead",
            "typeahead": {
                "id": 1,
                "minLength": 0,
                "options": ["Selina", "Seth", "Maria"],
                "labelKey": "entities",
            }
        }
    },

    "multipleChoicesList": {
        "ui:widget": "checkboxes"
    },



};

export default uiSchema;