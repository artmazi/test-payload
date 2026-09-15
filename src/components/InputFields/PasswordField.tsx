import React, { useState } from 'react';
import clsx from 'clsx';

interface PasswordFieldProps {
	id: string;
	name: string;
	value: string | number;
	label?: string;
	icon?: any;
	error?: string;
	placeholder?: string;
	onChange: (name: string, value: string | number) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
	id,
	name,
	value,
	label,
	icon,
	error,
	placeholder,
	onChange,
}) => {
	const [toggle, setToggle] = useState<boolean>(false);

	const handleToggle = () => {
		setToggle((prevState) => !prevState);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		onChange(name, value);
	};

	return (
		<div className="form-input-group">
			<div className="input">
				{label && (
					<label className={error && 'text-red'} htmlFor={label}>
						{label}
					</label>
				)}
				<div className="relative">
					<input
						id={id}
						name={name}
						value={value}
						type={toggle ? 'text' : 'password'}
						onChange={handleChange}
						placeholder={placeholder}
						className={clsx({ 'border-red border-[1px]': error }, 'input-login')}
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
