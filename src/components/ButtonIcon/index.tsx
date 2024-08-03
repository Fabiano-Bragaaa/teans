import { TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Container, IconDinamic, ButtonIconStyleProps } from "./styles";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStyleProps;
};

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
  return (
    <Container {...rest}>
      <IconDinamic name={icon} type={type} />
    </Container>
  );
}
