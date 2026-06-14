import { api } from "./api";

export interface WorksheetItem {
  number: number;
  kind: string;
  difficulty: number;
  prompt: string;
  options: string[] | null;
  answer: string;
}

export interface WorksheetData {
  title: string;
  tagline: string;
  worldName: string;
  estMinutes: number;
  questions: WorksheetItem[];
}

export const worksheetApi = {
  /** Fetch a fresh (reshuffled) printable problem set for a lesson. */
  async get(slug: string): Promise<WorksheetData> {
    const { data } = await api.get<WorksheetData>(`/worksheet/${slug}`);
    return data;
  },
};
