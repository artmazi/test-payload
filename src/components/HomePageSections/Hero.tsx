import React from 'react';

import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

const Hero = ({ data }: any) => {
	const navigate = useNavigate();

	return (
		<section
			id="hero"
			className="flex w-full container mx-auto py-16 md:px-16 xl:px-32 px-4 lg:flex-row flex-col-reverse">
			<div className="flex flex-1 flex-col gap-8 justify-center">
				<div>
					<h1 className="text-h1 font-black">{data.title}</h1>
					<h3 className="text-h3 font-medium italic text-sky">{data.description}</h3>
				</div>
				<div>
					<p className="text-b1 text-gray">{data.content}</p>
				</div>
				<div className="flex gap-4">
					<Button className="w-fit" onClick={() => window.open(data.buttonLink, '_blank')}>
						{data.button}
					</Button>
					{data.button2 && (
						<Button
							color="secondary"
							className="w-fit !text-sky"
							onClick={() => navigate(data.buttonLink2)}>
							{data.button2}
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-1 justify-center items-center">
				<img alt="hero-img" src={data.heroImg} className="max-h-[500px]" />
			</div>
		</section>
	);
};

export default Hero;
