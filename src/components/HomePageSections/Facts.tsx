import { Trans } from 'react-i18next';

import React from 'react';

const Facts = ({ data }: any) => {
	return (
		<section id="facts">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block">{data.title}</h1>
				</div>
				<div className="flex shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] rounded-xl p-8 lg:p-16 mt-8 gap-12 lg:gap-24 flex-col">
					<h1 className="text-3xl lg:text-h1 font-black relative inline-block">{data.subTitle}</h1>
					<div className="flex flex-1 flex-col lg:flex-row">
						<div className="flex flex-1 flex-wrap lg:my-[-15px]">
							{data.factsLeft.map((f: any, i: number) => (
								<div className="flex flex-0 xs:w-full md:flex-0-5 p-1 lg:p-4 flex-col" key={i}>
									<div className="flex flex-col border border-[#0000001A] rounded-xl p-4 gap-8 justify-between h-full">
										<p className="text-b2 text-gray font-semibold">{f.title}</p>
										<h1 className="text-h1 font-black">{f.value}</h1>
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-1 flex-col gap-4 mt-4 lg:mt-0">
							{data.factsRight.map((f: any, i: number) => (
								<div
									key={i}
									className="flex border border-[#0000001A] rounded-xl px-8 py-6 lg:gap-8 lg:items-center flex-col lg:flex-row">
									<h3 className="text-h3 font-black text-orange lg:min-w-[180px]">{f.value}</h3>
									<p className="text-b1 text-gray font-semibold">{f.title}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-1 lg:flex-row lg:gap-8 flex-col gap-4">
					<div className="flex w-full lg:max-w-[370px] rounded-md bg-sky px-8 py-16 text-white flex-col gap-8 justify-center">
						<h2 className="text-h2 font-black">{data.factsMosaic.fm1.title}</h2>
						<p className="text-b1">
							<Trans i18nKey={data.factsMosaic.fm1.text}>
								<br />
							</Trans>
						</p>
					</div>
					<div className="flex flex-1 flex-col gap-2 text-center xs:hidden">
						<div className="flex flex-1 gap-2">
							<div className="flex flex-1 bg-water rounded-sm justify-center items-center p-4">
								<div className="flex gap-2 flex-col">
									<p className="font-bold text-b1">{data.factsMosaic.fm2.text1}</p>
									<h1 className="font-black text-h1">{data.factsMosaic.fm2.text2}</h1>
									<p className="font-bold text-b1">{data.factsMosaic.fm2.text3}</p>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-2">
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-teal text-white flex-col gap-2">
									<h3 className="text-h3 font-bold">{data.factsMosaic.fm3.text1}</h3>
									<h2 className="text-h2 font-black">{data.factsMosaic.fm3.text2}</h2>
								</div>
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky text-white">
									<h3 className="text-h3 font-bold">
										<Trans i18nKey={data.factsMosaic.fm4.text1}>
											<br />
										</Trans>
									</h3>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-2">
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky text-white flex-col gap-2">
									<h3 className="text-h3 font-bold">{data.factsMosaic.fm5.text1}</h3>
									<h2 className="text-h2 font-black">{data.factsMosaic.fm5.text2}</h2>
								</div>
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-green gap-2 flex-col">
									<p className="font-bold text-b1">{data.factsMosaic.fm6.text1}</p>
									<p className="font-bold text-b1">
										<Trans i18nKey={data.factsMosaic.fm6.text2}>
											<span className="text-h1 font-black" />
										</Trans>
									</p>
									<p className="font-bold text-b1">{data.factsMosaic.fm6.text3}</p>
								</div>
							</div>
						</div>
						<div className="flex gap-2">
							<div className="flex flex-2-11 rounded-sm justify-center items-center p-4 bg-teal gap-2 text-white flex-col">
								<p className="font-bold text-b1">{data.factsMosaic.fm7.text1}</p>
								<h1 className="font-black text-h1">{data.factsMosaic.fm7.text2}</h1>
								<p className="font-bold text-b1">{data.factsMosaic.fm7.text3}</p>
							</div>
							<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky gap-2 text-white flex-col">
								<p className="font-bold text-b1">{data.factsMosaic.fm8.text1}</p>
								<h1 className="font-black text-h2">{data.factsMosaic.fm8.text2}</h1>
								<p className="font-bold text-b1">{data.factsMosaic.fm8.text3}</p>
							</div>
						</div>
					</div>
					{/* Mobile structure */}
					<div className="flex-1 flex-col gap-4 text-center xs:flex hidden">
						<div className="flex flex-1 gap-4">
							<div className="flex flex-1 bg-water rounded-sm justify-center items-center p-4">
								<div className="flex gap-4 flex-col">
									<p className="font-bold text-b2">{data.factsMosaic.fm2.text1}</p>
									<h1 className="font-black text-h2">{data.factsMosaic.fm2.text2}</h1>
									<p className="font-bold text-b2">{data.factsMosaic.fm2.text3}</p>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-4">
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-teal text-white flex-col gap-4">
									<h3 className="text-h4 font-bold">{data.factsMosaic.fm3.text1}</h3>
									<h2 className="text-h3 font-black">{data.factsMosaic.fm3.text1}</h2>
								</div>
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky text-white">
									<h3 className="text-h4 font-bold">
										<Trans i18nKey={data.factsMosaic.fm4.text1}>
											<br />
										</Trans>
									</h3>
								</div>
							</div>
						</div>
						<div className="flex gap-4">
							<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-teal gap-6 text-white flex-col">
								<p className="font-bold text-b2">{data.factsMosaic.fm7.text1}</p>
								<h1 className="font-black text-h2">{data.factsMosaic.fm7.text2}</h1>
								<p className="font-bold text-b2">{data.factsMosaic.fm7.text3}</p>
							</div>
							<div className="flex gap-4 flex-col flex-1">
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky text-white flex-col gap-4">
									<h3 className="text-h4 font-bold">{data.factsMosaic.fm5.text1}</h3>
									<h2 className="text-h3 font-black">{data.factsMosaic.fm5.text2}</h2>
								</div>
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-green gap-4 flex-col">
									<p className="font-bold text-b2">{data.factsMosaic.fm6.text1}</p>
									<p className="font-bold text-b2">
										<Trans i18nKey={data.factsMosaic.fm6.text2}>
											<span className="text-h2 font-black" />
										</Trans>
									</p>
									<p className="font-bold text-b2">{data.factsMosaic.fm6.text3}</p>
								</div>
								<div className="flex flex-1 rounded-sm justify-center items-center p-4 bg-sky gap-4 text-white flex-col">
									<p className="font-bold text-b2">{data.factsMosaic.fm8.text1}</p>
									<h1 className="font-black text-h3">{data.factsMosaic.fm8.text2}</h1>
									<p className="font-bold text-b2">{data.factsMosaic.fm8.text3}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Facts;
