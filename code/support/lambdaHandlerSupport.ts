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
            body: JSON.stringify(body),
          };
          resolve(response);
        },
      }),
    } as any;

    controller(req, res);
  });
};
