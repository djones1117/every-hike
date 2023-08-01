import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
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



import { useNavigate } from "react-router-dom";

export default function SignUpPage({handleSignUpOrLogin}) {
    
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        aboutMe: ''

    })
    
    
    const [selectedFile, setSelectedFile] = useState('')

    const [error , setError] = useState('');

    const navigate = useNavigate()

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault();






        


        try {
            const signUp = await userService.signup(state)
            console.log(signUp)

            navigate('/');
           
        } catch(err){
            console.log(err, 'err in handleSubmit');
            setError('Check your terminal for your error and chrome console!')
        }

    }
    
    
    
    
    
    return(
       
            <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
             <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="green" textAlign="center">
                 <Image src="https://imgur.com/ciEpqIy.jpg" /> Sign Up
               </Header>
               <Form autoComplete="off" onSubmit={handleSubmit}>
                 <Segment stacked>
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
                     label="about me"
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
                       
                     />
                   </Form.Field>
                   <Button type="submit" className="btn">
                     Signup
                   </Button>
                 </Segment>
                 {error ? <ErrorMessage error={error} /> : null}
               </Form>
             </Grid.Column>
           </Grid>
       
             );
 
}
