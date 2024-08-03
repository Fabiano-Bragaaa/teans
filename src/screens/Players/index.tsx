import { useEffect, useRef, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import { PlayerCard } from "../../components/PlayerCard";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";
import { AppError } from "../../components/utils/appError";

import { PlayerAddByGroup } from "../../storage/players/playerAddByGroup";
import { PlayersGetByGroupAndTeam } from "../../storage/players/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/players/PlayerStorageDTO";
import { PlayerRemoveByGroup } from "../../storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";

type RoutesParams = {
  group: string;
};

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RoutesParams;

  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim() === "") {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await PlayerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Nova Pessoa", err.message);
      } else {
        console.log(err);
        Alert.alert("Nova Pessoa", "Não foi possivel adicionar");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersTeam = await PlayersGetByGroupAndTeam(group, team);
      setPlayers(playersTeam);
    } catch (err) {
      console.log(err);
      Alert.alert("Pessoas", "Não foi possivel carregar as pessoas do grupo");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await PlayerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (err) {
      Alert.alert("Remover pessoa", "Não foi possivel remover essa pessoa");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (err) {
      console.log(err);
      Alert.alert("Remover grupo", "Não foi possivel remover o grupo.");
    }
  }

  async function handleRemoveGroups() {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subTitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <Message title="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroups}
      />
    </Container>
  );
}
