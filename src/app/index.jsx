import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Importação dos Componentes Reutilizáveis
import PokemonCard from '../../components/PokemonCard';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import PokemonDetail from '../../screens/PokemonDetail';


export default function App() {
  // 1. Definição dos Estados do Projeto
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [pesquisa, setPesquisa] = useState('');
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

  // 2. Função para carregar a lista de Pokémon via PokéAPI
  async function carregarPokemons() {
    try {
      setLoading(true);
      setErro(null);

      // Busca os 30 primeiros Pokémon (Desafio da Prova)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

      if (!response.ok) {
        throw new Error('Erro ao conectar com a API.');
      }

      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      setErro('Não foi possível carregar os Pokémon. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  // 3. useEffect para carregar os dados ao montar a tela
  useEffect(() => {
    carregarPokemons();
  }, []);

  // 4. Lógica de Filtragem da Barra de Busca
  const pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // --- Renderização Condicional: Carregamento ---
  if (loading) {
    return <Loading mensagem="Carregando Pokédex..." />;
  }

  // --- Renderização Condicional: Erro ---
  if (erro) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.textoErro}>{erro}</Text>
        <TouchableOpacity style={styles.botaoRecarregar} onPress={carregarPokemons}>
          <Text style={styles.textoBotaoRecarregar}>Recarregar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Renderização Condicional: Tela de Detalhes ---
  if (pokemonSelecionado) {
    return (
      <SafeAreaView style={styles.containerArea}>
        <PokemonDetail
          pokemon={pokemonSelecionado}
          onVoltar={() => setPokemonSelecionado(null)}
        />
      </SafeAreaView>
    );
  }

  // --- Renderização Principal: Lista Pokédex ---
  return (
    <SafeAreaView style={styles.containerArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FF0000" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Pokédex Mobile</Text>
        <TouchableOpacity style={styles.botaoRecarregarTopo} onPress={carregarPokemons}>
          <Text style={styles.textoBotaoRecarregarTopo}>↻ Recarregar</Text>
        </TouchableOpacity>
      </View>

      {/* Componente Barra de Pesquisa */}
      <SearchBar valor={pesquisa} onChangeValor={setPesquisa} />

      {/* Exibição condicional caso a pesquisa não encontre nenhum Pokémon */}
      {pokemonsFiltrados.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.textoVazio}>
            Nenhum Pokémon encontrado com "{pesquisa}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={pokemonsFiltrados}
          keyExtractor={(item) => item.name}
          numColumns={2}
          contentContainerStyle={styles.listaContent}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => setPokemonSelecionado(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FF0000',
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  botaoRecarregarTopo: {
    backgroundColor: '#CC0000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoRecarregarTopo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listaContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoErro: {
    fontSize: 16,
    color: '#D8000C',
    textAlign: 'center',
    marginBottom: 16,
  },
  textoVazio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  botaoRecarregar: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotaoRecarregar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});