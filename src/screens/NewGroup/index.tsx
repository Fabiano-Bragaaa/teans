import { Alert, View } from "react-native";
import { Container, Content, Icon } from "./styles";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { GroupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../components/utils/appError";

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");

  async function handleNewGroup() {
    try {
      if (group.trim() === "") {
        return Alert.alert("Novo grupo", "Informe o nome do grupo.");
      }
      await GroupCreate(group);
      navigation.navigate("players", { group });
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Novo grupo", err.message);
      } else {
        Alert.alert("Novo grupo", "Não foi possivel criar um novo grupo");
        console.log(err);
        setGroup("");
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Digite o nome da turma"
          value={group}
          onChangeText={setGroup}
        />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
