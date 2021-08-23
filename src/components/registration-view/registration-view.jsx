import React, { useState } from 'react';
import PropTypes from 'prop-types';
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, username, password, email, birthday);
        props.onSignUp(username);
    };

    return (
        <Col md={8} className="mx-auto">
            <Row className="d-flex mt-2 justify-content-center">
                    <Image className="w-75 h-25 m-auto" src={logo} />
                    <h3 className="text-center">Please fill in all fields to sign up!</h3>
            </Row>
           
                <Row ClassName="d-flex">
                    <Form className="d-flex h-75 w-100 justify-content-center">
                        <Col md={12} className="w-100 mt-2 mb-10">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="First and Last Name" value={name} onChange={ e => setName(e.target.value)} />
                            </Form.Group>
                        
                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Choose an alphanumeric Username" value={username} onChange={ e => setUsername(e.target.value)} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="text" placeholder="Set a Password" value={password} onChange={ e => setPassword(e.target.value)} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email Address:</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={ e => setEmail(e.target.value)} />
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
    onSignUp: PropTypes.func.isRequired
};