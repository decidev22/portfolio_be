import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import express from "express";

export const lambdaHandlerWrapper = async (
  event: APIGatewayProxyEvent,
  controller: (req: express.Request, res: express.Response) => Promise<express.Response>
): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve) => {
    const req = {} as express.Request;

    let response: APIGatewayProxyResult;

    const res = {
      status: (statusCode: number) => ({
        json: (body: any) => {
          response = {
            statusCode,
            headers: {
              "Access-Control-Allow-Origin": "*", // Allow all origins for now
              "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS", // No DELETE
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify(body),
          };
          resolve(response);
        },
      }),
    } as any;

    controller(req, res);
  });
};
