import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../lib/theme';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
    }

    setIsLoading(true);
    try {
      await signUp(email, fullName);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Signup Failed', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>Ddsgnr</Text>
        <Text style={styles.title}>Create Account</Text>
        <TextInput 
            placeholder="Full Name" 
            value={fullName} 
            onChangeText={setFullName} 
            style={styles.input} 
            placeholderTextColor={Colors.gray} 
            autoCapitalize="words"
        />
        <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            style={styles.input} 
            placeholderTextColor={Colors.gray} 
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput 
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor={Colors.gray} 
        />
        <TextInput 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor={Colors.gray} 
        />
        <TouchableOpacity style={[styles.button, isLoading && { opacity: 0.6 }]} onPress={handleSignup} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={Colors.dark} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  formContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: Colors.primary, marginBottom: 8, textAlign: 'center' },
  title: { fontSize: 24, color: Colors.white, marginBottom: 32, fontWeight: 'bold', textAlign: 'center' },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: Colors.border, padding: 16, marginBottom: 16, borderRadius: 8, color: Colors.white },
  button: { backgroundColor: Colors.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: 'bold', color: Colors.dark },
  linkText: { color: Colors.gray, marginTop: 16, textAlign: 'center' },
  linkBold: { color: Colors.white, fontWeight: 'bold' }
});
