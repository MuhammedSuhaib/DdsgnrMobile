import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../lib/theme';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">Ready to start?</Text>
      <TextInput 
        placeholder="Email address" 
        placeholderTextColor={Colors.gray}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email input for newsletter subscription"
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel="Subscribe">
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
      <Text style={styles.copyright}>© 2026 Ddsgnr.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    borderRadius: 30,
    color: Colors.white,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: Colors.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  copyright: {
    color: Colors.gray,
    textAlign: 'center',
    fontSize: 14,
  },
});
