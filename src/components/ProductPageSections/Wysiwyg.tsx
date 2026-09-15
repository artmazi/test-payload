import clsx from 'clsx';
import React  from 'react';
import { md2html } from '@/helpers/markdown';

const Wysiwyg = ({ data }: any) => {
	return (
		<section id="wysiwyg" className="flex flex-col">
			<div className="flex w-full max-w-[1200px] py-6 md:py-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
				<div className={clsx('text-center gap-8 flex flex-col', data.classNames)}>
					<div className="text-b1 text-gray [&>span]:font-semibold [&>a]:text-sky" dangerouslySetInnerHTML={{ __html: md2html(data.content) }} />
				</div>
			</div>
		</section>
	);
};

export default Wysiwyg;
