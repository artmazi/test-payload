import clsx from 'clsx';
import React from 'react';

const Hero = ({ data }: any) => {
	return (
		<section
			style={data.image ? { backgroundImage: `url("${data.image}")` } : undefined}
			id="prod-hero"
			className={clsx(
				'flex w-full md:flex-row flex-col h-[230px] lg:h-[550px] bg-cover bg-center bg-no-repeat relative overflow-hidden'
			)}>
			{data.video && (
				<video
					loop
					muted
					autoPlay
					src={data.video}
					className="absolute left-0 bottom-0 w-full top-[50%] translate-y-[-50%] h-full object-cover"
				/>
			)}
			{data.overlay && (
				<div className="absolute top-0 left-0 w-full h-full flex flex-col flex-1 overlay justify-center items-center bg-[rgba(0,0,0,0.4)] text-white px-4">
					{data.overlay.title && (
						<h1 className="max-w-[950px] w-full text-h1 font-bold text-center">{data.overlay.title}</h1>
					)}
					{data.overlay.sub_title && (
						<p className="text-center max-w-[850px] w-full ">{data.overlay.sub_title}</p>
					)}
				</div>
			)}
		</section>
	);
};

export default Hero;
