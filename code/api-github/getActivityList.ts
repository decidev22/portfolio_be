import dotenv from "dotenv";
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
      const data = response.json();
      console.log(data);
      return data;
    } else if (response.status != 200) {
      throw new Error(`ERROR requesting curl request status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
