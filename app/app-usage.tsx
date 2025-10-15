import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import ScreenTimeService from '../services/ScreenTimeService';
import { AppUsage } from '../types';
import { COLORS } from '../constants/Colors';

export default function AppUsageScreen() {
  const router = useRouter();
  const [usage, setUsage] = useState<AppUsage[]>([]);
  const [period, setPeriod] = useState<'day' | 'week'>('day');

  useEffect(() => {
    loadUsage();
  }, [period]);

  const loadUsage = async () => {
    const data = await ScreenTimeService.getAppUsage('device-1', period === 'day' ? 1 : 7);
    setUsage(data.sort((a, b) => b.timeSpent - a.timeSpent));
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTotalTime = () => {
    return usage.reduce((sum, app) => sum + app.timeSpent, 0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Usage Report</Text>
        <Text style={styles.subtitle}>Monitor screen time and app activity</Text>
      </View>

      <View style={styles.periodSelector}>
        <CustomButton title="Today" onPress={() => setPeriod('day')} variant={period === 'day' ? 'primary' : 'secondary'} style={styles.periodBtn} />
        <CustomButton title="This Week" onPress={() => setPeriod('week')} variant={period === 'week' ? 'primary' : 'secondary'} style={styles.periodBtn} />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Total Screen Time</Text>
        <Text style={styles.summaryValue}>{formatTime(getTotalTime())}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Breakdown</Text>
        {usage.map((app, index) => (
          <View key={app.packageName} style={styles.appCard}>
            <View style={styles.appRank}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{app.appName}</Text>
              <Text style={styles.appTime}>{formatTime(app.timeSpent)}</Text>
            </View>
            <View style={styles.appBar}>
              <View style={[styles.appBarFill, { width: `${(app.timeSpent / getTotalTime()) * 100}%` }]} />
            </View>
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
  periodSelector: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  periodBtn: { flex: 1 },
  summary: { backgroundColor: COLORS.guardian.primary, padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  summaryLabel: { fontSize: 14, color: '#FFF', opacity: 0.8 },
  summaryValue: { fontSize: 36, fontWeight: 'bold', color: '#FFF', marginTop: 8 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 12 },
  appCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 8 },
  appRank: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.guardian.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rankText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  appInfo: { flex: 1 },
  appName: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text },
  appTime: { fontSize: 14, color: COLORS.guardian.textSecondary, marginTop: 2 },
  appBar: { width: 60, height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden' },
  appBarFill: { height: '100%', backgroundColor: COLORS.guardian.secondary },
});
