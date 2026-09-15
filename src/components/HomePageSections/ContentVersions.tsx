import React from 'react';
import { useNavigate } from 'react-router-dom';

import RightArrow2 from 'assets/right-arrow-2.svg';

const ContentVersions = ({ data }: any) => {
	const navigate = useNavigate();

	return (
		<section id="content-versions">
			<div className="container flex flex-col w-full max-w-[1600px] gap-4 lg:gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0 lg:px-4">
				<div className="text-center mb-4">
					<h1 className="text-h1 font-black relative inline-block">
						{data.title}
						{/*<img*/}
						{/*	src={textLine}*/}
						{/*	alt="decoration"*/}
						{/*	className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"*/}
						{/*/>*/}
					</h1>
				</div>
				<div className="flex gap-4 lg:flex-row flex-col">
					{data.items.map((i: any, _i: number) => (
						<div
							key={_i}
							onClick={() => navigate(i.link)}
							className="w-full xs:p-4 lg:min-h-[400px] cursor-pointer transition-all ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
							<div className="flex flex-col relative rounded-md p-4 lg:p-10 h-full w-full bg-teal gap-8 justify-between">
								<div className="flex flex-col gap-4 justify-start items-start">
									<img src={i.icon} alt="icon" className="max-h-[74px]" />
									<h1 className="text-h1 text-sky font-black relative inline-block">{i.title}</h1>
									<p className="text-sub text-white">{i.content}</p>
								</div>
								<img
									src={RightArrow2}
									alt="icon"
									className="flex w-[100px] arrow text-left h-[48px] hover:ml-4 transition-all ease-in duration-150"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContentVersions;
