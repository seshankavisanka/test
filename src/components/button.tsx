import React, { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  iconClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  onClick,
  disabled,
  className,
  style,
  iconClassName,
  children,
}) => {
  // // define some basic styles for Button
  // const buttonStyle: CSSProperties = {
  //   padding: "10px 20px",
  //   fontFamily: "Arial, Helvetica, sans-serif",
  //   fontWeight: "bold",
  //   fontSize: "25px",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   transform: "background-color 0.3s ease",
  //   ...style, // allow overriding styles with 'style prop
  // };

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={className}
        style={style}
      >
        <i className={iconClassName}></i> {children}
      </button>
    </div>
  );
};

export default Button;
