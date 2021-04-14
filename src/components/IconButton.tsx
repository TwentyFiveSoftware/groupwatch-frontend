import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../styles/IconButton.module.scss';

const IconButton: FunctionComponent<{ icon: IconProp; onClick: Function; disabled?: boolean }> = ({
    icon,
    onClick,
    disabled = false,
}) => {
    return disabled ? (
        <FontAwesomeIcon className={styles.button__disabled} icon={icon} />
    ) : (
        <FontAwesomeIcon className={styles.button} icon={icon} onClick={() => onClick()} />
    );
};

export default IconButton;
