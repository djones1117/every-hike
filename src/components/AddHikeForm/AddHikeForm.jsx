import React, { useState } from "react";
import { Button, Form, Grid, Segment, Dropdown } from "semantic-ui-react";

export default function AddHikeForm({ handleAddPost }) {
  const [state, setState] = useState({
    difficulty: "",
    trail: "",
    length: "",
    location: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    console.log(e);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectChange(e) {
    setState({
      ...state,
      difficulty: e.target.textContent
    });
  }

  function handleSubmit(e) {
    const formData = new FormData();
    formData.append("difficulty", state.difficulty);
    formData.append("trail", state.trail);
    formData.append("length", state.length);
    formData.append("location", state.location);
    formData.append("photo", selectedFile);

    handleAddPost(formData);
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Dropdown
          className="form-control"
          name="difficulty"
          value={state.difficulty}
          placeholder="Select Difficulty"
          fluid
          selection
          options={[
            { key: "easy", text: "Easy", value: "Easy" },
            { key: "medium", text: "Moderate", value: "Moderate" },
            { key: "hard", text: "Hard", value: "Hard" },
          ]}
          onChange={handleSelectChange}
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
        <Button type="submit" className="btn" color="green">
          ADD Hike
        </Button>
      </Form>
    </Segment>
  );
}
