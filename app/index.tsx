import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { IMAGES } from '../constants/Images';
import { COLORS } from '../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Guardian View</Text>
        <Text style={styles.subtitle}>Protect Your Family with Transparency</Text>
      </View>

      <Image source={{ uri: IMAGES.guardianHero }} style={styles.heroImage} />

      <View style={styles.features}>
        <FeatureItem icon="📍" title="Real-Time Location" description="Track your child's location with 24-hour history" />
        <FeatureItem icon="⏰" title="Screen Time Control" description="Set healthy device usage limits" />
        <FeatureItem icon="🚨" title="Emergency SOS" description="Instant alerts when your child needs help" />
        <FeatureItem icon="🛡️" title="Safe Zones" description="Get notified when entering/leaving areas" />
      </View>

      <View style={styles.buttons}>
        <CustomButton title="Login" onPress={() => router.push('/login')} variant="primary" />
        <CustomButton title="Create Account" onPress={() => router.push('/register')} variant="secondary" style={{ marginTop: 12 }} />
      </View>

      <Text style={styles.footer}>Ethical monitoring with full transparency and consent</Text>
    </ScrollView>
  );
}

const FeatureItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background },
  content: { padding: 20 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 16, color: COLORS.guardian.textSecondary, marginTop: 8 },
  heroImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 24 },
  features: { marginBottom: 24 },
  featureItem: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#FFF', padding: 16, borderRadius: 12 },
  featureIcon: { fontSize: 32, marginRight: 16 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text },
  featureDesc: { fontSize: 14, color: COLORS.guardian.textSecondary, marginTop: 4 },
  buttons: { marginTop: 8 },
  footer: { textAlign: 'center', color: COLORS.guardian.textSecondary, marginTop: 24, fontSize: 12 },
});
