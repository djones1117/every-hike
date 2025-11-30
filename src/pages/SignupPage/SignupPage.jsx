import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

//this hook can be used to change url we are on
//on the client side (react, browser code)
import { useNavigate } from "react-router-dom";

export default function SignUpPage({ handleSignUpOrLogin }) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    aboutMe: "",
  });

  //this state will handle the file upload "photo"
  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");
  // this function just takes a path
  //the path should match a route defined in the app.js
  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //!!!! WHENEVER YOU SEND A FILE TO THE SERVER
    //!!!YOU MUST CREATE formdata!
    //this has to be done because the http request
    //will be sent in two parts, the text and the file
    const formData = new FormData();
    //key on req.file would be photo
    formData.append("photo", selectedFile);
    //req.body formdata
    formData.append("username", state.username);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("aboutMe", state.aboutMe);

    try {
      //this code is making the fetch request to the server
      //it sends our state object
      //this is calling the signup fetch function defined in our utils/userService
      const signUp = await userService.signup(formData);
      console.log(signUp);
      //navigates user to home page if signup is successful
      navigate("/");
      handleSignUpOrLogin();
      //handleSignUpOrLogin comes from app.js
    } catch (err) {
      console.log(err, "err in handleSubmit");
      setError("Check your terminal for your error and chrome console!");
    }
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>

        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
      <Header
  as="h2"
  textAlign="center"
  style={{ fontWeight: "bold", marginBottom: "1rem" }}
>
  Sign Up
  </Header>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="About Me"
              name="aboutMe"
              placeholder="Tell us more about yourself..."
              value={state.aboutMe}
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button color="green" type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
