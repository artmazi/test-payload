import React, { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// import useIsLoggedIn from 'hooks/useIsLoggedIn';

import { RoutesNames } from 'types/Routing';

/*
	Name: AuthGuard
	Rule: Can access route only when visitor is authenticated
*/

const redirectRoute = RoutesNames.Home;

function AuthGuard() {
	// const isLoggedIn = useIsLoggedIn();
	const { pathname } = useLocation();

	return useMemo(() => {
		// if (isLoggedIn) {
		return <Outlet />;
		// }

		// return <Navigate to={redirectRoute} state={{ redirect: pathname }} replace />;
	}, []);
}

export default AuthGuard;
