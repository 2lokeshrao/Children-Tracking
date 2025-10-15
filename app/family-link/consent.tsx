import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/Colors';

export default function ConsentScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!accepted) return;
    router.push('/family-link/link');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>⚠️ Important Information</Text>
        <Text style={styles.subtitle}>Please read carefully before continuing</Text>
      </View>

      <View style={styles.consentBox}>
        <Text style={styles.consentTitle}>What Will Be Monitored:</Text>
        
        <View style={styles.consentItem}>
          <Text style={styles.consentIcon}>📍</Text>
          <View style={styles.consentText}>
            <Text style={styles.consentLabel}>Location Data</Text>
            <Text style={styles.consentDesc}>Your current location and 24-hour history will be visible to your parents</Text>
          </View>
        </View>

        <View style={styles.consentItem}>
          <Text style={styles.consentIcon}>📱</Text>
          <View style={styles.consentText}>
            <Text style={styles.consentLabel}>App Usage</Text>
            <Text style={styles.consentDesc}>Time spent on apps and device usage patterns will be tracked</Text>
          </View>
        </View>

        <View style={styles.consentItem}>
          <Text style={styles.consentIcon}>⏰</Text>
          <View style={styles.consentText}>
            <Text style={styles.consentLabel}>Screen Time Limits</Text>
            <Text style={styles.consentDesc}>Parents can set daily limits and block times for device usage</Text>
          </View>
        </View>

        <View style={styles.consentItem}>
          <Text style={styles.consentIcon}>🔔</Text>
          <View style={styles.consentText}>
            <Text style={styles.consentLabel}>Geofence Alerts</Text>
            <Text style={styles.consentDesc}>Parents will be notified when you enter or leave designated areas</Text>
          </View>
        </View>
      </View>

      <View style={styles.purposeBox}>
        <Text style={styles.purposeTitle}>Why This Monitoring?</Text>
        <Text style={styles.purposeText}>
          This monitoring is designed to keep you safe, help establish healthy device habits, 
          and provide emergency assistance when needed. Your parents care about your wellbeing.
        </Text>
      </View>

      <View style={styles.rightsBox}>
        <Text style={styles.rightsTitle}>Your Rights:</Text>
        <Text style={styles.rightsText}>• You can view what data is being collected at any time</Text>
        <Text style={styles.rightsText}>• This app is always visible and cannot be hidden</Text>
        <Text style={styles.rightsText}>• You can discuss concerns with your parents</Text>
      </View>

      <TouchableOpacity style={styles.checkbox} onPress={() => setAccepted(!accepted)} activeOpacity={0.7}>
        <View style={[styles.checkboxBox, accepted && styles.checkboxChecked]}>
          {accepted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>I understand and accept these terms</Text>
      </TouchableOpacity>

      <CustomButton title="Continue to Linking" onPress={handleContinue} variant="success" disabled={!accepted} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.familyLink.background },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.familyLink.warning },
  subtitle: { fontSize: 14, color: COLORS.familyLink.textSecondary, marginTop: 4 },
  consentBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 16 },
  consentTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.familyLink.text, marginBottom: 16 },
  consentItem: { flexDirection: 'row', marginBottom: 16 },
  consentIcon: { fontSize: 24, marginRight: 12 },
  consentText: { flex: 1 },
  consentLabel: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.text },
  consentDesc: { fontSize: 13, color: COLORS.familyLink.textSecondary, marginTop: 4, lineHeight: 18 },
  purposeBox: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12, marginBottom: 16 },
  purposeTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.warning, marginBottom: 8 },
  purposeText: { fontSize: 14, color: COLORS.familyLink.text, lineHeight: 20 },
  rightsBox: { backgroundColor: '#D1FAE5', padding: 16, borderRadius: 12, marginBottom: 24 },
  rightsTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.primary, marginBottom: 8 },
  rightsText: { fontSize: 14, color: COLORS.familyLink.text, marginBottom: 4 },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkboxBox: { width: 24, height: 24, borderWidth: 2, borderColor: COLORS.familyLink.primary, borderRadius: 6, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: COLORS.familyLink.primary },
  checkmark: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { flex: 1, fontSize: 14, color: COLORS.familyLink.text },
});
