import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform,
  Pressable
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  style, 
  textStyle,
  loading = false,
  disabled = false
}: ButtonProps) {
  const ButtonComponent = Platform.OS === 'web' ? Pressable : TouchableOpacity;
  
  return (
    <ButtonComponent
      style={({ pressed }) => [
        styles.button,
        style,
        disabled && styles.buttonDisabled,
        Platform.OS === 'web' && pressed && styles.buttonPressed
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B2D94A',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
    userSelect: Platform.OS === 'web' ? 'none' : undefined,
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#B2D94A80',
    elevation: 0,
    cursor: Platform.OS === 'web' ? 'not-allowed' : 'default',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});