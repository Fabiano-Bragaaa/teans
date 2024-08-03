import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_TEAMS, GROUP_TEAMS } from "../storageConfig";

import { GroupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await GroupsGetAll();
    const groups = storedGroups.filter((groups) => groups !== groupDeleted);

    await AsyncStorage.setItem(GROUP_TEAMS, JSON.stringify(groups));

    await AsyncStorage.removeItem(`${PLAYER_TEAMS}-${groupDeleted}`);
  } catch (err) {
    throw err;
  }
}
