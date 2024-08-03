import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_TEAMS } from "../storageConfig";
import { PlayersGetByGroup } from "./playersGetByGroup";

export async function PlayerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await PlayersGetByGroup(group);
    const filtered = storage.filter((player) => player.name !== playerName);

    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_TEAMS}-${group}`, players);
  } catch (err) {
    throw err;
  }
}
