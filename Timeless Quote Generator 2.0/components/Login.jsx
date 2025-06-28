import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', username);
        setUser(username);
        navigate('/');
    };

    return (
        <div className="page-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
                <button type="submit">Login</button>
            </form>
            <p>
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
};

export default Login;