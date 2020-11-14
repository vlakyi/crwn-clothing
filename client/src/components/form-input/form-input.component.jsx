import React from 'react';

import { GroupContainer, StyledInput, FormInputLabel, } from './form-input.styles';

// import './form-input.styles.scss';

const FormInput = ({ handleChange, label, value, id, ...otherProps }) => (
    <GroupContainer>
        <StyledInput onChange={handleChange} id={id} {...otherProps} />
        {
            label ?
                <FormInputLabel shrink={value} htmlFor={`${id ? id : ''}`}>
                    {label}
                </FormInputLabel>
                : null
        }
    </GroupContainer>
);

export default FormInput;