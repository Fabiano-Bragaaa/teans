import { useState } from "react";
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";

import { Container } from "./styles";
import { FlatList } from "react-native";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <Message title="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" />
    </Container>
  );
}
