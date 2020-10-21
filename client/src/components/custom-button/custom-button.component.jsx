import React from 'react';

import { CustomButtonContaner } from './custom-button.styles'

const CustomButton = ({children, ...props}) => (
    <CustomButtonContaner {...props}>
        {children}
    </CustomButtonContaner>
);

export default CustomButton;