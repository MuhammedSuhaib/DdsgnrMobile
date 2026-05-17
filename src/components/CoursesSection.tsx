import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';
import { courses } from '../lib/data';

export default function CoursesSection() {
  const [showAll, setShowAll] = useState(false);
  const displayCourses = showAll ? courses : courses.slice(0, 2);

  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.header} accessibilityRole="header">Professional Courses</Text>
      <Text style={styles.description}>Designed for modern careers.</Text>
      
      <FlatList
        data={displayCourses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={item.image}
              style={styles.image} 
              contentFit="cover"
              transition={200}
            />
            <View style={styles.content}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.7}
                onPress={() => Alert.alert('Success', `You are already enrolled in ${item.title}!`)}
              >
                <Text style={styles.buttonText}>Enroll Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        scrollEnabled={false}
      />

      <TouchableOpacity 
        style={styles.viewAllButton} 
        onPress={() => setShowAll(!showAll)}
      >
        <Text style={styles.viewAllText}>
          {showAll ? 'Show Less' : 'View All Courses'}
        </Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  category: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  viewAllButton: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
