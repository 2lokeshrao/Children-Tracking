import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ScreenTimeService from '../services/ScreenTimeService';
import { BlockTime, AppRestriction } from '../types';
import { COLORS } from '../constants/Colors';

export default function ScreenTimeScreen() {
  const router = useRouter();
  const { deviceId } = useLocalSearchParams();
  const [dailyLimit, setDailyLimit] = useState('120');
  const [blockTimes, setBlockTimes] = useState<BlockTime[]>([]);
  const [restrictions, setRestrictions] = useState<AppRestriction[]>([]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const limits = ScreenTimeService.getScreenTimeLimit(deviceId as string);
    setDailyLimit(limits.dailyLimit.toString());
    setBlockTimes(limits.blockTimes);
    setRestrictions(limits.appRestrictions);
  };

  const handleSaveDailyLimit = async () => {
    const minutes = parseInt(dailyLimit);
    if (isNaN(minutes) || minutes < 0) {
      Alert.alert('Error', 'Please enter a valid number');
      return;
    }
    
    await ScreenTimeService.setDailyLimit(deviceId as string, minutes);
    Alert.alert('Success', 'Daily limit updated');
  };

  const handleAddBlockTime = async () => {
    const newBlock = await ScreenTimeService.addBlockTime(deviceId as string, {
      name: 'Bedtime',
      startTime: '22:00',
      endTime: '07:00',
      days: [0, 1, 2, 3, 4, 5, 6],
    });
    setBlockTimes([...blockTimes, newBlock]);
    Alert.alert('Success', 'Block time added');
  };

  const toggleAppBlock = async (packageName: string, appName: string, blocked: boolean) => {
    await ScreenTimeService.setAppRestriction(deviceId as string, {
      packageName,
      appName,
      blocked: !blocked,
    });
    loadSettings();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Screen Time Management</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Limit</Text>
        <CustomInput label="Minutes per day" value={dailyLimit} onChangeText={setDailyLimit} keyboardType="number-pad" />
        <CustomButton title="Save Daily Limit" onPress={handleSaveDailyLimit} variant="primary" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Block Times ({blockTimes.length})</Text>
        {blockTimes.map(block => (
          <View key={block.id} style={styles.blockCard}>
            <Text style={styles.blockName}>{block.name}</Text>
            <Text style={styles.blockTime}>{block.startTime} - {block.endTime}</Text>
          </View>
        ))}
        <CustomButton title="+ Add Block Time" onPress={handleAddBlockTime} variant="secondary" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Restrictions</Text>
        {['Instagram', 'TikTok', 'YouTube', 'Games'].map(app => {
          const restriction = restrictions.find(r => r.appName === app);
          return (
            <View key={app} style={styles.appRow}>
              <Text style={styles.appName}>{app}</Text>
              <Switch value={restriction?.blocked || false} onValueChange={(val) => toggleAppBlock(`com.${app.toLowerCase()}`, app, restriction?.blocked || false)} />
            </View>
          );
        })}
      </View>

      <CustomButton title="Back to Dashboard" onPress={() => router.back()} variant="primary" style={{ marginBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background, padding: 20 },
  header: { marginTop: 40, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.guardian.primary },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 12 },
  blockCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 8 },
  blockName: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text },
  blockTime: { fontSize: 14, color: COLORS.guardian.textSecondary, marginTop: 4 },
  appRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 8 },
  appName: { fontSize: 16, color: COLORS.guardian.text },
});
