import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import LinkingService from '../services/LinkingService';
import AuthService from '../services/AuthService';
import { COLORS } from '../constants/Colors';

export default function LinkDeviceScreen() {
  const router = useRouter();
  const [linkingCode, setLinkingCode] = useState('');
  const [qrData, setQrData] = useState('');
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = () => {
    const { code, qrData: data } = LinkingService.generateLinkingCode(user?.id || '');
    setLinkingCode(code);
    setQrData(data);
  };

  const handleRefresh = () => {
    generateCode();
    Alert.alert('Code Refreshed', 'A new linking code has been generated');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Link Child Device</Text>
        <Text style={styles.subtitle}>Share this code with your child's device</Text>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>6-Digit Code</Text>
        <Text style={styles.code}>{linkingCode}</Text>
        <Text style={styles.codeInfo}>Code expires in 15 minutes</Text>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>How to Link:</Text>
        <Text style={styles.instruction}>1. Install "Family Link" app on child's device</Text>
        <Text style={styles.instruction}>2. Open the app and tap "Link to Parent"</Text>
        <Text style={styles.instruction}>3. Enter the 6-digit code shown above</Text>
        <Text style={styles.instruction}>4. Child must review and accept consent</Text>
        <Text style={styles.instruction}>5. Device will appear in your dashboard</Text>
      </View>

      <View style={styles.consent}>
        <Text style={styles.consentTitle}>⚠️ Important</Text>
        <Text style={styles.consentText}>
          The child will be shown a clear consent screen explaining what data will be monitored 
          (location, app usage) and why. They must explicitly accept before linking completes.
        </Text>
      </View>

      <View style={styles.buttons}>
        <CustomButton title="Refresh Code" onPress={handleRefresh} variant="secondary" />
        <CustomButton title="Back to Dashboard" onPress={() => router.back()} variant="primary" style={{ marginTop: 12 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 14, color: COLORS.guardian.textSecondary, marginTop: 8 },
  codeContainer: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  codeLabel: { fontSize: 14, color: COLORS.guardian.textSecondary, marginBottom: 8 },
  code: { fontSize: 48, fontWeight: 'bold', color: COLORS.guardian.primary, letterSpacing: 8 },
  codeInfo: { fontSize: 12, color: COLORS.guardian.warning, marginTop: 8 },
  instructions: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 16 },
  instructionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.guardian.text, marginBottom: 12 },
  instruction: { fontSize: 14, color: COLORS.guardian.textSecondary, marginBottom: 8 },
  consent: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12, marginBottom: 24 },
  consentTitle: { fontSize: 14, fontWeight: '600', color: COLORS.guardian.warning, marginBottom: 8 },
  consentText: { fontSize: 13, color: COLORS.guardian.text, lineHeight: 20 },
  buttons: {},
});
