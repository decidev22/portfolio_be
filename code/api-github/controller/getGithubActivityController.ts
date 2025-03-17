import { getGhActivities } from "../service/getGithubActivities.ts";

export const getGithubActivityController = async () => {
  try {
    console.log("getGithubActivityController is being called");
    const ghLog = await getGhActivities();

    // Return Lambda-compatible response
    return {
      statusCode: 200,
      body: JSON.stringify(ghLog), // Ensure the body is a string (Lambda expects a string)
    };
  } catch (error: any) {
    // Return Lambda-compatible error response
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Error: ${error.message}` }),
    };
  }
};
