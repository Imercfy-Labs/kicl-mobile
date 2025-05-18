import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Bell, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface AppHeaderProps {
  title?: string;
  onMenuPress: () => void;
}

export default function AppHeader({ title, onMenuPress }: AppHeaderProps) {
  const router = useRouter();
  
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Menu color="#333" size={24} />
      </TouchableOpacity>
      
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#333" size={22} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/profile')}
        >
          <User color="#333" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightSection: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});