import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { Menu, Bell, User } from 'lucide-react-native';
import Logo from '@/components/Logo';
import { DrawerContext } from './_layout';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [lastInTime, setLastInTime] = useState('--:--');
  const [lastOutTime, setLastOutTime] = useState('--:--');
  const { toggleDrawer } = React.useContext(DrawerContext);
  const router = useRouter();

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const handlePunch = () => {
    const currentTime = getCurrentTime();
    if (isPunchedIn) {
      setLastOutTime(currentTime);
    } else {
      setLastInTime(currentTime);
    }
    setIsPunchedIn(!isPunchedIn);
  };

  const ProgressCard = ({ title, value }) => (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>{title}</Text>
      <Text style={styles.progressValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Menu size={24} color="#000" />
        </TouchableOpacity>
        <Logo size="small" showText={false} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/profile')}
          >
            <User size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.punchButton, isPunchedIn ? styles.punchOutButton : styles.punchInButton]}
          onPress={handlePunch}
        >
          <Text style={styles.punchButtonText}>
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>Last In Time: {lastInTime}</Text>
          <Text style={styles.timeText}>Last Out Time: {lastOutTime}</Text>
        </View>

        <Text style={styles.sectionTitle}>My Progress:</Text>

        <View style={styles.progressGrid}>
          <ProgressCard 
            title="No. of Dealers Visited" 
            value="5"
          />
          <ProgressCard 
            title="Sales Target Progress (monthly)" 
            value="63%"
          />
          <ProgressCard 
            title="Orders Placed Today" 
            value="3"
          />
          <ProgressCard 
            title="Order Value Today" 
            value="₹ 7000"
          />
          <ProgressCard 
            title="Field Activities this Week" 
            value="2"
          />
          <ProgressCard 
            title="Hours Worked Today" 
            value="5"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: '#E8F5E9',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  punchButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  punchInButton: {
    backgroundColor: '#8CC63F',
  },
  punchOutButton: {
    backgroundColor: '#FF3B30',
  },
  punchButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  timeText: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});