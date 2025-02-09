import dotenv from "dotenv";
import { IGithubActivity } from "./interface/IGithubActivity.js";
dotenv.config();

export async function getActivityList() {
  const username = "decidev22";
  const auth = process.env.GITHUB_ACCESS_TOKEN;
  const url = `https://api.github.com/users/${username}/events`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${auth}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await fetch(url, { headers });
    if (response.status === 200) {
      const data = await response.json();
      const output: IGithubActivity[] = data.map((event: any) => {
        return {
          id: event.id,
          type: event.type,
          actor: event.actor.name, // actor.name
          repo_name: event.repo.name, // repo.name match decidev/w*
          repo_url: event.repo.url, // repo.url
          commit: event.payload,
          date: event.created_at, // created_at
        };
      });
      console.log(output);
      return data;
    } else if (response.status != 200) {
      throw new Error(`ERROR requesting curl request status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
