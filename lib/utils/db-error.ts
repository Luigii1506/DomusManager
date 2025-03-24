import { Prisma } from "@prisma/client";
import { DatabaseError, isRetryableError } from "./errors";

function getErrorMessage(
  code: string,
  error: Prisma.PrismaClientKnownRequestError
): string {
  switch (code) {
    case "P2002":
      return `A unique constraint would be violated on ${error.meta?.target}`;
    case "P2003":
      return "Foreign key constraint failed";
    case "P2025":
      return "Record not found";
    default:
      return error.message;
  }
}

export async function handleDatabaseError(error: unknown): Promise<never> {
  console.error("Database error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const message = getErrorMessage(error.code, error);
    throw new DatabaseError(message, error.code, error.meta);
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("An unknown error occurred");
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: unknown;
  let attempt = 1;

  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error) || attempt === maxRetries) {
        throw error;
      }

      console.warn(
        `Attempt ${attempt} failed, retrying in ${delayMs}ms...`,
        error
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      attempt++;
    }
  }

  throw lastError;
}
