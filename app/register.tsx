import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AuthService from '../services/AuthService';
import { COLORS } from '../constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register(email, password, name, 'parent');
      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => router.replace('/dashboard') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Guardian View</Text>
      </View>

      <CustomInput label="Full Name" value={name} onChangeText={setName} />
      <CustomInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <CustomInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      
      <CustomButton title="Create Account" onPress={handleRegister} loading={loading} />
      
      <TouchableOpacity onPress={() => router.back()} style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.guardian.background },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.guardian.primary },
  subtitle: { fontSize: 16, color: COLORS.guardian.textSecondary, marginTop: 8 },
  link: { marginTop: 16, alignItems: 'center' },
  linkText: { color: COLORS.guardian.secondary, fontSize: 14, fontWeight: '600' },
});
