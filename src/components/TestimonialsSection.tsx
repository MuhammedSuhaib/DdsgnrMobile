import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';
import { testimonials } from '../lib/data';

const avatars = [
  require('../assets/pfp3.png'),
  require('../assets/pfp1.png'),
  require('../assets/pfp6.png'),
];

export default function TestimonialsSection() {
  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.header} accessibilityRole="header">Student Success</Text>
      <Text style={styles.description}>Join thousands of satisfied learners.</Text>
      
      <View style={styles.grid}>
        {testimonials.map((t, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.stars} accessibilityLabel="5 stars rating">★★★★★</Text>
            <Text style={styles.content}>{t.content}</Text>
            <View style={styles.profile}>
              <Image 
                source={avatars[index % avatars.length]}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
              <View>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.role}>{t.role}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.background,
  },
  header: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 46,
  },
  description: {
    color: Colors.gray,
    fontSize: 18,
    marginBottom: 40,
    lineHeight: 26,
  },
  grid: {
    gap: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
  },
  stars: {
    fontSize: 20,
    marginBottom: 16,
  },
  content: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1f2937',
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  role: {
    color: Colors.gray,
    fontSize: 12,
  },
});
