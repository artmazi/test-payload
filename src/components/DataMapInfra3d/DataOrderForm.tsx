import React from 'react';

import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import './dataStepper.css';
import IntlTelInput from '@harissokoli1/react-intl-tel-input';
import '@harissokoli1/react-intl-tel-input/dist/main.css';
interface props {
	darkTheme: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	setRightNumber: React.Dispatch<React.SetStateAction<boolean>>;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	errorNumber: boolean | undefined;
}

export default function DataOrderForm({
	darkTheme,
	errorNumber,
	setRightNumber,
	setPhoneNumber,
	register,
	errors,
}: props) {
	const { t } = useTranslation();

	const handlePhoneChange = (status: any, number: any, country: any, getFullNumber: any) => {
		setRightNumber(status);
		setPhoneNumber(getFullNumber);
	};

	return (
		<Box
			data-testid="stepperForm"
			width="100%"
			display={'flex'}
			flexDirection="column"
			gap={2}
			paddingY={1}
			marginTop={1}>
			<TextField
				data-testid="firstnameInput"
				classes={{
					root: 'inputField',
				}}
				fullWidth
				{...register('firstName', {
					required: true,
					pattern:
						/^[A-Za-zZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,30}$/,
				})}
				error={errors.firstName !== undefined ? true : false}
				label={t('spec_form.form_firstname')}
				helperText={errors.firstName && t('spec_form.form_err_firstname')}
			/>
			<TextField
				classes={{
					root: 'inputField',
				}}
				fullWidth
				{...register('lastName', {
					required: true,
					pattern:
						/^[A-Za-zZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,30}$/,
				})}
				error={errors.lastName !== undefined ? true : false}
				label={t('spec_form.form_lastname')}
				helperText={errors.lastName && t('spec_form.form_err_lastname')}
			/>
			<TextField
				classes={{
					root: 'inputField',
				}}
				fullWidth
				{...register('email', {
					required: true,
					pattern: /^[A-Za-z0-9-!#$%&'*+-/=?^_`{|}~]+@[a-z0-9._-]+\.[A-Za-z]{2,3}$/,
				})}
				error={errors.email !== undefined ? true : false}
				label={t('spec_form.form_email')}
				helperText={errors.email && t('spec_form.form_err_email')}
			/>
			<Box display={'block'}>
				<Box width="calc(100% + 8px)" height="auto">
					<IntlTelInput
						containerClassName={
							darkTheme
								? 'intl-tel-inputDark intl-tel-input phoneNumberStepper '
								: 'intl-tel-input phoneNumberStepper'
						}
						inputClassName={darkTheme ? 'phoneNumber phoneNumberDark' : 'phoneNumber'}
						preferredCountries={['ch']}
						onlyCountries={['ch', 'de', 'at']}
						onPhoneNumberChange={handlePhoneChange}
					/>
				</Box>
				{errorNumber === true && (
					<Typography
						sx={{
							top: '100%',
							paddingTop: '4px',
							paddingLeft: '14px',
							color: '#d32f2f',
							fontWeight: 300,
							fontSize: '14px',
						}}>
						{t('spec_form.form_err_mobile')}
					</Typography>
				)}
			</Box>
			<TextField
				classes={{ root: 'inputField' }}
				fullWidth
				{...register('message')}
				label={t('spec_form.form_message')}
			/>
			<Box>
				<FormGroup aria-labelledby="demo-radio-buttons-group-label">
					<FormControlLabel
						sx={{
							':hover': { color: 'secondary.main' },
						}}
						classes={{ label: 'privacyLabelStepper' }}
						value={'privacy'}
						control={<Checkbox size="small" />}
						label={
							<Trans i18nKey="spec_form.form_privacy">
								I agree that my provided data will be processed in accordance with the
								<a
									style={{
										color: '#ff6700',
										textDecoration: 'none',
										fontWeight: '600',
									}}
									rel="noreferrer"
									target="_blank"
									href="https://landing.infra3d.com/datenschutz">
									privacy policy
								</a>
								of iNovitas AG and I explicitly allow iNovitas AG staff to contact me.
							</Trans>
						}
						{...register('privacyButton', { required: true })}
					/>
					{errors.privacyButton && (
						<Typography
							sx={{
								top: '100%',
								paddingTop: '4px',
								paddingLeft: '14px',
								color: '#d32f2f',
								fontWeight: 300,
								fontSize: '12px',
							}}>
							{t('spec_form.form_err_privacy')}
						</Typography>
					)}
				</FormGroup>
			</Box>
		</Box>
	);
}
