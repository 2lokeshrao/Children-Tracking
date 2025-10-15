import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import DeviceCard from '../components/DeviceCard';
import CustomButton from '../components/CustomButton';
import LinkingService from '../services/LinkingService';
import SOSService from '../services/SOSService';
import AuthService from '../services/AuthService';
import { ChildDevice, SOSAlert } from '../types';
import { COLORS } from '../constants/Colors';

export default function DashboardScreen() {
  const router = useRouter();
  const [devices, setDevices] = useState<ChildDevice[]>([]);
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    loadDevices();
    loadAlerts();
    
    const unsubscribe = SOSService.subscribeToAlerts(user?.id || '', (alert) => {
      Alert.alert('🚨 EMERGENCY ALERT', `${getDeviceName(alert.childDeviceId)} needs help!`, [
        { text: 'View Location', onPress: () => handleSOSAlert(alert) }
      ]);
      loadAlerts();
    });

    return unsubscribe;
  }, []);

  const loadDevices = () => {
    const linked = LinkingService.getLinkedDevices(user?.id || '');
    setDevices(linked);
  };

  const loadAlerts = () => {
    const allAlerts = SOSService.getAlerts(user?.id || '');
    setAlerts(allAlerts.filter(a => !a.acknowledged).slice(0, 3));
  };

  const getDeviceName = (deviceId: string) => {
    return devices.find(d => d.id === deviceId)?.childName || 'Child';
  };

  const handleSOSAlert = (alert: SOSAlert) => {
    SOSService.acknowledgeAlert(alert.id);
    loadAlerts();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {user?.name}</Text>
      </View>

      {alerts.length > 0 && (
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>🚨 Active Alerts</Text>
          {alerts.map(alert => (
            <TouchableOpacity key={alert.id} style={styles.alertCard} onPress={() => handleSOSAlert(alert)}>
              <Text style={styles.alertText}>Emergency from {getDeviceName(alert.childDeviceId)}</Text>
              <Text style={styles.alertTime}>{alert.timestamp.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linked Devices ({devices.length})</Text>
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} onPress={() => router.push(`/screen-time?deviceId=${device.id}`)} />
        ))}
      </View>

      <View style={styles.actions}>
        <CustomButton title="+ Link New Device" onPress={() => router.push('/link-device')} variant="primary" />
        <CustomButton title="Manage Geofences" onPress={() => router.push('/geofence')} variant="secondary" style={{ marginTop: 12 }} />
        <CustomButton title="View App Usage" onPress={() => router.push('/app-usage')} variant="secondary" style={{ marginTop: 12 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background, padding: 20 },
  header: { marginTop: 40, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 16, color: COLORS.guardian.textSecondary, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 12 },
  alertsSection: { marginBottom: 24, padding: 16, backgroundColor: '#FEE2E2', borderRadius: 12 },
  alertCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginTop: 8 },
  alertText: { fontSize: 14, fontWeight: '600', color: COLORS.guardian.danger },
  alertTime: { fontSize: 12, color: COLORS.guardian.textSecondary, marginTop: 4 },
  actions: { marginBottom: 40 },
});
