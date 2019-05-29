import React, { Fragment, useState, useEffect } from 'react';
import Exception from '@src/components/Exception';
import FormatterLocale from '@components/FormatterLocale';

function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
	}, [width]);
	return width;
}

const ResponsiveComponent = () => {
	const width = useWindowWidth();
	return (
		<p>当前窗口宽度为 {width}</p>
	);
}

export default () => {
	return (
		<Fragment>
			{ResponsiveComponent}
			<Exception errorCode="403" title={<FormatterLocale id="exception.403" />} />
		</Fragment>
	);
}

