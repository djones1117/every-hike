import React, { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";




export default function AddHikeForm(){


const [state, setState] = useState({
    difficulty: '',
    trail: '',
    length: '',
    location: ''

})

const [selectedFile, setSelectedFile] = useState('');

function handleFileInput(e){
    setSelectedFile(e.target.files[0])
}



function handleChange(e){
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}


function handleSubmit(e)  {
    const formData = new FormData()
    formData.append('difficulty', state.difficulty)
    formData.append('trail', state.trail)
    formData.append('length', state.length)
    formData.append('location', state.location)
    formData.append('photo', selectedFile)
}
    


return(
        <Segment>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Input
            className="form-control"
            name="difficulty"
            value={state.difficulty}
            placeholder="Easy, Moderate, Hard"
            onChange={handleChange}
            required
          />
          <Form.Input
          className="form-control"
          name="trail"
          value={state.trail}
          placeholder="Trail Name"
          onChange={handleChange}
          required
          />
          <Form.Input
          className="form-control"
          name="length"
          value={state.length}
          placeholder="Length"
          onChange={handleChange}
          required
          />
          <Form.Input
          className="form-control"
          name="location"
          value={state.location}
          placeholder="Hike Location"
          onChange={handleChange}
          required
          />
          <Form.Input
            className="form-control"
            type="file"
            name="photo"
            placeholder="upload image"
            onChange={handleFileInput}
          />
          <Button type="submit" className="btn">
            ADD Hike
          </Button>
        </Form>
      </Segment>
    );
}