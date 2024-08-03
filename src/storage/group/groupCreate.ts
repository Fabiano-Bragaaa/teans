import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupsGetAll } from "./groupsGetAll";
import { GROUP_TEAMS } from "../storageConfig";
import { AppError } from "../../components/utils/appError";

export async function GroupCreate(newGroupName: string) {
  try {
    const storedGroups = await GroupsGetAll();

    const groupAlreadyExist = storedGroups.includes(newGroupName);

    if (groupAlreadyExist) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    const storage = JSON.stringify([...storedGroups, newGroupName]);
    await AsyncStorage.setItem(GROUP_TEAMS, storage);
  } catch (err) {
    throw err;
  }
}
