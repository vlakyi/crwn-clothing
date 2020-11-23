import styled, { css } from 'styled-components';

const mainColor = 'black';
const subColor = 'grey';
const activeColor = '#4285f4';

const shrinkLabel = css`
    top: -20px;
    left: 0;
    font-size: 12px;
    color: ${mainColor};
`;

export const inputLabelStyles = css`
    
`;

export const inputStyles = css`
    background: none;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};

    &:focus {
      outline: none;
      border-bottom-color: ${activeColor};
    }

    &:focus ~ .form-input-label {
      ${shrinkLabel}
    }
`;

export const GroupContainer = styled.div`
    position: relative;
    margin: 40px 0;

    input[type='password'] {
        letter-spacing: 0.3em;
    }
`;

export const StyledInput = styled.input`
    ${inputStyles};
`;

export const FormInputLabel = styled.label`
    color: ${subColor};
    font-size: 16px;
    font-weight: normal;
    font-family: 'Montserrat';
    position: absolute;
    pointer-events: none;
    top: 10px;
    left: 5px;
    transition: 300ms ease all;

    ${props => props.shrink.length ? shrinkLabel : ''};
`;