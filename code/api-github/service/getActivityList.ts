import dotenv from "dotenv";
import { IGithubActivity } from "../interface/IGithubActivity.js";
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
        const eventPayload = Object.entries(event.payload).reduce((acc, [key, value]) => {
          if (key === "ref") acc.ref = value;
          if (key === "ref_type") acc.ref_type = value;
          if (key === "commits") {
            if (Array.isArray(value)) {
              acc.commits = value.map((item) => Object.values(filterPayload(item)));
            }
            if (typeof value === "object" && value) {
              acc.commits = filterPayload(value);
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
      throw new Error(`ERROR requesting curl request status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function filterPayload(payload: object): object {
  const banList = ["sha", "secret"]; // List of items I don't want to share.
  const output: { [key: string]: any } = {};
  Object.entries(payload).filter(([key, value]) => {
    console.log(key);
    if (!banList.includes(key)) {
      output[key] = typeof value === "object" && value ? filterPayload(value) : value;
    }
  });
  console.log(output);
  return output;
}
