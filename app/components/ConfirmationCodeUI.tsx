import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const CODE_LENGTH = 4;
const CORRECT_CODE = '1234'; // For demonstration purposes

export function ConfirmationCodeUI() {
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = code.split('');
    newCode[index] = text;
    setCode(newCode.join(''));

    if (text.length === 1 && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (code === CORRECT_CODE) {
      setIsSuccess(true);
      setIsError(false);
    } else {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, easing: Easing.out(Easing.ease) }}
      >
        <Text style={styles.title}>Enter Confirmation Code</Text>
        <Text style={styles.subtitle}>We've sent a code to your email</Text>
      </MotiView>

      <MotiView
        animate={{ translateX: isError ? [-10, 10, -10, 10, 0] : 0 }}
        transition={{ type: 'timing', duration: 400, loop: isError ? 2 : false }}
      >
        <View style={styles.codeContainer}>
          {[...Array(CODE_LENGTH)].map((_, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                borderColor: isSuccess ? '#4CAF50' : (isError ? '#FF5252' : '#4CAF50')
              }}
              transition={{ 
                type: 'timing', 
                duration: 300, 
                delay: index * 100, 
                easing: Easing.out(Easing.ease) 
              }}
            >
              <TextInput
                ref={ref => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  isSuccess && styles.successInput,
                  isError && styles.errorInput
                ]}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleCodeChange(text, index)}
                onKeyPress={event => handleKeyPress(event, index)}
                value={code[index] || ''}
              />
            </MotiView>
          ))}
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 600, easing: Easing.out(Easing.ease) }}
      >
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Verify</Text>
        </TouchableOpacity>
      </MotiView>

      {isError && (
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <Text style={styles.errorText}>Incorrect code. Please try again.</Text>
        </MotiView>
      )}

      {isSuccess && (
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <Text style={styles.successText}>Code verified successfully!</Text>
        </MotiView>
      )}

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 800 }}
      >
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  successInput: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  errorInput: {
    borderColor: '#FF5252',
    backgroundColor: '#FFEBEE',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    padding: 10,
  },
  resendButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 16,
    marginBottom: 20,
  },
  successText: {
    color: '#4CAF50',
    fontSize: 16,
    marginBottom: 20,
  },
});