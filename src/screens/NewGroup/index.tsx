import { View } from "react-native";
import { Container, Content, Icon } from "./styles";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Digite o nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
