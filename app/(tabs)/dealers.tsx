import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { Search, Plus, Info } from 'lucide-react-native';

// Mock data for dealers
const DEALERS = [
  {
    id: '1',
    name: 'Agro Solutions Ltd.',
    location: 'Chandigarh, Punjab',
    status: 'active',
    lastOrder: '2 days ago',
  },
  {
    id: '2',
    name: 'Krishi Kendra',
    location: 'Ambala, Haryana',
    status: 'active',
    lastOrder: '1 week ago',
  },
  {
    id: '3',
    name: 'Farm Supplies Co.',
    location: 'Ludhiana, Punjab',
    status: 'inactive',
    lastOrder: '1 month ago',
  },
  {
    id: '4',
    name: 'Seedtech Enterprises',
    location: 'Karnal, Haryana',
    status: 'active',
    lastOrder: '3 days ago',
  },
  {
    id: '5',
    name: 'Green Growth Agro',
    location: 'Jalandhar, Punjab',
    status: 'active',
    lastOrder: '1 day ago',
  },
  {
    id: '6',
    name: 'Rural Agri Center',
    location: 'Rohtak, Haryana',
    status: 'inactive',
    lastOrder: '2 months ago',
  },
];

export default function DealersScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredDealers = DEALERS.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const renderDealerItem = ({ item }) => (
    <TouchableOpacity style={styles.dealerCard}>
      <View style={styles.dealerHeader}>
        <Text style={styles.dealerName}>{item.name}</Text>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: item.status === 'active' ? '#4CAF50' : '#FF9800' }
        ]} />
      </View>
      
      <Text style={styles.dealerLocation}>{item.location}</Text>
      
      <View style={styles.dealerFooter}>
        <Text style={styles.lastOrderText}>Last order: {item.lastOrder}</Text>
        
        <TouchableOpacity style={styles.infoButton}>
          <Info size={16} color="#555" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dealers</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dealers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{DEALERS.filter(d => d.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{DEALERS.filter(d => d.status === 'inactive').length}</Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{DEALERS.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
        
        <FlatList
          data={filteredDealers}
          renderItem={renderDealerItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#3DD39E',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 16,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  dealerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  dealerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dealerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  dealerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastOrderText: {
    fontSize: 12,
    color: '#888',
  },
  infoButton: {
    padding: 6,
  },
});