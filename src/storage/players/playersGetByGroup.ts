import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_TEAMS } from "../storageConfig";

export async function PlayersGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_TEAMS}-${group}`);
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (err) {
    throw err;
  }
}
