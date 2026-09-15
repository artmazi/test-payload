import React from 'react';

import textLine from 'assets/text-line.svg';

const Functions = ({ data }: any) => {
	const items = data.items.map((c: any, i: number) => ({
		id: i,
		title: c.title,
		content: c.content,
		picture: c.picture,
	}));

	return (
		<section id="prod-functions" className="flex">
			<div className="flex w-full max-w-[1200px] py-16 md:px-16 xl:px-16 px-4 mx-auto gap-24 flex-col">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block">
						{data.title.part1}{' '}
						<span className="relative">
							{data.title.part2}
							<img
								src={textLine}
								alt="decoration"
								className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
							/>
						</span>
						{data.title.part3 ?? ''}
					</h1>
				</div>
				<div className="flex flex-1 gap-16 lg:gap-4 justify-between flex-col lg:flex-row">
					{items.map((item: any, i: number) => (
						<div key={i} className="flex flex-1 flex-col items-center gap-4">
							<img src={item.picture} alt="function-pic" className="max-w-[170px]" />
							<h3 className="text-h3 text-center">{item.title}</h3>
							<p className="text-center">{item.content}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Functions;
