import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Protected(props) {
  const location = useLocation();
  const [cookies] = useCookies();

  if (!cookies?.accessToken) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <Outlet {...props} />;
}

export default Protected;
