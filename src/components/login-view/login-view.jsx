import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';
import logo from '../img/logo.png';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://flixspotter.herokuapp.com/login`, {
            Username : username,
            Password : password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            alert('No such user. Please Register')
        });
    };

    

    return (
        <Col md={8} className="login-view mx-auto">
            <Row className="d-flex justify-content-center text-light">
                <Image className="w-75" src={logo} />
                <h4 className="text-center">Sign in with your Username and Password</h4>
            </Row>
            <Row>
                <Form className="d-flex h-75 w-100 justify-content-center">
                    <Col md={12} className="w-100 mt-2 mb-10">
                        <Form.Group className="mb-3 text-light" controlId="formUserName">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3 text-light" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} pattern='.{5,}'/>
                        </Form.Group>
                        <div className="login-button pb-5 mb-5">
                        <Button type="submit" value="Submit" onClick={handleSubmit}>Log In</Button>
                        </div>
                    </Col>
                </Form>
            </Row>
            <div className='text-light text-center d-block'>
            Not a member yet?
            <Link to='/register' style={{ textDecoration: 'none' }}>
              <span className='register text-primary ml-2 link'>
                Sign up for free
              </span>
            </Link>
          </div>
        </Col>
    );
}

LoginView.propTypes = {
    user: propTypes.shape({
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired
    }),
   onLoggedIn: propTypes.func.isRequired,
 };