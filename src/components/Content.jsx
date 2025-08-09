import React from "react";

const Content = ({ name, center = false, children }) => {
	return (
		<div className={`flex gap-[50px] ${center ? "items-center" : ""}`}>
			<div className="w-28 h-fit min-w-[112px] flex-shrink-0">
				<p className="text-gray-100">{name}</p>
			</div>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default Content;
