import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { Search, ArrowUpDown, Filter } from 'lucide-react-native';

// Mock data for inventory items
const INVENTORY_ITEMS = [
  {
    id: '1',
    name: 'Super Grow Fertilizer',
    category: 'Fertilizers',
    stock: 240,
    unit: 'bags',
    price: '₹750',
  },
  {
    id: '2',
    name: 'Premium Seeds Mix',
    category: 'Seeds',
    stock: 120,
    unit: 'packets',
    price: '₹320',
  },
  {
    id: '3',
    name: 'Pest Control Solution',
    category: 'Pesticides',
    stock: 85,
    unit: 'bottles',
    price: '₹480',
  },
  {
    id: '4',
    name: 'Garden Tools Set',
    category: 'Equipment',
    stock: 45,
    unit: 'sets',
    price: '₹1,200',
  },
  {
    id: '5',
    name: 'Soil Enhancer',
    category: 'Fertilizers',
    stock: 180,
    unit: 'bags',
    price: '₹550',
  },
  {
    id: '6',
    name: 'Weedicide Pro',
    category: 'Herbicides',
    stock: 95,
    unit: 'cans',
    price: '₹380',
  },
];

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredItems = INVENTORY_ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const renderInventoryItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      
      <View style={styles.itemDetails}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Stock</Text>
          <Text style={styles.detailValue}>
            {item.stock} {item.unit}
          </Text>
        </View>
        
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>{item.price}</Text>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Inventory</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search inventory..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filtersRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={16} color="#3DD39E" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <ArrowUpDown size={16} color="#3DD39E" />
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Items</Text>
            <Text style={styles.summaryValue}>
              {INVENTORY_ITEMS.length}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Low Stock</Text>
            <Text style={styles.summaryValue}>
              {INVENTORY_ITEMS.filter(item => item.stock < 50).length}
            </Text>
          </View>
        </View>
        
        <FlatList
          data={filteredItems}
          renderItem={renderInventoryItem}
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
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  filterText: {
    fontSize: 14,
    color: '#3DD39E',
    fontWeight: '500',
    marginLeft: 8,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  itemHeader: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  actionButton: {
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#3DD39E',
    fontWeight: '500',
  },
});