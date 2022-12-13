import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function GuestOnly(props) {
  const { pathname } = useLocation();
  const [cookies] = useCookies();

  const blacklisted = ['/auth', '/signup'];

  if (cookies?.accessToken && !blacklisted.includes(pathname)) {
    return <Navigate to="/" />;
  }

  return <Outlet {...props} />;
}

export default GuestOnly;
