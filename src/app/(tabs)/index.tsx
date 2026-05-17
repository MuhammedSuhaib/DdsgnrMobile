import { ScrollView, StyleSheet } from 'react-native';
import HeroSection from '../../components/HeroSection';
import LogosSection from '../../components/LogosSection';
import AchievementsSection from '../../components/AchievementsSection';
import { Colors } from '../../lib/theme';

export default function HomeTab() {
  return (
    <ScrollView style={styles.container}>
      <HeroSection />
      <LogosSection />
      <AchievementsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
