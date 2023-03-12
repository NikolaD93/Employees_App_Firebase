export const Button = ({ className, children, style, type, onClick }) => {
  return <button className={className} style={style} type={type} onClick={() => onClick()}>{children}</button>;
};
