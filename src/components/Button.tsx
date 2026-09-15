import clsx from 'clsx';
import React, { HTMLProps } from 'react';

type ButtonTypes = 'small' | 'medium' | 'normal' | 'large';

export type ButtonColors = 'primary' | 'secondary' | 'orange';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	variant?: ButtonTypes;
	color?: ButtonColors;
	onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	className?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export const btnStyles = {
	primary: 'px-[16px] md:px-[24px] py-[4px] md:py-[8px] bg-sky rounded border border-sky text-white text-b1 xs:p-2 xs:text-sm',
	secondary: 'px-[16px] md:px-[32px] py-[16px] bg-transparent rounded border border-sky text-white text-b1 xs:p-2 xs:text-sm',
	orange: 'px-[32px] py-[16px] bg-orange rounded text-white text-b1',
} as { [key: string]: string };

const Button = ({
	variant = 'normal',
	color = 'primary',
	onClick,
	disabled,
	className,
	type,
	children,
	...rest
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx('hover:opacity-90 transition-all cursor-pointer', `${btnStyles[color]} ${btnStyles[variant]}`, className)}
			{...rest}>
			{children}
		</button>
	);
};

export default Button;
