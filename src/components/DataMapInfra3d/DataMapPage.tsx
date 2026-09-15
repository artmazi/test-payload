import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import DataOrderStepper from './DataOrderStepper';
import DataMap from './DataMap';
import theme from '../../theme';

export default function DataMapPage(data: any) {
	// The stepper should currently only indicate the last step.
	const [activeStep, setActiveStep] = useState<number>(0);
	const [userActivity, setUserActivity] = useState<boolean>(false);
	const [deletePolygon, setDeletePolygon] = useState<boolean>(false);

	// The polygon points user will add
	const [polygonCordinates, setPolygonCordinates] = useState<Array<any>>([]);

	// phone number validation
	const [rightNumber, setRightNumber] = useState(false);
	const [errorNumber, setErrorNumber] = useState<boolean>();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sendErrorForPhoneNumber, setSendErrorForPhoneNumber] = useState(false);

	//zoom of map state
	const [zoom, setZoom] = useState<number>(611);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		setSendErrorForPhoneNumber(true);
		if (rightNumber) {
			const order = {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNumber: phoneNumber,
				message: data.message,
				coordinates: JSON.stringify(polygonCordinates),
				privacyAccepted: data.privacyButton ? 'Yes' : 'No',
			};
			fetch('https://tnsw36ubn8.execute-api.eu-west-1.amazonaws.com/prod', {
				method: 'POST',
				body: JSON.stringify(order),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			setActiveStep(activeStep + 1);
		}
	};

	useEffect(() => {
		if (phoneNumber !== '') {
			if (!rightNumber && sendErrorForPhoneNumber) {
				setErrorNumber(true);
			} else {
				setErrorNumber(false);
			}
		} else {
			setRightNumber(true);
			setErrorNumber(false);
		}
	}, [phoneNumber, rightNumber, sendErrorForPhoneNumber]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				height={'100vh'}
				sx={{
					flexGrow: 1,
				}}>
				<Box
					height={'100%'}
					// position={'fixed'}
					// top={'104px'}
					// right={{ xs: '16px', md: '24px' }}
					// bottom={'20px'}
					// left={{ xs: '81px', md: '89px' }}
					display="flex"
					flexDirection={{ xs: 'column', lg: 'row' }}
					gap={3}>
					<Box
						height={'100%'}
						width={{ xs: '100%', lg: '70%' }}
						// height={{ xs: '60%', lg: '100%' }}
						className={'dataSelectionMap'}>
						<DataMap
							darkTheme={false}
							deletePolygon={deletePolygon}
							setDeletePolygon={setDeletePolygon}
							userActivity={userActivity}
							setUserActivity={setUserActivity}
							setZoom={setZoom}
							activeStep={activeStep}
							polygonCordinates={polygonCordinates}
							setPolygonCordinates={setPolygonCordinates}
						/>
					</Box>
					<Box
						padding={{ xs: 4, lg: 2 }}
						width={{ xs: '100%', lg: '30%' }}
						height={{ xs: '40%', lg: '100%' }}>
						{data.content ? (
							data.content
						) : (
							<DataOrderStepper
								darkTheme={false}
								setDeletePolygon={setDeletePolygon}
								userActivity={userActivity}
								setUserActivity={setUserActivity}
								zoom={zoom}
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
								onSubmit={onSubmit}
								activeStep={activeStep}
								setActiveStep={setActiveStep}
								polygonCordinates={polygonCordinates}
								setRightNumber={setRightNumber}
								setPhoneNumber={setPhoneNumber}
								errorNumber={errorNumber}
							/>
						)}
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
