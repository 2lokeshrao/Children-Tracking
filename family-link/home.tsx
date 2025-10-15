import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import SOSService from '../services/SOSService';
import LocationService from '../services/LocationService';
import { COLORS } from '../constants/Colors';

export default function FamilyLinkHome() {
  const router = useRouter();
  const [sosPressed, setSosPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSOSPress = () => {
    setSosPressed(true);
    let count = 3;
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(timer);
        sendSOS();
      }
    }, 1000);
  };

  const sendSOS = async () => {
    try {
      const location = await LocationService.getCurrentLocation('current-device');
      await SOSService.sendSOSAlert('current-device', location);
      
      Alert.alert(
        '🚨 SOS Sent!',
        'Your parents have been notified and can see your location',
        [{ text: 'OK', onPress: () => setSosPressed(false) }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send SOS alert');
      setSosPressed(false);
    }
  };

  const cancelSOS = () => {
    setSosPressed(false);
    setCountdown(3);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Link</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Connected to Parent</Text>
        </View>
      </View>

      <View style={styles.sosSection}>
        <Text style={styles.sosTitle}>Emergency SOS</Text>
        <Text style={styles.sosSubtitle}>Press and hold if you need immediate help</Text>
        
        {!sosPressed ? (
          <TouchableOpacity 
            style={styles.sosButton} 
            onPress={handleSOSPress}
            activeOpacity={0.8}
          >
            <Text style={styles.sosButtonText}>🚨</Text>
            <Text style={styles.sosButtonLabel}>EMERGENCY</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.sosCountdown}>
            <Text style={styles.countdownNumber}>{countdown}</Text>
            <Text style={styles.countdownText}>Sending SOS Alert...</Text>
            <CustomButton title="Cancel" onPress={cancelSOS} variant="secondary" />
          </View>
        )}
      </View>

      <View style={styles.infoCards}>
        <InfoCard icon="📍" title="Location Sharing" description="Your location is visible to parents" status="Active" />
        <InfoCard icon="⏰" title="Screen Time" description="Daily limit: 2 hours" status="Active" />
        <InfoCard icon="🛡️" title="Safe Zones" description="2 zones configured" status="Active" />
      </View>

      <View style={styles.actions}>
        <CustomButton title="View What's Monitored" onPress={() => router.push('/family-link/transparency')} variant="secondary" />
        <CustomButton title="App Settings" onPress={() => Alert.alert('Settings', 'Settings screen')} variant="secondary" style={{ marginTop: 12 }} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>This app is always visible and transparent</Text>
      </View>
    </ScrollView>
  );
}

const InfoCard = ({ icon, title, description, status }: any) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View style={styles.infoContent}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDesc}>{description}</Text>
    </View>
    <View style={styles.statusChip}>
      <Text style={styles.statusChipText}>{status}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.familyLink.background },
  content: { padding: 20 },
  header: { marginTop: 40, marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.familyLink.primary },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.familyLink.success, marginRight: 8 },
  statusText: { fontSize: 14, color: COLORS.familyLink.textSecondary },
  sosSection: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, marginBottom: 24, alignItems: 'center' },
  sosTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.familyLink.text },
  sosSubtitle: { fontSize: 14, color: COLORS.familyLink.textSecondary, marginTop: 4, marginBottom: 24 },
  sosButton: { width: 160, height: 160, borderRadius: 80, backgroundColor: COLORS.familyLink.sos, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  sosButtonText: { fontSize: 48 },
  sosButtonLabel: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginTop: 8 },
  sosCountdown: { alignItems: 'center' },
  countdownNumber: { fontSize: 72, fontWeight: 'bold', color: COLORS.familyLink.sos },
  countdownText: { fontSize: 16, color: COLORS.familyLink.text, marginBottom: 16 },
  infoCards: { marginBottom: 24 },
  infoCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  infoIcon: { fontSize: 32, marginRight: 12 },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.text },
  infoDesc: { fontSize: 13, color: COLORS.familyLink.textSecondary, marginTop: 2 },
  statusChip: { backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusChipText: { fontSize: 12, fontWeight: '600', color: COLORS.familyLink.primary },
  actions: { marginBottom: 24 },
  footer: { alignItems: 'center', paddingVertical: 20 },
  footerText: { fontSize: 12, color: COLORS.familyLink.textSecondary },
});
