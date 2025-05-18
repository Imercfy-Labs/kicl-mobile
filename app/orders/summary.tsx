import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';

export default function OrderSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Parse cart items from URL params
  const orderItems = params.cart ? JSON.parse(decodeURIComponent(params.cart as string)) : [];

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.05; // 5% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const ApprovalModal = () => {
    if (!showApprovalModal) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowApprovalModal(false)}
          >
            <X size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Action Required</Text>
          <Text style={styles.modalDescription}>
            The order includes a product with a quantity that exceeds the allowed limit. Manager's approval is required to proceed further.
          </Text>

          <Text style={styles.modalSubtitle}>Order list:</Text>
          {orderItems.map((item, index) => (
            <View key={index} style={styles.modalItem}>
              <Text style={styles.modalItemName}>{item.name}</Text>
              <View style={styles.modalItemDetails}>
                <Text style={styles.modalItemQty}>Qty: {item.quantity}</Text>
                <Text style={styles.modalItemPrice}>₹{item.total.toLocaleString()}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={[
              styles.requestButton,
              requestSent && styles.requestButtonSent
            ]}
            onPress={() => {
              setRequestSent(true);
              setTimeout(() => {
                setShowApprovalModal(false);
                router.push('/orders');
              }, 2000);
            }}
            disabled={requestSent}
          >
            <Text style={styles.requestButtonText}>
              {requestSent ? 'Request Sent' : 'Request Approval'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.reviseButton}
            onPress={() => {
              setShowApprovalModal(false);
              router.back();
            }}
          >
            <Text style={styles.reviseButtonText}>Revise Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerTitle: "Order Summary",
        }}
      />

      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.orderInfoTitle}>Purchase order ID: {new Date().getTime()}</Text>
            <Text style={styles.orderInfoDealer}>Dealer Name: XXXX</Text>
          </View>

          <View style={styles.orderItems}>
            {orderItems.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemTotal}>₹{item.total.toLocaleString()}</Text>
                </View>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemId}>{item.id}</Text>
                    <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}/Unit</Text>
                  </View>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemGst}>GST: 5%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>₹{calculateSubtotal().toLocaleString()}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>GST (5%)</Text>
              <Text style={styles.totalValue}>₹{calculateGST().toLocaleString()}</Text>
            </View>
            <View style={[styles.totalRow, styles.finalTotal]}>
              <Text style={styles.grandTotalLabel}>Total Amount</Text>
              <Text style={styles.grandTotalValue}>₹{calculateTotal().toLocaleString()}</Text>
            </View>
          </View>
          
          <View style={styles.spacer} />
        </ScrollView>

        <View style={styles.stickyFooter}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => setShowApprovalModal(true)}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ApprovalModal />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
  },
  orderInfo: {
    marginBottom: 24,
  },
  orderInfoTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  orderInfoDealer: {
    fontSize: 16,
    color: '#333',
  },
  orderItems: {
    marginBottom: 24,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    flexDirection: 'column',
    gap: 4,
  },
  itemUnit: {
    fontSize: 14,
    color: '#666',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemId: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemGst: {
    fontSize: 14,
    color: '#666',
  },
  totalSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
    paddingTop: 16,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  grandTotalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  spacer: {
    height: 80,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  continueButton: {
    backgroundColor: '#8CC63F',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  modalItemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  modalItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemQty: {
    fontSize: 14,
    color: '#666',
  },
  modalItemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  requestButton: {
    backgroundColor: '#8CC63F',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  requestButtonSent: {
    backgroundColor: '#4CAF50',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviseButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  reviseButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});