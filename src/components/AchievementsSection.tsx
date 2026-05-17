import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../lib/theme';
import { achievements } from '../lib/data';

export default function AchievementsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Global Impact</Text>
      <Text style={styles.description}>Success stories behind every number.</Text>
      <View style={styles.grid}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
  },
  card: {
    width: '40%',
    alignItems: 'center',
  },
  value: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
