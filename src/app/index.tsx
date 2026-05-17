import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LogosSection from '../components/LogosSection';
import CategoriesSection from '../components/CategoriesSection';
import AchievementsSection from '../components/AchievementsSection';
import CoursesSection from '../components/CoursesSection';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import { Colors } from '../lib/theme';

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <HeroSection />
      <LogosSection />
      <CategoriesSection />
      <AchievementsSection />
      <CoursesSection />
      <TeamSection />
      <TestimonialsSection />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
