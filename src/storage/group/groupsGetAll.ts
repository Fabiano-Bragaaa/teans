import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_TEAMS } from "../storageConfig";

export async function GroupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_TEAMS);

    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (err) {
    throw err;
  }
}
