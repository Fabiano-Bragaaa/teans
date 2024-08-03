import { useCallback, useState } from "react";
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";

import { Container } from "./styles";
import { FlatList } from "react-native";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GroupsGetAll } from "../../storage/group/groupsGetAll";

export function Groups() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const data = await GroupsGetAll();
      setGroups(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenGroups(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard onPress={() => handleOpenGroups(item)} title={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <Message title="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
