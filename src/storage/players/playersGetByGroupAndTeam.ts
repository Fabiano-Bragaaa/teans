import { PlayersGetByGroup } from "./playersGetByGroup";

export async function PlayersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await PlayersGetByGroup(group);

    const players = storage.filter((players) => players.team === team);

    return players;
  } catch (err) {
    throw err;
  }
}
