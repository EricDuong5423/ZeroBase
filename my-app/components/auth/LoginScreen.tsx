import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';

interface LoginScreenProps {
  onNavigateToSignup: () => void;
}

export default function LoginScreen({ onNavigateToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
     
      {/* Right content area */}
      <View style={styles.authContainer}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuDots}>⋯</Text>
        </View>

        <View style={styles.authContent}>
          {/* Logo and tagline */}
          <View style={styles.authHeader}>
            <View style={styles.piggyBankIcon}>
              <Text style={styles.piggyBankEmoji}>🐷</Text>
            </View>
            <Text style={styles.authLogo}>Zero Base</Text>
            <Text style={styles.authTagline}>
              Know your limit for{'\n'}a better end of month
            </Text>
          </View>

          {/* Login form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sign in</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="sample@gmail.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Pressable style={styles.inputIcon}>
                  <Text>✏️</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={styles.inputIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text>👁️</Text>
                </Pressable>
              </View>
              <Pressable>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </Pressable>
            </View>

            <Pressable style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </Pressable>

            <Pressable style={styles.signUpButton} onPress={onNavigateToSignup}>
              <Text style={styles.signUpButtonText}>Signup</Text>
            </Pressable>

            <Text style={styles.socialText}>Log in with Social Media</Text>
            <View style={styles.socialButtons}>
              <Pressable style={styles.socialButton}>
                <Text style={styles.socialIcon}>f</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Text style={styles.socialIcon}>𝕏</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Text style={styles.socialIcon}>G</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  sidebar: {
    width: 178,
    backgroundColor: '#1a1a1a',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#f5d5d5',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  menuDots: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  authContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  piggyBankIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  piggyBankEmoji: {
    fontSize: 32,
  },
  authLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  authTagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  inputIcon: {
    padding: 8,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 8,
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  socialText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
