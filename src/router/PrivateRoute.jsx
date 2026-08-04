import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  // If not logged in, kick to Welcome screen
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // If they are logged in but try to access chats without verifying their email, kick to verify
  if (!user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }
  
  // If logged in AND verified, let them see the chats
  return children;
};

export default PrivateRoute;