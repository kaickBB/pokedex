import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ mensagem = "Carregando Pokédex..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF0000" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  texto: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});