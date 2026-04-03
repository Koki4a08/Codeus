/**
 * Shared types for file persistence modules.
 */

/** Millisecond timestamp marking when a turn started (from Date.now()) */
export type TurnStartTime = number

/** Subdirectory within the session directory where output files are stored */
export const OUTPUTS_SUBDIR = 'outputs'

/** Maximum number of files that can be persisted in a single turn */
export const FILE_COUNT_LIMIT = 1000

/** Default number of concurrent file uploads */
export const DEFAULT_UPLOAD_CONCURRENCY = 5

/** A successfully persisted file with its Files API ID */
export type PersistedFile = {
  filename: string
  file_id: string
}

/** A file that failed to be persisted */
export type FailedPersistence = {
  filename: string
  error: string
}

/** Result data for the files_persisted analytics event */
export type FilesPersistedEventData = {
  files: PersistedFile[]
  failed: FailedPersistence[]
}
