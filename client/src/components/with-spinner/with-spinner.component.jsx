import React from 'react';

import Spinner from '../spinner/spinner.component';

// Higher order component (Component which takes component as a prop)
const WithSpinner = WrappedComponent => ({isLoading, ...otherProps }) => {
    return isLoading ?  <Spinner />  : <WrappedComponent {...otherProps} />
}

export default WithSpinner;