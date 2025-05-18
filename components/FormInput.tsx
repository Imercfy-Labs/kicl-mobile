import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function FormInput({ 
  label, 
  error, 
  containerStyle,
  ...props 
}: FormInputProps) {
  return (
    <TouchableWithoutFeedback onPress={() => {
      // This ensures the input gets focus when tapped anywhere in its container
      if (Platform.OS === 'web') {
        const input = document.getElementById(`input-${label}`);
        input?.focus();
      }
    }}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          id={`input-${label}`}
          style={[
            styles.input,
            error ? styles.inputError : null,
            Platform.OS === 'web' && styles.webInput
          ]}
          placeholderTextColor="#888"
          {...props}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#000',
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  webInput: {
    outlineStyle: 'none',
    cursor: 'text',
    ':focus': {
      borderColor: '#3DD39E',
      borderWidth: 2,
    },
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
});