import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChildDevice } from '../types';
import { COLORS } from '../constants/Colors';
import { IMAGES } from '../constants/Images';

interface DeviceCardProps {
  device: ChildDevice;
  onPress: () => void;
}

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  const avatar = device.avatar || IMAGES.childAvatars[Math.floor(Math.random() * IMAGES.childAvatars.length)];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      
      <View style={styles.info}>
        <Text style={styles.name}>{device.childName}</Text>
        <View style={styles.status}>
          <View style={[styles.statusDot, device.isOnline ? styles.online : styles.offline]} />
          <Text style={styles.statusText}>{device.isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>

      {device.batteryLevel && (
        <View style={styles.battery}>
          <Text style={styles.batteryText}>{device.batteryLevel}%</Text>
          <View style={styles.batteryBar}>
            <View style={[styles.batteryFill, { width: `${device.batteryLevel}%` }]} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text },
  status: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  online: { backgroundColor: COLORS.guardian.success },
  offline: { backgroundColor: '#9CA3AF' },
  statusText: { fontSize: 12, color: COLORS.guardian.textSecondary },
  battery: { alignItems: 'flex-end' },
  batteryText: { fontSize: 12, fontWeight: '600', color: COLORS.guardian.text },
  batteryBar: { width: 40, height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginTop: 4, overflow: 'hidden' },
  batteryFill: { height: '100%', backgroundColor: COLORS.guardian.success },
});
