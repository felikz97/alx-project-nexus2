export async function registerUser(userData: {
  username: string;
  Full_Name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
  );

  if (!res.ok) {
    // try to parse error details
    let errorMessage = "Registration failed";
    try {
      const errorData = await res.json();
      if (errorData.detail) errorMessage = errorData.detail;
      else if (errorData.message) errorMessage = errorData.message;
      else if (typeof errorData === "string") errorMessage = errorData;
    } catch {
      // fallback generic message
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
