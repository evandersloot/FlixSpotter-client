import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import './login-view.scss';
import logo from '../img/logo.png';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    return (
        <Col md={8} className="mx-auto">
            <Row className="d-flex mt-2 justify-content-center">
                <Image className="w-75 h-25 m-auto" src={logo} />
                <h3 className="text-center">Sign in with your Username and Password</h3>
            </Row>
            <Row>
                <Form className="d-flex h-75 w-100 justify-content-center">
                    <Col md={12} className="w-100 mt-2 mb-10">
                        <Form.Group className="mb-3" controlId="formUserName">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Choose an alphanumeric Username" value={username} onChange={ e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" placeholder="Set a Password" value={password} onChange={ e => setPassword(e.target.value)} />
                        </Form.Group>
                        <div className="login-button pb-5 mb-5">
                        <Button type="submit" value="Submit" onClick={handleSubmit}>Log In</Button>
                        </div>
                    </Col>
                </Form>
            </Row>
        </Col>
    );
}

LoginView.propTypes = {
     user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    //onLoggedIn: PropTypes.func.isRequired,
};