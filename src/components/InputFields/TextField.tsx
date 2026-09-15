import React from 'react';
import clsx from 'clsx';

export type InputStyleTypes = 'default' | 'login' | 'border' | 'custom';

interface TextFieldProps {
	id: string;
	name: string;
	value: string | number | undefined;
	label?: string;
	icon?: any;
	error?: string;
	placeholder?: string;
	type: string;
	inputType?: InputStyleTypes;
	disabled?: boolean;
	onChange: (name: string, value: string) => void;
	patternIsNumber?: boolean;
	step?: string;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

export const inputStyles = {
	default: 'input-default',
	login: 'input-login',
	border: 'input-default input-border',
	custom: 'text-[15px]  text-red',
};

export const TextField: React.FC<TextFieldProps> = ({
	id,
	name,
	label,
	icon,
	error,
	type,
	onChange,
	disabled,
	inputType = 'default',
	patternIsNumber = false,
	step,
	onKeyDown,
	...rest
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		onChange(name, value);
	};

	return (
		<div className="form-input-group flex-1">
			<div className="input">
				{label && (
					<label
						className={clsx({
							'text-red': error,
						})}
						htmlFor={label}>
						{label}
					</label>
				)}
				<div className="relative">
					<input
						className={clsx(
							{
								'border-red border-[1px]': error,
								'border-grey-darker border-[1px]': inputType === 'border',
							},
							inputStyles[inputType]
						)}
						id={name}
						name={name}
						type={type}
						onChange={handleChange}
						disabled={!!disabled}
						pattern={patternIsNumber ? '[0-9]*' : '*'}
						{...rest}
						step={step && step}
						onKeyDown={onKeyDown}
					/>
				</div>
			</div>
			{error && (
				<div className="input-error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};
