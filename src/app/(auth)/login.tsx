import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../lib/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Assuming a name exists or using a default for login
      await signIn(email, "Student"); 
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>Ddsgnr</Text>
        <Text style={styles.title}>Welcome Back</Text>
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
        <TouchableOpacity style={[styles.button, isLoading && { opacity: 0.6 }]} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={Colors.dark} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
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
