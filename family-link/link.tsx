import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LinkingService from '../services/LinkingService';
import { COLORS } from '../constants/Colors';

export default function LinkScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLink = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }

    if (!childName) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      await LinkingService.linkDevice(code, childName, deviceId);
      
      Alert.alert(
        'Success!',
        'Your device has been linked to your parent\'s account',
        [{ text: 'OK', onPress: () => router.replace('/family-link/home') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to link device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Link to Parent</Text>
        <Text style={styles.subtitle}>Enter the code from your parent's device</Text>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>How to link:</Text>
        <Text style={styles.instruction}>1. Ask your parent to open Guardian View app</Text>
        <Text style={styles.instruction}>2. They should tap "Link New Device"</Text>
        <Text style={styles.instruction}>3. Enter the 6-digit code shown on their screen</Text>
      </View>

      <CustomInput label="Your Name" value={childName} onChangeText={setChildName} placeholder="Enter your name" />
      
      <CustomInput 
        label="6-Digit Linking Code" 
        value={code} 
        onChangeText={setCode} 
        keyboardType="number-pad" 
        maxLength={6}
        placeholder="000000"
      />

      <CustomButton title="Link Device" onPress={handleLink} loading={loading} variant="success" />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ⚠️ After linking, your parent will be able to see your location and app usage. 
          You can always view what's being monitored in the app settings.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.familyLink.background },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.familyLink.primary },
  subtitle: { fontSize: 14, color: COLORS.familyLink.textSecondary, marginTop: 4 },
  instructions: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 24 },
  instructionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.familyLink.text, marginBottom: 8 },
  instruction: { fontSize: 14, color: COLORS.familyLink.textSecondary, marginBottom: 6 },
  infoBox: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12, marginTop: 24 },
  infoText: { fontSize: 13, color: COLORS.familyLink.text, lineHeight: 20 },
});
