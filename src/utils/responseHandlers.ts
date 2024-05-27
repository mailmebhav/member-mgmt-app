import { ApiResponse } from "@/app/model/ApiResponse";
import { NextResponse } from "next/server";

export function unauthorizedResponse(): NextResponse {
    let errResponse = new ApiResponse();
    errResponse.status = "UNAUTHORIZED";
    errResponse.errorMessage = "Invalid Auth Token";
    errResponse.data = null;
    return NextResponse.json(errResponse, { status: 401 });
}

export function createApiResponseObject(status: string, errorMessage: string, data: any): ApiResponse {
    let apiResponse = new ApiResponse();
    apiResponse.status = status;
    apiResponse.errorMessage = errorMessage;
    apiResponse.data = data;
    return apiResponse;
}

export function internalServerErrorResponse(errorMessage: string): NextResponse {
    let errResponse = new ApiResponse();
    errResponse.status = "INTERNAL_SERVER_ERROR";
    errResponse.errorMessage = errorMessage;
    errResponse.data = null;
    return NextResponse.json(errResponse, { status: 500 });
}