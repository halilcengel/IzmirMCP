/**
 * Utility functions for the MCP server
 */

/**
 * Wraps a tool handler with error handling
 * @param handler - The async function to wrap
 * @returns Wrapped handler that catches and formats errors
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      const result = await handler(...args);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`[Tool Error]:`, errorMessage);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ error: errorMessage, success: false }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }) as T;
}
