import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import './registration-view.scss';
import logo from '../img/logo.png';

export function RegistrationView(props) {
    
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ nameError, setNameError ] = useState({});
    const [ usernameError, setUserNameError ] = useState({});
    const [ passwordError, setPasswordError ] = useState({});
    const [ emailError, setEmailError ] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid) {
            axios.post(`https://flixspotter.herokuapp.com/users`, {
                name: name,
                username: username,
                password: password,
                email: email,
                birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('an error has occurred')
            });
        }
    };

    const formValidation = () => {
        const nameError = {};
        const usernamError = {};
        const passwordError = {};
        const emailError = {};
        let isValid = true;

        if (name.length < 2 || name === '') {
            nameError.nameNeeded = 'Please input your name.';
            isValid = false;
        }
        
        if (username.length < 5 || username === '') {
            usernameError.UsernameTooShort = 'Username must be at least 5 alphanumeric characters.';
            isValid = false;
        }

        if (password.length < 8 || password === '') {
            passwordError.passwordTooShort = 'Password must be at least 8 characters.';
            isValid = false;
        }

        if (!email || email.indexOf('@') === -1) {
            emailError.notValidEmail = 'Your email is not valid.';
            isValid = false;
        };

        setNameError(nameError);
        setUserNameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
    }

    return (
        <Col md={8} className="mx-auto text-light">
            <Row className="d-flex mt-2 justify-content-center">
                    <Image className="w-75 h-25 m-auto" src={logo} />
                    <h3 className="text-center">Please fill in all fields to sign up!</h3>
            </Row>
           
                <Row className="d-flex">
                    <Form className="d-flex h-75 w-100 justify-content-center">
                        <Col md={12} className="w-100 mt-2 mb-10">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="First and Last Name" value={name} onChange={ e => setName(e.target.value)} />
                                {Object.keys(nameError).map((key) => {
                                    return (
                                        <div key={key}>
                                            {nameError[key]}
                                        </div>
                                    );
                                })}
                            </Form.Group>
                        
                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Choose an alphanumeric Username" value={username} onChange={ e => setUsername(e.target.value)} />
                                {Object.keys(usernameError).map((key) => {
                                    return (
                                        <div key={key}>
                                            {usernameError[key]}
                                        </div>
                                    );
                                })}
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Set a Password" value={password} onChange={ e => setPassword(e.target.value)} />
                                {Object.keys(passwordError).map((key) => {
                                    return (
                                        <div key={key}>
                                            {passwordError[key]}
                                        </div>
                                    );
                                })}
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email Address:</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={ e => setEmail(e.target.value)} />
                                {Object.keys(emailError).map((key) => {
                                    return (
                                        <div key={key}>
                                            {emailError[key]}
                                        </div>
                                    );
                                })}
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBirthday">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control type="date" value={birthday} onChange={ e => setBirthday(e.target.value)} />
                            </Form.Group>
                            <div className="register-button pb-5">
                            <Button variant="primary" value="Submit" onClick={handleSubmit}>Register</Button>
                            </div>
                        </Col>
                    </Form>
                </Row>
            
        </Col>
    );
}

RegistrationView.propTypes = {
    SignUp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    onSignUp: PropTypes.func,
};