import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { inputStyles } from '../../../styles/InputStyles';

const PickerInput = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={inputStyles.inputGroup}>
      <Text style={inputStyles.inputLabel}>{label}</Text>
      <View style={inputStyles.pickerContainer}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label="Selecione uma opção" value="" />
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerInput;
