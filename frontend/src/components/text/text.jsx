import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

export const Text = ({
  children,
  primary,
  secondary,
  className,
  bold,
  semibold,
  small,
  medium,
  large,
}) => (
    <span
      className={classnames(
        styles.text,
        primary && styles.primary,
        secondary && styles.secondary,
        bold && styles.bold,
        semibold && styles.semibold,
        small && styles.small,
        medium && styles.medium,
        large && styles.large,
        className
      )}
    >
      {children}
    </span>
  );

