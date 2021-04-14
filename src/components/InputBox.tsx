import React, { FunctionComponent } from 'react';
import styles from '../styles/InputBox.module.scss';

const InputBox: FunctionComponent<{ placeholder: string; value: string; onInput: Function; onSubmit: Function }> = ({
    placeholder,
    value,
    onInput,
    onSubmit,
}) => {
    return (
        <input
            type={'text'}
            placeholder={placeholder}
            className={styles.input}
            value={value}
            onInput={(e) => onInput((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmit((e.target as HTMLInputElement).value);
            }}
        />
    );
};

export default InputBox;
