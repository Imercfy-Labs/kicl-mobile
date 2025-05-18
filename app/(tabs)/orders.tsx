import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { ShoppingCart, ClipboardCheck, Truck as TruckDelivery } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock data for recent orders
const RECENT_ORDERS = [
  {
    id: 'TK3842',
    date: '12 Jun 2023',
    dealer: 'Agro Solutions Ltd.',
    amount: '₹24,500',
    status: 'Delivered',
  },
  {
    id: 'TK3836',
    date: '10 Jun 2023',
    dealer: 'Krishi Kendra',
    amount: '₹18,750',
    status: 'Processing',
  },
  {
    id: 'TK3830',
    date: '08 Jun 2023',
    dealer: 'Seedtech Enterprises',
    amount: '₹32,000',
    status: 'In Transit',
  },
];

export default function OrdersScreen() {
  const router = useRouter();
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Orders</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/place')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(61, 211, 158, 0.1)' }]}>
              <ShoppingCart color="#3DD39E" size={24} />
            </View>
            <Text style={styles.actionTitle}>Place Order</Text>
            <Text style={styles.actionSubtitle}>Create a new order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/my-orders')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(63, 81, 181, 0.1)' }]}>
              <ClipboardCheck color="#3F51B5" size={24} />
            </View>
            <Text style={styles.actionTitle}>My Orders</Text>
            <Text style={styles.actionSubtitle}>View your orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/orders/track')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 152, 0, 0.1)' }]}>
              <TruckDelivery color="#FF9800" size={24} />
            </View>
            <Text style={styles.actionTitle}>Track Order</Text>
            <Text style={styles.actionSubtitle}>Check order status</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          
          {RECENT_ORDERS.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderTop}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text 
                  style={[
                    styles.orderStatus, 
                    { 
                      color: order.status === 'Delivered' 
                        ? '#4CAF50' 
                        : order.status === 'In Transit' 
                          ? '#FF9800' 
                          : '#3F51B5'
                    }
                  ]}
                >
                  {order.status}
                </Text>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.orderDetail}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{order.date}</Text>
                </View>
                
                <View style={styles.orderDetail}>
                  <Text style={styles.detailLabel}>Dealer</Text>
                  <Text style={styles.detailValue}>{order.dealer}</Text>
                </View>
                
                <View style={styles.orderDetail}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>{order.amount}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Orders</Text>
          </TouchableOpacity>
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
  actionsContainer: {
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recentContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDetails: {
    marginBottom: 16,
  },
  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  viewDetailsButton: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#3DD39E',
    fontWeight: '500',
  },
  viewAllButton: {
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3DD39E',
    fontWeight: '500',
  },
});