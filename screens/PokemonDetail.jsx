import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

export default function PokemonDetail({ pokemon, onVoltar }) {
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        setLoading(true);
        setErro(null);

        // Requisição para buscar os detalhes completos do Pokémon pelo nome
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`);

        if (!response.ok) {
          throw new Error('Não foi possível carregar os detalhes do Pokémon.');
        }

        const data = await response.json();
        setDetalhes(data);
      } catch (err) {
        setErro(err.message || 'Erro ao carregar detalhes.');
      } finally {
        setLoading(false);
      }
    }

    if (pokemon) {
      carregarDetalhes();
    }
  }, [pokemon]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.carregandoTexto}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.erroTexto}>{erro}</Text>
        <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.textoBotaoVoltar}>← Voltar para a Lista</Text>
      </TouchableOpacity>

      <View style={styles.cardDetalhe}>
        <Image
          source={{
            uri:
              detalhes.sprites.other['official-artwork'].front_default ||
              detalhes.sprites.front_default,
          }}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.id}>#{String(detalhes.id).padStart(3, '0')}</Text>
        <Text style={styles.nome}>{capitalize(detalhes.name)}</Text>

        {/* Exibição dos Tipos do Pokémon */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Tipos</Text>
          <View style={styles.tiposContainer}>
            {detalhes.types.map((item, index) => (
              <View key={index} style={styles.badgeTipo}>
                <Text style={styles.textoTipo}>{capitalize(item.type.name)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Exibição das Medidas (Peso e Altura) */}
        <View style={styles.secaoMedidas}>
          <View style={styles.medidaBox}>
            <Text style={styles.medidaTitulo}>Altura</Text>
            <Text style={styles.medidaValor}>{(detalhes.height / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.medidaBox}>
            <Text style={styles.medidaTitulo}>Peso</Text>
            <Text style={styles.medidaValor}>{(detalhes.weight / 10).toFixed(1)} kg</Text>
          </View>
        </View>

        {/* Exibição das Estatísticas Base */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Estatísticas Base</Text>
          {detalhes.stats.map((statItem, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statNome}>{capitalize(statItem.stat.name)}:</Text>
              <Text style={styles.statValor}>{statItem.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    backgroundColor: '#CC0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoBotaoVoltar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardDetalhe: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imagem: {
    width: 180,
    height: 180,
  },
  id: {
    fontSize: 16,
    color: '#777',
    fontWeight: 'bold',
    marginTop: 8,
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  secao: {
    width: '100%',
    marginTop: 12,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 4,
  },
  tiposContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeTipo: {
    backgroundColor: '#3B4CCA',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoTipo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secaoMedidas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
  },
  medidaBox: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    width: '45%',
  },
  medidaTitulo: {
    fontSize: 14,
    color: '#666',
  },
  medidaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statNome: {
    fontSize: 14,
    color: '#555',
  },
  statValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  carregandoTexto: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  erroTexto: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});