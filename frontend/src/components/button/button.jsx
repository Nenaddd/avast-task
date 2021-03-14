import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

export const Button = ({
  children,
  primary,
  secondary,
  onClick,
  disabled,
  className,
}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        styles.button,
        primary && styles.primary,
        secondary && styles.secondary,
        className
      )}
    >
      {children}
    </button>
  );
