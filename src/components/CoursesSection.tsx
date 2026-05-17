import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';
import { courses } from '../lib/data';

export default function CoursesSection() {
  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.header} accessibilityRole="header">Professional Courses</Text>
      <Text style={styles.description}>Designed for modern careers.</Text>
      
      <View style={styles.grid}>
        {courses.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image 
              source={item.image}
              style={styles.image} 
              contentFit="cover"
              transition={200}
            />
            <View style={styles.content}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity style={styles.button} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={`Enroll in ${item.title}`}>
                <Text style={styles.buttonText}>Enroll Now</Text>
              </TouchableOpacity>
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
    gap: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    height: 240,
    width: '100%',
  },
  content: {
    padding: 24,
  },
  category: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
