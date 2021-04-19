import React, { FunctionComponent } from 'react';
import styles from '../styles/InputBox.module.scss';

interface Props {
    placeholder: string;
    value: string;
    onInput: (value: string) => void;
    onSubmit: (value: string) => void;
}

const InputBox: FunctionComponent<Props> = ({ placeholder, value, onInput, onSubmit }: Props): JSX.Element => {
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
