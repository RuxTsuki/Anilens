interface Props {
  fill?: string;
  className?: string;
}

export const CloseIconSvg = ({ fill = "", className = "" }: Props) => {
  return (
    <svg
      className={className}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
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
