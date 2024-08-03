import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../components/utils/appError";

import { PLAYER_TEAMS } from "../storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PlayersGetByGroup } from "./playersGetByGroup";

export async function PlayerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const stored = await PlayersGetByGroup(group);

    const playerAlreadyExist = stored.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExist.length > 0) {
      throw new AppError("Essa pessoa já está cadastrada em um time aqui.");
    }

    const storage = JSON.stringify([...stored, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_TEAMS}-${group}`, storage);
  } catch (err) {
    throw err;
  }
}
