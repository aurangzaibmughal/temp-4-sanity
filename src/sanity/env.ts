export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-23'

export const dataset = assertValue(
  "production",
  'Missing environment variable: SANITY_STUDIO_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_SANITY_PROJECT_ID ||"pyb7boz3" ,
  'Missing environment variable: SANITY_STUDIO_SANITY_PROJECT_ID'
)

export const token = assertValue(
  process.env.SANITY_API_TOKEN ||"skkvnR5mdf8ox8x30SFBeJiN7Df3i69VigpKvquk85fYz9OqpESwp79m5emawQ7IcPLx4yhhZx9tpVyLkn7TLcFfjlsEiNZof3kJTUkjn6fCKDKxlYJWRAbkeHaxp4qwORircjf2hD8ldbCP10WZvZTZmueinvWEHwrRGjvdQDtzy2cx6ekg",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
