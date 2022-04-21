interface Props {
  fill: string;
  className: string;
}

export const CircleSvg = ({ fill, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 32 32"
      fill={fill}
    >
      <circle cx="16" cy="16" r="16" />
    </svg>
  );
};
