import React, { FunctionComponent } from 'react';
import styles from '../styles/InputBox.module.scss';

const InputBox: FunctionComponent<{ placeholder: string; onSubmit: Function }> = ({ placeholder, onSubmit }) => {
    return (
        <input
            type={'text'}
            placeholder={placeholder}
            className={styles.input}
            onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                const value = (e.target as HTMLInputElement).value;
                if (value.length === 0) return;
                onSubmit(value);
            }}
        />
    );
};

export default InputBox;
