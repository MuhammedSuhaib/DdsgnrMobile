import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Colors } from '../lib/theme';
import { categories } from '../lib/data';

const { width } = Dimensions.get('window');

export default function CategoriesSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Top Categories</Text>
      <Text style={styles.description}>Dive into specialized paths curated by industry veterans.</Text>
      
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.courses}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Colors.background,
  },
  header: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  description: {
    color: Colors.gray,
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    width: width * 0.7,
    height: 120,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.gray,
  },
});
