import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Função auxiliar para capitalizar a primeira letra do nome do Pokémon
const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

export default function PokemonCard({ pokemon, onPress }) {
  // Extrai o ID da URL recebida da PokéAPI (Exemplo: "https://pokeapi.co/api/v2/pokemon/1/")
  const id = pokemon.url.split('/').filter(Boolean).pop();

  // URL para a imagem oficial sprite do Pokémon
  const imagemUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: imagemUrl }}
        style={styles.imagem}
        resizeMode="contain"
      />
      <Text style={styles.idText}>#{id.padStart(3, '0')}</Text>
      <Text style={styles.nomeText}>{capitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    // Sombra para Android
    elevation: 3,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  imagem: {
    width: 90,
    height: 90,
  },
  idText: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 4,
  },
  nomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
});