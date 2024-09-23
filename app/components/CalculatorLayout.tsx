import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export function CalculatorLayout() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplay('0');
      setPrevValue(null);
      setOperation(null);
    } else if (value === '±') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    } else if (value === '%') {
      setDisplay((parseFloat(display) / 100).toString());
    } else if (['+', '-', '×', '÷'].includes(value)) {
      setPrevValue(display);
      setOperation(value);
      setDisplay('0');
    } else if (value === '=') {
      if (prevValue && operation) {
        const prev = parseFloat(prevValue);
        const current = parseFloat(display);
        let result;
        switch (operation) {
          case '+': result = prev + current; break;
          case '-': result = prev - current; break;
          case '×': result = prev * current; break;
          case '÷': result = prev / current; break;
        }
        setDisplay(result.toString());
        setPrevValue(null);
        setOperation(null);
      }
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  button === '0' && styles.zeroButton,
                  ['÷', '×', '-', '+', '='].includes(button) && styles.operatorButton,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={[
                  styles.buttonText,
                  ['÷', '×', '-', '+', '='].includes(button) && styles.operatorText,
                  ['C', '±', '%'].includes(button) && styles.functionText,
                ]}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 70,
  },
  buttons: {
    flex: 3,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 50,
  },
  zeroButton: {
    flex: 2.1,
  },
  operatorButton: {
    backgroundColor: '#f1a33c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  operatorText: {
    color: '#fff',
  },
  functionText: {
    color: '#000',
  },
});