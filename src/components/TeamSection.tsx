import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';
import { team } from '../lib/data';

const avatars = [
  require('../assets/pfp1.png'),
  require('../assets/pfp2.png'),
  require('../assets/pfp3.png'),
  require('../assets/pfp4.png'),
  require('../assets/pfp5.png'),
  require('../assets/pfp6.png'),
];

export default function TeamSection() {
  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.header} accessibilityRole="header">Meet Our Mentors</Text>
      <Text style={styles.description}>Learn from the experts.</Text>
      
      <View style={styles.grid}>
        {team.map((member, index) => (
          <View key={index} style={styles.card}>
            <Image 
              source={avatars[index % avatars.length]}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#050505',
  },
  header: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: Colors.gray,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  grid: {
    gap: 32,
  },
  card: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: '#1f2937',
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    color: Colors.gray,
    fontSize: 14,
    marginTop: 4,
  },
});
