import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, LogOut } from 'lucide-react-native';
import { useAuth } from '../auth/AuthContext';
import GradientBackground from '@/components/GradientBackground';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const ProfileField = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueContainer}>
        <Text style={styles.fieldValue}>{value || 'Not specified'}</Text>
      </View>
    </View>
  );

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/');
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.username}>{user?.name || 'User'}</Text>
          <Text style={styles.userRole}>{user?.role || 'Role not specified'}</Text>
        </View>

        <View style={styles.infoSection}>
          <ProfileField label="Name" value={user?.name || ''} />
          <ProfileField label="Email" value={user?.email || ''} />
          <ProfileField label="Branch ID" value={user?.branch_id || ''} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2E3192',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  userRole: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  fieldValueContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 12,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});