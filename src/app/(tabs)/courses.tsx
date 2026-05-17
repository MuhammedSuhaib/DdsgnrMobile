import { ScrollView, StyleSheet } from 'react-native';
import CategoriesSection from '../../components/CategoriesSection';
import CoursesSection from '../../components/CoursesSection';
import { Colors } from '../../lib/theme';

export default function CoursesTab() {
  return (
    <ScrollView style={styles.container}>
      <CategoriesSection />
      <CoursesSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
