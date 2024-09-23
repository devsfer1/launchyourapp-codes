import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

export function QRCodeGeneratorLayout() {
  const [qrValue, setQrValue] = useState('https://example.com');
  const [qrSize, setQrSize] = useState(200);
  const qrRef = useRef();

  const shareQRCode = async () => {
    try {
      qrRef.current.toDataURL((data) => {
        const shareImageBase64 = {
          title: 'QR Code',
          message: 'Here is your generated QR Code',
          url: `data:image/png;base64,${data}`
        };
        Share.share(shareImageBase64);
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(qrValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QR Code Generator</Text>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={qrSize}
            color="black"
            backgroundColor="white"
            getRef={(ref) => (qrRef.current = ref)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={qrValue}
            onChangeText={setQrValue}
            placeholder="Enter URL or text"
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>QR Code Size:</Text>
          <View style={styles.sizeButtons}>
            {[150, 200, 250, 300].map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, qrSize === size && styles.activeSizeButton]}
                onPress={() => setQrSize(size)}
              >
                <Text style={[styles.sizeButtonText, qrSize === size && styles.activeSizeButtonText]}>
                  {size}x{size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
          <Ionicons name="share-outline" size={24} color="white" />
          <Text style={styles.shareButtonText}>Share QR Code</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E2A78',
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  copyButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E2A78',
    marginBottom: 10,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeSizeButton: {
    backgroundColor: '#4A90E2',
  },
  sizeButtonText: {
    color: '#1E2A78',
    fontWeight: 'bold',
  },
  activeSizeButtonText: {
    color: 'white',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});