import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Higher order component (Component which takes component as a prop)
const WithSpinner = WrappedComponent => ({isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;