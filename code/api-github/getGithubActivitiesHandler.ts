import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import express from "express";
import { getGithubActivityController } from "./controller/getGithubActivityController";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve) => {
    const req = {} as express.Request;

    // Capture response in a variable
    let response: APIGatewayProxyResult;

    const res = {
      status: (statusCode: number) => ({
        json: (body: any) => {
          response = {
            statusCode,
            body: JSON.stringify(body),
          };
          resolve(response); // Resolve the promise with the response
        },
      }),
    } as any;

    getGithubActivityController(req, res);
  });
};
