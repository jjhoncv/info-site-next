interface FetchCustomBody {
  url: string;
  method: "PUT" | "PATCH" | "POST";
  data: any;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const FetchCustomBody = async ({
  url,
  method,
  data,
}: FetchCustomBody) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json: ApiResponse = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Error en la petición");
    }

    return json.message;
  } catch (error: any) {
    throw new Error(error.message || "Error en la petición");
  }
};
