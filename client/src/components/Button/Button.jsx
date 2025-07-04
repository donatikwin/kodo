import classes from './Button.module.css';

export default function Button ({ children, variant = "primary", onClick, ...props}) {
  return (
    <button
      className={`${classes.btn} ${classes[`btn--${variant}`]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}