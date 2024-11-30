import { NextResponse } from "next/server";
import { ApiResponse } from "./ApiResponse";

// Función helper para crear respuestas consistentes
export const createResponse = (
  data: ApiResponse,
  status: number
): NextResponse<ApiResponse> => {
  return NextResponse.json(data, { status });
};

// Función helper para manejar errores
export const handleError = (error: any, status: number = 500): NextResponse => {
  return createResponse(
    {
      message: error.sqlMessage || error.message || "An error occurred",
      success: false,
    },
    status
  );
};

// Wrapper para manejar try-catch de manera consistente
export const apiHandler = async (
  handler: () => Promise<NextResponse>
): Promise<NextResponse> => {
  try {
    return await handler();
  } catch (error: any) {
    return handleError(error);
  }
};
