import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../style/Style";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || loading) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      await onLogin(trimmedEmail, password);
    } catch {
      setError("Login gagal. Periksa email dan kata sandi, lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.loginScroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginContainer}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>PB</Text>
          </View>
          <Text style={styles.eyebrow}>SISTEM PEMINJAMAN</Text>
          <Text style={styles.loginTitle}>Selamat datang</Text>
          <Text style={styles.loginSubtitle}>
            Kelola peminjaman alat dengan lebih mudah.
          </Text>

          <View style={styles.form}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="nama@contoh.com"
              placeholderTextColor="#98A2B3"
              style={styles.input}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
            />
            <Text style={styles.inputLabel}>Kata sandi</Text>
            <View style={styles.passwordField}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan kata sandi"
                placeholderTextColor="#98A2B3"
                style={[styles.input, styles.passwordInput]}
                secureTextEntry={!passwordVisible}
                autoComplete="password"
              />
              <Pressable
                onPress={() => setPasswordVisible((visible) => !visible)}
                style={styles.passwordToggle}
                accessibilityRole="button"
                accessibilityLabel={
                  passwordVisible
                    ? "Sembunyikan kata sandi"
                    : "Tampilkan kata sandi"
                }
              >
                <Text style={styles.passwordToggleText}>
                  {passwordVisible ? "Sembunyikan" : "Tampilkan"}
                </Text>
              </Pressable>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable
              style={[
                styles.primaryButton,
                (loading || !email.trim() || !password) &&
                  styles.primaryButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading || !email.trim() || !password}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? "Memeriksa..." : "Masuk"}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.helperText}>
            Gunakan akun email yang terdaftar di Firebase untuk melanjutkan.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
