import React, { useEffect, useMemo, useState } from 'react';

import useGuestGuard from 'hooks/Routing/useGuestGuard';

import { RouteGuard } from 'types/Routing';

interface Props {
	guards?: Array<RouteGuard>;
	children: JSX.Element;
}

function GuardedRoute({ children, guards }: Props) {
	const [checksPassed, setChecksPassed] = useState(false);
	const guestGuard = useGuestGuard();

	useEffect(() => {
		if (!guards?.length) {
			setChecksPassed(true);
			return;
		}

		guards.forEach((guard) => {
			switch (guard) {
				case RouteGuard.Guest:
					guestGuard.check();
					break;
				default:
					break;
			}
		});

		setChecksPassed(true);
	}, [guards]);

	return useMemo(() => {
		if (!checksPassed) {
			return <div>Loading...</div>;
		}

		return children;
	}, [children, checksPassed]);
}

export default GuardedRoute;
