import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { IMAGES } from '../constants/Images';
import { COLORS } from '../constants/Colors';

export default function FamilyLinkWelcome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Link</Text>
        <Text style={styles.subtitle}>Stay Safe, Stay Connected</Text>
      </View>

      <Image source={{ uri: IMAGES.familyLinkHero }} style={styles.heroImage} />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🛡️ Transparent Safety</Text>
        <Text style={styles.infoText}>
          This app helps keep you safe by allowing your parents to:
        </Text>
        <Text style={styles.bullet}>• Know your location in emergencies</Text>
        <Text style={styles.bullet}>• Help manage healthy screen time</Text>
        <Text style={styles.bullet}>• Receive your SOS alerts instantly</Text>
      </View>

      <View style={styles.features}>
        <FeatureCard icon="🚨" title="Emergency SOS" description="Quick access to alert your parents" />
        <FeatureCard icon="👁️" title="Full Transparency" description="You'll always know what's monitored" />
        <FeatureCard icon="🔒" title="Your Privacy" description="Data is encrypted and secure" />
      </View>

      <View style={styles.buttons}>
        <CustomButton title="Link to Parent Account" onPress={() => router.push('/family-link/consent')} variant="success" />
      </View>

      <Text style={styles.footer}>This app is visible and cannot operate secretly</Text>
    </ScrollView>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <View style={styles.featureCard}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDesc}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.familyLink.background },
  content: { padding: 20 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.familyLink.primary },
  subtitle: { fontSize: 16, color: COLORS.familyLink.textSecondary, marginTop: 8 },
  heroImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 24 },
  infoBox: { backgroundColor: '#D1FAE5', padding: 20, borderRadius: 12, marginBottom: 24 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.familyLink.primary, marginBottom: 8 },
  infoText: { fontSize: 14, color: COLORS.familyLink.text, marginBottom: 8 },
  bullet: { fontSize: 14, color: COLORS.familyLink.text, marginLeft: 8, marginBottom: 4 },
  features: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  featureCard: { flex: 1, minWidth: '45%', backgroundColor: '#FFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  featureIcon: { fontSize: 32, marginBottom: 8 },
  featureTitle: { fontSize: 14, fontWeight: '600', color: COLORS.familyLink.text, textAlign: 'center' },
  featureDesc: { fontSize: 12, color: COLORS.familyLink.textSecondary, textAlign: 'center', marginTop: 4 },
  buttons: { marginTop: 8 },
  footer: { textAlign: 'center', color: COLORS.familyLink.textSecondary, marginTop: 24, fontSize: 12 },
});
