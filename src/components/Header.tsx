import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../lib/theme';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>Ddsgnr</Text>
        <View style={styles.rightActions}>
          {user && (
            <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} accessibilityLabel="Menu">
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: Colors.gray,
    fontSize: 14,
  },
  menuButton: {
    padding: 8,
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: Colors.white,
    marginVertical: 2,
  },
});
