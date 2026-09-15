import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import DataMap from './DataMap';
import theme from '../../theme';

export default function DataMapMini() {
	// The stepper should currently only indicate the last step.
	const [activeStep, setActiveStep] = useState<number>(0);
	const [userActivity, setUserActivity] = useState<boolean>(false);
	const [deletePolygon, setDeletePolygon] = useState<boolean>(false);

	// The polygon points user will add
	const [polygonCordinates, setPolygonCordinates] = useState<Array<any>>([]);

	//zoom of map state
	const [zoom, setZoom] = useState<number>(611);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				width="100%"
				height="max-h-[400px]"
				sx={{
					flexGrow: 1,
				}}>
				<Box
					width="100%"
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
						width={{ xs: '100%', lg: '100%' }}
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
				</Box>
			</Box>
		</ThemeProvider>
	);
}
