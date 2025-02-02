import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ label, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
