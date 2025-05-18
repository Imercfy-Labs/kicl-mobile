import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, LayoutDashboard, Users, ClipboardList, Package, Chrome as Home, IndianRupee } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SideMenuProps {
  activePath: string;
  userInfo: {
    name: string;
    employeeId: string;
  };
  onClose: () => void;
}

export default function SideMenu({ activePath, userInfo, onClose }: SideMenuProps) {
  const router = useRouter();

  const MenuItem = ({ 
    title, 
    icon: Icon, 
    path, 
    isActive = false, 
    isSubItem = false,
    onPress 
  }) => {
    const content = (
      <>
        {!isSubItem && Icon && <Icon size={24} color={isActive ? "#000" : "#666"} />}
        <Text style={[
          styles.menuText,
          isActive && !isSubItem && styles.menuTextActive,
          isSubItem && styles.subMenuText,
          isActive && isSubItem && styles.subMenuTextActive,
          !isSubItem && Icon && styles.menuTextWithIcon
        ]}>
          {title}
        </Text>
        {isActive && isSubItem && <View style={styles.verticalLine} />}
      </>
    );

    return (
      <TouchableOpacity 
        style={[
          styles.menuItem,
          isSubItem && styles.subMenuItem,
        ]} 
        onPress={onPress}
      >
        {isActive && !isSubItem ? (
          <LinearGradient
            colors={['#3DD39E', '#B6E388']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.menuItemContent, styles.activeMenuItem]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View style={styles.menuItemContent}>
            {content}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>TK TECH KOTHARI</Text>
        <Text style={styles.subText}>A UNIT OF KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>{userInfo.name[0]}</Text>
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.employeeId}>Employee ID: {userInfo.employeeId}</Text>
      </View>

      <ScrollView 
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuContent}
      >
        <MenuItem 
          title="Dashboard" 
          icon={LayoutDashboard}
          path="/dashboard"
          isActive={activePath === '/dashboard'}
          onPress={() => {
            router.push('/dashboard');
            onClose();
          }}
        />
        
        <MenuItem 
          title="Dealers" 
          icon={Users}
          path="/dealers"
          isActive={activePath === '/dealers'}
          onPress={() => {
            router.push('/dealers');
            onClose();
          }}
        />

        <MenuItem 
          title="Orders" 
          icon={ClipboardList}
          path="/orders"
          isActive={activePath.includes('/orders')}
          onPress={() => {
            router.push('/orders');
            onClose();
          }}
        />
        
        {activePath.includes('/orders') && (
          <View style={styles.subMenuContainer}>
            <MenuItem 
              title="Place Order" 
              isSubItem 
              isActive={activePath === '/orders/place'} 
              onPress={() => {
                router.push('/orders/place');
                onClose();
              }} 
            />
            <MenuItem 
              title="My Orders" 
              isSubItem 
              isActive={activePath === '/orders/my-orders'} 
              onPress={() => {
                router.push('/orders/my-orders');
                onClose();
              }} 
            />
            <MenuItem 
              title="Track Order" 
              isSubItem 
              isActive={activePath === '/orders/track'} 
              onPress={() => {
                router.push('/orders/track');
                onClose();
              }} 
            />
          </View>
        )}

        <MenuItem 
          title="Inventory" 
          icon={Package}
          path="/inventory"
          isActive={activePath === '/inventory'}
          onPress={() => {
            router.push('/inventory');
            onClose();
          }}
        />

        <MenuItem 
          title="Field Development" 
          icon={Home}
          path="/field-development"
          isActive={activePath === '/field-development'}
          onPress={() => {
            router.push('/field-development');
            onClose();
          }}
        />

        <MenuItem 
          title="Settlement" 
          icon={IndianRupee}
          path="/settlement"
          isActive={activePath === '/settlement'}
          onPress={() => {
            router.push('/settlement');
            onClose();
          }}
        />
      </ScrollView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          router.replace('/');
          onClose();
        }}
      >
        <LogOut size={24} color="#000" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3192',
    marginBottom: 4,
  },
  subText: {
    fontSize: 8,
    color: '#2E3192',
    textAlign: 'center',
  },
  userInfo: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E3192',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInitial: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    paddingTop: 16,
  },
  menuItem: {
    width: '100%',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  activeMenuItem: {
    borderRadius: 0,
  },
  subMenuContainer: {
    backgroundColor: 'rgba(140, 198, 63, 0.1)',
  },
  subMenuItem: {
    paddingLeft: 56,
    position: 'relative',
  },
  menuText: {
    fontSize: 16,
    color: '#666',
  },
  menuTextWithIcon: {
    marginLeft: 12,
  },
  menuTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  subMenuText: {
    fontSize: 14,
    color: '#666',
  },
  subMenuTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  verticalLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#8CC63F',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#D1E7DD',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default SideMenu