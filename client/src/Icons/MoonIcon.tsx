import IconProps from "./IconProps";

export const MoonIcon = ({
	fill = "currentColor",
	filled,
	size,
	height,
	width,
	label,
	...props
}: IconProps) => {
	return (
		<svg
			width={size || width || 24}
			height={size || height || 24}
			viewBox="0 0 32 32"
			fill={filled ? fill : "none"}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21.866 21.447c-3.117 3.12-8.193 3.12-11.313 0s-3.12-8.195 0-11.314c0.826-0.824 1.832-1.453 2.989-1.863 0.365-0.128 0.768-0.035 1.039 0.237 0.274 0.273 0.366 0.677 0.237 1.039-0.784 2.211-0.25 4.604 1.391 6.245 1.638 1.639 4.031 2.172 6.245 1.391 0.362-0.129 0.767-0.036 1.039 0.237 0.273 0.271 0.365 0.676 0.236 1.039-0.408 1.157-1.038 2.164-1.863 2.989zM11.967 11.547c-2.34 2.34-2.34 6.147 0 8.486 2.5 2.501 6.758 2.276 8.937-0.51-2.247 0.141-4.461-0.671-6.109-2.318s-2.458-3.861-2.318-6.108c-0.18 0.141-0.35 0.29-0.51 0.451z"
				stroke={fill}
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
