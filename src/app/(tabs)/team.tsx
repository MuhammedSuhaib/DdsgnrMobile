import { ScrollView, StyleSheet } from 'react-native';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { Colors } from '../../lib/theme';

export default function TeamTab() {
  return (
    <ScrollView style={styles.container}>
      <TeamSection />
      <TestimonialsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
