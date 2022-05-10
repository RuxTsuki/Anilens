interface Props {
  fill?: string;
  className?: string;
  height?: string;
}

export const CloseIconSvg = ({
  fill = "",
  className = "",
  height = "1rem",
}: Props) => {
  return (
    <svg
      className={className}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={height}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        stroke="#000"
        strokeWidth="2"
        d="M3,3 L21,21 M3,21 L21,3"
      ></path>
    </svg>
  );
};
