import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import GeofenceService from '../services/GeofenceService';
import AuthService from '../services/AuthService';
import { Geofence } from '../types';
import { COLORS } from '../constants/Colors';

export default function GeofenceScreen() {
  const router = useRouter();
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<'safe' | 'unsafe'>('safe');
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    loadGeofences();
  }, []);

  const loadGeofences = () => {
    const fences = GeofenceService.getGeofences(user?.id || '');
    setGeofences(fences);
  };

  const handleAddGeofence = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    await GeofenceService.createGeofence(user?.id || '', {
      name,
      type,
      latitude: 37.7749,
      longitude: -122.4194,
      radius: 500,
      alertOnEntry: type === 'unsafe',
      alertOnExit: type === 'safe',
    });

    setName('');
    loadGeofences();
    Alert.alert('Success', 'Geofence created');
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Geofence', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          await GeofenceService.deleteGeofence(user?.id || '', id);
          loadGeofences();
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Geofence Management</Text>
        <Text style={styles.subtitle}>Create safe and unsafe zones</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Geofence</Text>
        <CustomInput label="Zone Name (e.g., Home, School)" value={name} onChangeText={setName} />
        
        <View style={styles.typeSelector}>
          <Text style={styles.label}>Zone Type:</Text>
          <View style={styles.typeButtons}>
            <CustomButton title="Safe Zone" onPress={() => setType('safe')} variant={type === 'safe' ? 'success' : 'secondary'} style={styles.typeBtn} />
            <CustomButton title="Unsafe Zone" onPress={() => setType('unsafe')} variant={type === 'unsafe' ? 'danger' : 'secondary'} style={styles.typeBtn} />
          </View>
        </View>

        <CustomButton title="Create Geofence" onPress={handleAddGeofence} variant="primary" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Geofences ({geofences.length})</Text>
        {geofences.map(fence => (
          <View key={fence.id} style={styles.fenceCard}>
            <View style={styles.fenceHeader}>
              <Text style={styles.fenceName}>{fence.name}</Text>
              <View style={[styles.badge, fence.type === 'safe' ? styles.safeBadge : styles.unsafeBadge]}>
                <Text style={styles.badgeText}>{fence.type === 'safe' ? '✓ Safe' : '⚠ Unsafe'}</Text>
              </View>
            </View>
            <Text style={styles.fenceDetail}>Radius: {fence.radius}m</Text>
            <Text style={styles.fenceDetail}>Alert on {fence.alertOnEntry ? 'Entry' : 'Exit'}</Text>
            <CustomButton title="Delete" onPress={() => handleDelete(fence.id)} variant="danger" style={{ marginTop: 12 }} />
          </View>
        ))}
      </View>

      <CustomButton title="Back to Dashboard" onPress={() => router.back()} variant="primary" style={{ marginBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background, padding: 20 },
  header: { marginTop: 40, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 14, color: COLORS.guardian.textSecondary, marginTop: 4 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 8 },
  typeSelector: { marginBottom: 16 },
  typeButtons: { flexDirection: 'row', gap: 12 },
  typeBtn: { flex: 1 },
  fenceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  fenceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  fenceName: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  safeBadge: { backgroundColor: '#D1FAE5' },
  unsafeBadge: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  fenceDetail: { fontSize: 14, color: COLORS.guardian.textSecondary, marginBottom: 4 },
});
