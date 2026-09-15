import clsx from 'clsx';
import React, { useState } from 'react';
import DataMapMini from 'components/DataMapInfra3d/DataMapMini';
import DataMapPage from 'components/DataMapInfra3d/DataMapPage';

const TextWithMap = ({ data }: any) => {
	const [showHover, setShowHover] = useState(true);

	return (
		<section id="prod-info" className="flex flex-col">
			{data.bigMap ? (
				<DataMapPage content={data.content} />
			) : (
				<div className="flex w-full max-w-[1600px] py-16 md:px-16 xl:px-32 px-4 text-white mx-auto gap-8 lg:flex-row flex-col">
					<div className={clsx('content flex flex-1 justify-center items-center')}>
						<div className="p-8">{data.content}</div>
					</div>
					<div className="relative flex flex-1">
						{showHover && (
							<div
								className="cursor-pointer absolute w-full h-full bg-teal opacity-70 z-50 flex items-center justify-center"
								onClick={() => setShowHover(!showHover)}>
								Zu den Ökosystem-Daten (heranzoomen)
							</div>
						)}
						<DataMapMini />
					</div>
				</div>
			)}
		</section>
	);
};

export default TextWithMap;
