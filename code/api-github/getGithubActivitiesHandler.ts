import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getGithubActivityController } from "./controller/getGithubActivityController";
import { lambdaHandlerWrapper } from "../support/lambdaHandlerSupport";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return lambdaHandlerWrapper(event, getGithubActivityController);
};
