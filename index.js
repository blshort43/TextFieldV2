/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledCard = styled(Card)`
  width: ${props => (props.width ? props.width : '200px')};
  height: ${props => (props.height ? props.height : '55px')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
`;

const StyledInput = styled.input`
  color: ${props => (props.color ? props.color : '#000000')};
  outline: none;
  font-family: inherit;
  padding: ${props =>
    props.padding || props.p ? props.padding || props.p : '12px'};
  transition: all 0.25s linear;
  box-sizing: border-box;
  border: ${props => (props.border ? props.border : '1px solid #909090')};
  background-color: ${props => props.background || props.bg};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  width: 100%;
  height: 100%;
  :hover {
    color: ${props => (props.colorHover ? props.colorHover : '#000000')};
    border: ${props =>
      props.borderHover ? props.borderHover : '1px solid #000000'};
    background-color: ${props => props.backgroundHover || props.bgHover};
    cursor: text;
    ::placeholder {
      opacity: 1;
    }
  }
  :focus {
    outline-offset: 0;
    color: ${props => (props.colorFocus ? props.colorFocus : '#000000')};
    border: ${props =>
      props.borderFocus ? props.borderFocus : '1px solid #2e66ff'};
    background-color: ${props => props.backgroundFocus || props.bgFocus};
    ::placeholder {
      opacity: 0;
    }
  }
`;

const StyledLegend = styled.legend`
  color: ${props => (props.labelColor ? props.labelColor : '#000000')};
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
    const {
      color,
      value,
      type,
      name,
      onFocus,
      onBlur,
      onChange,
      label,
      labelColor,
      border,
      borderFocused,
      borderHovered,
      placeholder,
      padding,
      background,
      bg,
      borderRadius,
      min,
      readOnly,
      ...rest
    } = this.props;
    return (
      <StyledCard {...rest}>
        <StyledLegend
          labelColor={labelColor}
          style={{
            opacity: `${this.state.focused ? 1 : 0}`,
            transform: `${
              this.state.focused ? 'translate(0, -18px)' : 'translate(10px, 0)'
            }`,
          }}
        >
          {label}
        </StyledLegend>
        <StyledInput
          label={label}
          min={min}
          color={color}
          background={background || bg}
          padding={padding}
          // border="1px solid green"
          border={border}
          borderFocused={borderFocused}
          borderHovered={borderHovered}
          borderRadius={borderRadius}
          placeholder={placeholder || ''}
          value={value || ''}
          type={type || 'text'}
          name={name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
        />
      </StyledCard>
    );
  }
}

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
