import React from 'react';

import {GroupContainer, StyledInput, FormInputLabel, } from './form-input.styles';

// import './form-input.styles.scss';

const FormInput = ({ handleChange, label, value, ...otherProps }) => (
    <GroupContainer>
        <StyledInput onChange={handleChange} {...otherProps} />
        {
            label ?
                <FormInputLabel shrink={value}>
                    {label}
                </FormInputLabel>
                : null
        }
    </GroupContainer>
);

export default FormInput;