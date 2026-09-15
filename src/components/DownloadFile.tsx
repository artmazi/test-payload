import React from 'react';

const DownloadFile = ({ url }: { url: string }) => {
	const link = document.createElement('a');
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	return <></>;
};

export default DownloadFile;
