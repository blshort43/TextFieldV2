/* eslint-disable indent */
/**
 *
 * TextField
 *
 */
// NOTE
// To create a date selector with an initial placeHolder text message, use as="input" type="text" which will initially create a text field.
// Then use onFocus={this.switchToDate} to switch the field to a date selector field when the user clicks on it.
// Use onBlur={this.switchToText} to switch it back to a text field with placeHolder text if the user leaves the field without entering a date.

// NOTE Set marginTop/mt on the child component instead of in the Styled Component to keep the top margin from being placed between the label and the TextField.

// NOTE Example:

// <TextField
// marginTop='20px'
// placeHolder="Start Date"
// type="date"
// onFocus={this.switchToDate}
// onBlur={this.switchToText}
// />

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledInput = styled.input`
  outline: none;
  font-family: inherit;
  padding: ${props => (props.padding ? props.padding : '12px')};
  transition: all 0.25s linear;
  margin: 0;
  box-sizing: border-box;
  border: ${props => (props.border ? props.border : '1px solid #909090')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  height: ${props => (props.height ? props.height : '45px')};
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '300px')};
  min-width: 144px;
  :hover {
    border: solid 1px black;
    cursor: text;
    ::placeholder {
      color: black;
      opacity: 1;
    }
  }
  :focus {
    outline-offset: 0;
    border: solid 1px #2e66ff;
    ::placeholder {
      opacity: 0;
    }
  }
`;

const StyledLegend = styled.legend`
  outline: none;
  pointer-events: none;
  font-size: 12px;
  transition: all 0.25s ease-in-out;
  position: absolute;
  box-sizing: border-box;
`;

class TextField extends React.PureComponent {
  state = {
    focused: false,
  };

  componentDidMount() {
    if (this.props.type === 'date') {
      this.handleFocus();
    }
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    if (this.props.value) {
      this.setState({ focused: true });
    } else {
      this.setState({ focused: false });
    }
  };

  render() {
    const { ...props } = this.props;
    return (
      <Card
        m={props.margin || props.m || 0}
        mt={props.mt || 3}
        p={0}
        bg={props.bg}
        borderRadius={props.borderRadius || '6px'}
        width={props.width}
        height="30px"
      >
        <StyledLegend
          style={{
            opacity: `${this.state.focused ? 1 : 0}`,
            transform: `${
              this.state.focused ? 'translate(0, -18px)' : 'translate(10px, 0)'
            }`,
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {props.label}
        </StyledLegend>
        <StyledInput
          {...props}
          value={props.value || ''}
          type={props.type ? props.type : 'text'}
          name={props.name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </Card>
    );
  }
}

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
