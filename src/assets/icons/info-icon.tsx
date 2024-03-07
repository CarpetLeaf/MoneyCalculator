type infoIconProps = React.SVGAttributes<SVGSVGElement> & {
  color: string;
};

const InfoIcon = (props: infoIconProps) => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="11" r="10" fill={props.color} />
      <path
        d="M10.214 6.92C9.83 6.92 9.494 6.782 9.206 6.506C8.93 6.218 8.792 5.882 8.792 5.498C8.792 5.114 8.93 4.778 9.206 4.49C9.494 4.202 9.83 4.058 10.214 4.058C10.61 4.058 10.946 4.202 11.222 4.49C11.51 4.778 11.654 5.114 11.654 5.498C11.654 5.882 11.51 6.218 11.222 6.506C10.946 6.782 10.61 6.92 10.214 6.92ZM9.062 17V8H11.384V17H9.062Z"
        fill="white"
      />
    </svg>
  );
};

export default InfoIcon;
