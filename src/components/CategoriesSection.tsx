import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../lib/theme';
import { categories } from '../lib/data';

export default function CategoriesSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Top Categories</Text>
      <Text style={styles.description}>Dive into specialized paths curated by industry veterans.</Text>
      
      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.7} accessibilityRole="button">
            <Text style={styles.cardTitle}>{cat.title}</Text>
            <Text style={styles.cardSubtitle}>{cat.courses}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} accessibilityRole="button">
        <Text style={styles.buttonText}>View All Categories</Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 42,
  },
  description: {
    color: Colors.gray,
    fontSize: 18,
    marginBottom: 40,
    lineHeight: 26,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: Colors.grayLight,
    padding: 24,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 40,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
