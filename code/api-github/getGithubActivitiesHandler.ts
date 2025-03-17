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
  try {
    const result = await getGithubActivityController(express.request, express.response);
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
