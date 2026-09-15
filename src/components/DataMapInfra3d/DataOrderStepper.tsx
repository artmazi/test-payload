import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, StepContent, Tooltip } from '@mui/material';
import { Delete, Help } from '@mui/icons-material';
import { UseFormHandleSubmit, UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import DataOrderForm from './DataOrderForm';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

interface props {
	darkTheme: boolean;
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	polygonCordinates: any[];
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	onSubmit: (data: any) => void;
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	setRightNumber: React.Dispatch<React.SetStateAction<boolean>>;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	errorNumber: boolean | undefined;
	zoom: number;
	setUserActivity: React.Dispatch<React.SetStateAction<boolean>>;
	userActivity: boolean;
	setDeletePolygon: React.Dispatch<React.SetStateAction<boolean>>;
}

export const dataTypes = [
	{ color: ['#0d92d2', '#be64ac'], label: t('data_selection.legend_item_1') },
	{ color: ['#80b5e1', '#d698c7'], label: t('data_selection.legend_item_2') },
	{ color: ['#c2d9f0', '#ebcbe3'], label: t('data_selection.legend_item_3') },
	{
		color: ['#bfbfbf', '#ffffff00'],
		label: t('data_selection.legend_item_4'),
	},
];

export default function DataOrderStepper({
	darkTheme,
	zoom,
	register,
	errors,
	onSubmit,
	handleSubmit,
	activeStep,
	setActiveStep,
	polygonCordinates,
	errorNumber,
	setRightNumber,
	setPhoneNumber,
	setUserActivity,
	userActivity,
	setDeletePolygon,
}: props) {
	//All about Language (i18n)
	const { t } = useTranslation();

	const handleNext = () => {
		if (activeStep < steps.length - 1) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setUserActivity(true);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setUserActivity(true);
	};

	const handleDeletePolygon = () => {
		setDeletePolygon(true);
	};

	const handleReset = () => {
		setActiveStep(0);
		setDeletePolygon(true);
	};

	const steps = [
		{
			label: t('stepper.step_title_1'),
			description: t('stepper.description_1'),
		},
		{
			label: t('stepper.step_title_2'),
			description: t('stepper.description_2'),
		},
		{
			label: t('stepper.step_title_3'),
			description: t('stepper.description_3'),
		},
	];

	useEffect(() => {
		if (zoom > 57.1309 && activeStep === 1 && !userActivity) {
			setActiveStep(0);
		}
		if (zoom < 57.1309 && activeStep === 0 && !userActivity) {
			setActiveStep(1);
		}
		// eslint-disable-next-line
	}, [zoom]);

	return (
		<Box width={'100%'} height="100%" position="relative" overflow={'auto'}>
			<Box paddingY={0} sx={{ color: darkTheme ? 'white' : 'black' }}>
				<Box className={'dataSelectionLegend'} display={'flex'} flexDirection="column" gap={0.5}>
					<Box display={'flex'} gap={1} alignItems={'center'} marginBottom={1}>
						<Typography data-testid="legendTitle" variant="body1">
							{t('data_selection.legend_title')}
						</Typography>
						<Tooltip
							title={t('data_selection.legend_tooltip')}
							placement="bottom"
							enterDelay={100}
							classes={{
								tooltip: 'legendTooltip',
							}}>
							<Help fontSize="small" sx={{ color: darkTheme ? 'white' : '#303030' }} />
						</Tooltip>
					</Box>
					{dataTypes.map((item: any, index: number) => (
						<Box
							key={index}
							display={'flex'}
							gap={0.5}
							marginTop={dataTypes.length - 1 === index ? 0.5 : 0}
							sx={{ color: darkTheme ? 'white' : 'black' }}>
							<Box width={'20px'} height={'20px'} sx={{ backgroundColor: item.color[0] }}></Box>
							<Box width={'20px'} height={'20px'} sx={{ backgroundColor: item.color[1] }}></Box>
							<Typography data-testid="legendLabel" marginLeft={'4px'} variant="body2">
								{item.label}
							</Typography>
						</Box>
					))}
				</Box>
				<Divider variant="middle" sx={{ marginY: '16px' }} />
				<Box
					data-testid="dataSelectionStepperBox"
					className="dataSelectionStepper"
					display={'flex'}
					flexDirection={'column'}>
					<Typography data-testid="stepperTitle" gutterBottom variant="body1">
						{t('stepper.title')}
					</Typography>
					<Typography data-testid="stepperDescription" gutterBottom variant="body2">
						{t('stepper.description')}
					</Typography>
					<Stepper data-testid="dataSelectionStepper" activeStep={activeStep} orientation="vertical">
						{steps.map((step, index) => (
							<Step key={step.label}>
								<StepLabel data-testid="stepsLabel">{step.label}</StepLabel>
								<StepContent>
									<Typography data-testid="stepsDescription" variant="body2">
										{step.description}
									</Typography>
									<form onSubmit={handleSubmit(onSubmit)}>
										{index === steps.length - 1 && (
											<DataOrderForm
												darkTheme={darkTheme}
												register={register}
												errors={errors}
												setRightNumber={setRightNumber}
												setPhoneNumber={setPhoneNumber}
												errorNumber={errorNumber}
											/>
										)}
										<Box sx={{ mb: 2 }}>
											{activeStep !== 0 && (
												<Button
													data-testid="backButton"
													variant="contained"
													size="medium"
													onClick={handleBack}
													sx={{ mt: 1, mr: 1 }}>
													{t('stepper.button_back')}
												</Button>
											)}
											{activeStep === 1 && (
												<Button
													data-testid="deletePolygon"
													disabled={activeStep === 1 && polygonCordinates.length === 0}
													endIcon={<Delete />}
													variant="contained"
													size="medium"
													onClick={handleDeletePolygon}
													sx={{ mt: 1, mr: 1 }}
													data-transaction-name={'button data selection-delete'}>
													{t('stepper.button_delete')}
												</Button>
											)}
											<Button
												data-testid="nextButton"
												type={index === steps.length - 1 ? 'submit' : 'button'}
												disabled={index === steps.length - 2 && polygonCordinates.length === 0}
												variant="contained"
												size="medium"
												onClick={handleNext}
												sx={{ mt: 1, mr: 1 }}
												data-transaction-name={'button data selection-delete'}>
												{index === steps.length - 1
													? t('stepper.button_finish')
													: t('stepper.button_next')}
											</Button>
										</Box>
									</form>
								</StepContent>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length && (
						<>
							<Typography data-testid="endMessage" variant="body2" sx={{ mt: 2, mb: 1 }}>
								{t('stepper.end_message')}
							</Typography>
							<Button
								data-testid="resetButton"
								type={'button'}
								variant="contained"
								size="medium"
								onClick={handleReset}
								sx={{ mt: 1, mr: 1 }}>
								{t('stepper.button_reset')}
							</Button>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}
