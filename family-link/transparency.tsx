import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/Colors';

export default function TransparencyScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's Being Monitored</Text>
        <Text style={styles.subtitle}>Full transparency about data collection</Text>
      </View>

      <DataSection 
        icon="📍"
        title="Location Data"
        items={[
          'Current GPS location (updated every 5 minutes)',
          'Location history for past 24 hours',
          'Entry/exit from designated safe zones',
        ]}
        purpose="To ensure your safety and help in emergencies"
      />

      <DataSection 
        icon="📱"
        title="App Usage"
        items={[
          'Time spent on each application',
          'Daily total screen time',
          'App categories (social, games, education)',
        ]}
        purpose="To help establish healthy device habits"
      />

      <DataSection 
        icon="⏰"
        title="Screen Time Controls"
        items={[
          'Daily usage limits set by parents',
          'Scheduled block times (bedtime, study)',
          'Per-app time restrictions',
        ]}
        purpose="To promote balance and wellbeing"
      />

      <DataSection 
        icon="🚨"
        title="Emergency Alerts"
        items={[
          'SOS button presses with location',
          'Alert delivery status to parents',
          'Emergency contact information',
        ]}
        purpose="To provide immediate help when needed"
      />

      <View style={styles.securityBox}>
        <Text style={styles.securityTitle}>🔒 Your Data Security</Text>
        <Text style={styles.securityText}>• All data is encrypted end-to-end</Text>
        <Text style={styles.securityText}>• Only your linked parents can access your data</Text>
        <Text style={styles.securityText}>• Data is never sold or shared with third parties</Text>
        <Text style={styles.securityText}>• You can request data deletion at any time</Text>
      </View>

      <View style={styles.rightsBox}>
        <Text style={styles.rightsTitle}>Your Rights</Text>
        <Text style={styles.rightsText}>
          You have the right to discuss any concerns about monitoring with your parents. 
          This app is designed to keep you safe, not to invade your privacy. If you feel 
          uncomfortable with any aspect of the monitoring, please talk to your parents.
        </Text>
      </View>

      <CustomButton title="Back to Home" onPress={() => router.back()} variant="primary" style={{ marginBottom: 40 }} />
    </ScrollView>
  );
}

const DataSection = ({ icon, title, items, purpose }: any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>
      <Text style={styles.itemsTitle}>What's collected:</Text>
      {items.map((item: string, index: number) => (
        <Text key={index} style={styles.item}>• {item}</Text>
      ))}
      <Text style={styles.purpose}>Purpose: {purpose}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.familyLink.background, padding: 20 },
  header: { marginTop: 40, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.familyLink.primary },
  subtitle: { fontSize: 14, color: COLORS.familyLink.textSecondary, marginTop: 4 },
  section: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionIcon: { fontSize: 24, marginRight: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.familyLink.text },
  sectionContent: { paddingLeft: 36 },
  itemsTitle: { fontSize: 14, fontWeight: '600', color: COLORS.familyLink.text, marginBottom: 8 },
  item: { fontSize: 13, color: COLORS.familyLink.textSecondary, marginBottom: 4 },
  purpose: { fontSize: 13, color: COLORS.familyLink.primary, marginTop: 8, fontStyle: 'italic' },
  securityBox: { backgroundColor: '#D1FAE5', padding: 16, borderRadius: 12, marginBottom: 16 },
  securityTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.primary, marginBottom: 8 },
  securityText: { fontSize: 13, color: COLORS.familyLink.text, marginBottom: 4 },
  rightsBox: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12, marginBottom: 24 },
  rightsTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.warning, marginBottom: 8 },
  rightsText: { fontSize: 13, color: COLORS.familyLink.text, lineHeight: 20 },
});
