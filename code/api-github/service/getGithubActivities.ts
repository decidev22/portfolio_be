import dotenv from "dotenv";
import { IGithubActivity } from "../interface/IGithubActivity.ts";
dotenv.config();

export async function getGhActivities() {
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
    console.log("Response Headers:", response.headers);
    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new Error(`ERROR: ${response.status}`);
    }
    const banList = ["sha", "secret", "distinct"]; // List of items I don't want to share.
    if (response.status === 200) {
      const data = await response.json();
      const output: IGithubActivity[] = data.map((event: any) => {
        const eventPayload = Object.entries(event.payload).reduce((acc, [key, value]) => {
          if (key === "ref") acc.ref = value;
          if (key === "ref_type") acc.ref_type = value;
          if (key === "commits") {
            if (Array.isArray(value)) {
              acc.commits = value.map((commit) => {
                const temp = { ...commit };
                banList.forEach((property) => delete temp[property]);
                return temp;
              });
            }
          }
          if (key === "action") acc.action = value;
          return acc;
        }, {} as Record<string, any>);
        return {
          id: event.id,
          type: event.type,
          actor: event.actor.display_login, // actor.display_login
          repo_name: event.repo.name.substring(10), // repo.name match decidev/w*
          repo_url: event.repo.url, // repo.url
          payload: eventPayload,
          date: event.created_at, // created_at
        };
      });
      return output;
    } else if (response.status != 200) {
      throw new Error(`ERROR, request status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
