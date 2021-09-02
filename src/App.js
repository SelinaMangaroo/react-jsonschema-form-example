import React, { useState, useEffect } from 'react';
import Form from '@rjsf/bootstrap-4';
import "bootstrap/dist/css/bootstrap.min.css";
import schema from './schema';
import uiSchema from './uiSchema';
// import fields from "react-jsonschema-form-extras";

import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
// import 'react-bootstrap-typeahead/css/Typeahead.css';

// import Uploader from './Uploader';

const log = (type) => console.log.bind(console, type);

function App() {
    const [formData, setFormData] = useState({
      "title": "First task",
      "description": "selina",
    });

    const submitForm = () => {
      console.log('Submitted');
    }

    // console.log('schema', schema);
    console.log('formData: ', formData);

  return (
    <div className='form-container'>
      {/* <Uploader /> */}
      <br/>
      <div style={{backgroundColor: 'lightgrey', paddingLeft: '5px'}}>Metadata Form</div>
      <Form schema={schema}
        uiSchema={uiSchema}
        autoComplete="on"
        formData={formData}
        onChange={e => setFormData(e.formData)}
        onSubmit={submitForm}
        onError={log("errors")}
        // fields={fields}
        fields={{ typeahead: TypeaheadField }}
        // validate={validate}
        // transformErrors={transformErrors}
      />
    </div>
  );
}

export default App;



  {/* {(suggestions.length > 0) ?
      <ul>
        {suggestions.map((entity, index) => <li key={index} onClick={()=>suggestionSelected(entity)}>{entity}</li>)}
      </ul>
        :
        null
      } */}
      {/* <label>Photographer (Autocomplete)</label>
      <input value={text} onChange={onTextChanged} type='text' /> */}
        <br/>
        {/* {(formData) ?
          <div className="alert alert-success alert-dismissible">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>Import Submitted</strong>
          </div>
          : null
        } */}


  // const [ entities, setEntities ] = useState(['Selina', 'Seth', 'Samantha', 'Sandra', 'Maria', 'Red', 'Lauren']);
  // const [ suggestions , setSuggestions ] = useState([]);
  // const [ entityValue, setEntityValue ] = useState('');
  
  // const onTextChanged = (e) => {
  //   console.log('onTextChanged');
  //   let value = e.target.value;
  //   let sugg = [];
  //   if (value.length > 0){
  //     const regex = new RegExp(`^${value}`, 'i');
  //     sugg = entities.sort().filter( v => regex.test(v));
  //   }
  //   setSuggestions(sugg);
  //   // setEntityValue(value);
  // }
  
  // let element = document.getElementById('root_relatedEntity');
  // if(element){
  //   element.addEventListener('input', (e) => {onTextChanged(e)})
  // }

  // useEffect(()=>{
  //   if(element && entityValue !== ''){
  //     element.value=entityValue;
  //   }
  // }, [entityValue, element])
  

  // console.log('suggestions: ', suggestions);
  // console.log('entityValue', entityValue);

  // const suggestionSelected = (value) => {
  //   setEntityValue(value);
  //   setSuggestions([]);
  // }

    // function validate(formData, errors) {
    //   if (formData.extent <= 0) {
    //     errors.extent.addError("extent must be positive value");
    //   }
    //   return errors;
    // }

    // const transformErrors = (errors) => {
    //   console.log(errors);
    //   return errors.map(error => {
    //     if (error.name === "pattern") {
    //       error.message = "Only digits are allowed"
    //     }
    //     return error;
    //   });
    // }