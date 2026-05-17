import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../lib/theme';

const logos = [
  require('../assets/1.png'),
  require('../assets/2.png'),
  require('../assets/3.png'),
  require('../assets/4.png'),
  require('../assets/5.png'),
  require('../assets/6.png'),
];

export default function LogosSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRUSTED BY INDUSTRY LEADERS</Text>
      <View style={styles.grid}>
        {logos.map((logo, index) => (
          <Image key={index} source={logo} style={styles.logo} contentFit="contain" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    tintColor: Colors.white,
    opacity: 0.8,
  },
});
