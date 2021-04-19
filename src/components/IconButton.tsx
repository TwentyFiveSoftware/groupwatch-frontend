import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../styles/IconButton.module.scss';

interface Props {
    icon: IconProp;
    onClick: () => void;
    disabled?: boolean;
}

const IconButton: FunctionComponent<Props> = ({ icon, onClick, disabled = false }: Props): JSX.Element => {
    return disabled ? (
        <FontAwesomeIcon className={styles.button__disabled} icon={icon} />
    ) : (
        <FontAwesomeIcon className={styles.button} icon={icon} onClick={() => onClick()} />
    );
};

export default IconButton;
