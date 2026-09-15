"use client";

import { Trans } from 'react-i18next';

import React from 'react';
import { Link } from 'next/link';

const Footer = ({ data }: any) => {
	return (
		<footer className="container flex flex-col gap-8 w-full max-w-[1600px] mx-auto py-8 md:px-16 xl:px-32 px-4">
			<div className="flex flex-1 gap-4">
				<div className="flex flex-1 text-gray flex-col">
					<p className="text-b1 font-black">{data.companyName}</p>
					<br />
					<p className="text-b1">
						<Trans i18nKey={data.companyAddress}>
							<br />
						</Trans>
					</p>
					<br />
					<p className="text-b1">{data.companyPhone}</p>
					<br />
					<p className="text-b1">{data.companyEmail}</p>
				</div>
				<div className="flex flex-1 lg:flex-2 justify-end">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10787.624860124415!2d8.305585!3d47.472257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47901340285400e5%3A0x12d189dce86a1820!2siNovitas%20AG!5e0!3m2!1sen!2sus!4v1693416594662!5m2!1sen!2sus"
						width="400"
						height="200"
						loading="lazy"
						className="w-full"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</div>
			<div className="flex">
				<hr className="w-full border-gray opacity-10" />
			</div>
			<div className="flex text-gray flex-col lg:flex-row gap-4 lg:gap-0">
				<div className="flex flex-1 justify-center lg:justify-start">
					<p className="text-b3">{data.copyrights}</p>
				</div>
				<div className="flex flex-2 justify-between flex-col lg:flex-row gap-6 lg:gap-0">
					<div className="flex justify-around sm:gap-8 sm:justify-center lg:justify-start">
						{(data.links || []).map((l: any, i: number) => (
							<Link key={i} className="text-b3" href={l.link}>
								{l.title}
							</Link>
						))}
					</div>
					<div className="flex gap-3 justify-between lg:justify-start px-4 lg:px-0">
						{(data.socials || []).map((item: any, index: number) => {
							return (
								<a href={item.link} target="_blank" rel="noreferrer" key={index}>
									<img src={item.icon} alt="socials-logo" />
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
