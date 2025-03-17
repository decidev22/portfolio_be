import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import express from "express";
import { getGithubActivityController } from "./controller/getGithubActivityController";

// getGithubActivities Lambda
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const req = {} as express.Request; // Create an empty request object
  const res = {
    status: (statusCode: number) => ({
      send: (body: any) => {
        // Return response as an object, similar to what Express does
        return {
          statusCode,
          body: JSON.stringify(body),
        };
      },
    }),
  } as any; // Mock the response object
  try {
    const result = await getGithubActivityController(req, res);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: result,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error: ${err} happened while executing request ${event}`,
      }),
    };
  }
};
