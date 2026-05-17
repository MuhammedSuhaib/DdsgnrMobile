import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';

export default function HeroSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle} accessibilityRole="header">NEXT GENERATION LEARNING</Text>
      <Text style={styles.title}>Master New Skills With Excellence</Text>
      <Text style={styles.description}>Unlock your potential with our expert-led courses.</Text>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/img.jpg')} 
          style={styles.image} 
          contentFit="cover"
          transition={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.background,
  },
  subtitle: {
    color: Colors.primary,
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 56,
  },
  description: {
    color: Colors.gray,
    fontSize: 18,
    marginBottom: 32,
    lineHeight: 26,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#1f2937', 
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
});
