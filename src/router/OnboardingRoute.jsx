import { Navigate } from 'react-router-dom';

const OnboardingRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default OnboardingRoute
