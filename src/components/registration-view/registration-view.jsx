import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, username, password, email, birthday);
        props.signUp(username);
    };

    return (
        <form>
            <label>
                Name:
                <input type="text" value={name} onChange={ e => setName(e.target.value)} />
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={ e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    //signUp: PropTypes.func.isRequired
};