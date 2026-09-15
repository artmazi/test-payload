import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductVS2 = ({ data }: any) => {
	return (
		<section id="product-vs" className={clsx(data.className)}>
			<div className="container flex flex-col items-center gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				<p className="text-h1 text-center text-black font-bold">{data.title}</p>
				{data.items.map((i: any, _i: number) => (
					<div className={clsx('flex flex-col md:flex-row justify-between min-w-64 py-2')} key={_i}>
						<Link
							to={i.leftHref}
							className="p-4 items-center cursor-pointer justify-center border-2 border-blue-200 hover:border-sky rounded-xl flex flex-1">
							{i.left}
						</Link>
					</div>
				))}
			</div>
		</section>
	);
};

export default ProductVS2;
