import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthService from '../services/AuthService';
import { COLORS } from '../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await AuthService.login(email, password);
      
      if (result.requires2FA) {
        setShow2FA(true);
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (twoFactorCode.length !== 6) {
      Alert.alert('Error', 'Please enter 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const verified = await AuthService.verify2FA(twoFactorCode);
      if (verified) {
        router.replace('/dashboard');
      } else {
        Alert.alert('Error', 'Invalid 2FA code');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to Guardian View</Text>
      </View>

      {!show2FA ? (
        <>
          <CustomInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <CustomInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          
          <CustomButton title="Login" onPress={handleLogin} loading={loading} />
          
          <TouchableOpacity onPress={() => router.push('/register')} style={styles.link}>
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>Enter the 6-digit code from your authenticator app</Text>
          <CustomInput label="2FA Code" value={twoFactorCode} onChangeText={setTwoFactorCode} keyboardType="number-pad" maxLength={6} />
          <CustomButton title="Verify" onPress={handleVerify2FA} loading={loading} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 16, color: COLORS.guardian.textSecondary, marginTop: 8 },
  info: { fontSize: 14, color: COLORS.guardian.textSecondary, marginBottom: 16 },
  link: { marginTop: 16, alignItems: 'center' },
  linkText: { color: COLORS.guardian.secondary, fontSize: 14, fontWeight: '600' },
});
