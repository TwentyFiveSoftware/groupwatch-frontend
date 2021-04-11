import React, { FunctionComponent } from 'react';
import styles from '../styles/InputBox.module.scss';

const InputBox: FunctionComponent<{ placeholder: string }> = ({ placeholder }) => {
    return <input type={'text'} placeholder={placeholder} className={styles.input} />;
};

export default InputBox;
