import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  style?: object;
}

export default function MetricCard({ title, value, subtitle, style }: MetricCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    minWidth: '45%',
    margin: 8,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
});