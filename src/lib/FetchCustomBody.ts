interface FetchCustomBody {
  url: string;
  method: "PUT" | "PATCH" | "POST" | "DELETE";
  data: any;
  withFiles?: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const FetchCustomBody = async ({
  url,
  method,
  data,
  withFiles,
}: FetchCustomBody) => {
  // peticion con archivos
  let optionsFetch: RequestInit = {
    method,
    body: data,
  };

  // peticion simple
  if (!withFiles) {
    optionsFetch = {
      ...optionsFetch,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  }

  try {
    const response = await fetch(url, optionsFetch);

    const json: ApiResponse = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Error en la petición");
    }

    return json.message;
  } catch (error: any) {
    throw new Error(error.message || "Error en la petición");
  }
};
