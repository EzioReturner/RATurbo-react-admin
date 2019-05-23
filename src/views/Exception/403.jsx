import React, { Fragment } from 'react';
import Exception from '@src/components/Exception';
import FormatterLocale from '@components/FormatterLocale';
import { useState, useEffect } from 'react';

function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
	}, [width]);
	return width;
}

function responsiveComponent() {
	const width = useWindowWidth();
	return (
		<p>当前窗口宽度为 {width}</p>
	)
}

export default () => (
	<Fragment>
		{responsiveComponent()}
		<Exception errorCode="403" title={<FormatterLocale id="exception.403" />} />
	</Fragment>
);
