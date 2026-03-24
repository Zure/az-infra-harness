import path from 'path'

/**
 * Root directory for all user data files.
 *
 * When running via `npx azure-infra-prompt-kit`, the CLI sets AIPK_DATA_ROOT
 * to the directory where the user ran the command (their project root).
 *
 * When running in development (`npm run dev` from src/), this falls back to
 * process.cwd() which is the src/ directory — matching the existing src/data/ layout.
 */
const DATA_ROOT = process.env.AIPK_DATA_ROOT ?? process.cwd()

export const DATA_DIR = path.join(DATA_ROOT, 'data')
export const EXPORT_BICEP_DIR = path.join(DATA_ROOT, 'export-bicep')
export const EXPORT_TERRAFORM_DIR = path.join(DATA_ROOT, 'export-terraform')
