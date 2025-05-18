import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { Calendar, MapPin, Users, Clock } from 'lucide-react-native';

// Mock data for field visits
const FIELD_VISITS = [
  {
    id: '1',
    location: 'Ambala Region',
    date: '24 Jun 2023',
    status: 'Upcoming',
    description: 'Meeting with farmers to demonstrate new products',
    participants: 12,
    duration: '4 hours',
  },
  {
    id: '2',
    location: 'Ludhiana District',
    date: '18 Jun 2023',
    status: 'Completed',
    description: 'Training session on improved farming techniques',
    participants: 25,
    duration: '3 hours',
  },
  {
    id: '3',
    location: 'Karnal Area',
    date: '10 Jun 2023',
    status: 'Completed',
    description: 'Product trials and result assessment with lead farmers',
    participants: 8,
    duration: '5 hours',
  },
];

export default function FieldDevelopmentScreen() {
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Field Development</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Upcoming Visits</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Total Farms</Text>
          </View>
        </View>
        
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Schedule New Visit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Field Visits</Text>
          
          {FIELD_VISITS.map((visit) => (
            <TouchableOpacity key={visit.id} style={styles.visitCard}>
              <View style={styles.visitHeader}>
                <Text style={styles.visitLocation}>{visit.location}</Text>
                <Text 
                  style={[
                    styles.visitStatus, 
                    { color: visit.status === 'Upcoming' ? '#3F51B5' : '#4CAF50' }
                  ]}
                >
                  {visit.status}
                </Text>
              </View>
              
              <Text style={styles.visitDescription}>{visit.description}</Text>
              
              <View style={styles.visitDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#666" style={styles.detailIcon} />
                  <Text style={styles.detailText}>{visit.date}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Users size={16} color="#666" style={styles.detailIcon} />
                  <Text style={styles.detailText}>{visit.participants} participants</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={16} color="#666" style={styles.detailIcon} />
                  <Text style={styles.detailText}>{visit.duration}</Text>
                </View>
              </View>
              
              <View style={styles.visitActions}>
                <TouchableOpacity style={styles.visitButton}>
                  <Text style={styles.visitButtonText}>View Details</Text>
                </TouchableOpacity>
                
                {visit.status === 'Upcoming' && (
                  <TouchableOpacity style={[styles.visitButton, styles.secondaryButton]}>
                    <Text style={[styles.visitButtonText, styles.secondaryButtonText]}>Update</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Field Insights</Text>
          
          <View style={styles.insightCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg' }}
              style={styles.insightImage}
            />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Crop Yield Improvements</Text>
              <Text style={styles.insightText}>
                Field data shows 22% increase in crop yields where our products were used consistently over the past season.
              </Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.insightCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg' }}
              style={styles.insightImage}
            />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Sustainable Farming Practices</Text>
              <Text style={styles.insightText}>
                Our eco-friendly solutions have helped reduce water usage by 18% while maintaining optimal crop health.
              </Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  header: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3DD39E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionContainer: {
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#3DD39E',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  visitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  visitLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  visitStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  visitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  visitDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  visitActions: {
    flexDirection: 'row',
  },
  visitButton: {
    backgroundColor: '#3DD39E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3DD39E',
  },
  secondaryButtonText: {
    color: '#3DD39E',
  },
  insightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },
  insightImage: {
    width: '100%',
    height: 150,
  },
  insightContent: {
    padding: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#3DD39E',
    fontSize: 14,
    fontWeight: '500',
  },
});