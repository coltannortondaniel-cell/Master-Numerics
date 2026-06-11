import { api } from "./api";

export interface NoteSummary {
  lessonSlug: string;
  lessonTitle: string;
  worldName: string;
  worldSlug: string;
  subject: string;
  content: string;
  updatedAt: string;
}
export interface Deck {
  deck: string;
  total: number;
  due: number;
}
export interface ReviewCard {
  id: string;
  deck: string;
  front: string;
  back: string;
}
export interface FormulaGroup {
  topic: string;
  subject: string;
  items: { ref: string; label: string; tex: string; lessonTitle: string; starred: boolean }[];
}

export const studyApi = {
  async listNotes(q?: string): Promise<NoteSummary[]> {
    const { data } = await api.get<{ notes: NoteSummary[] }>("/study/notes", { params: q ? { q } : {} });
    return data.notes;
  },
  async getNote(slug: string): Promise<string> {
    const { data } = await api.get<{ content: string }>(`/study/notes/${slug}`);
    return data.content;
  },
  async saveNote(slug: string, content: string): Promise<void> {
    await api.put(`/study/notes/${slug}`, { content });
  },
  async decks(): Promise<Deck[]> {
    const { data } = await api.get<{ decks: Deck[] }>("/study/decks");
    return data.decks;
  },
  async generateFromLesson(slug: string): Promise<{ created: number; alreadyExists?: boolean; deck?: string }> {
    const { data } = await api.post(`/study/decks/from-lesson/${slug}`);
    return data;
  },
  async addCard(input: { deck: string; front: string; back: string }): Promise<void> {
    await api.post("/study/cards", input);
  },
  async due(deck?: string): Promise<ReviewCard[]> {
    const { data } = await api.get<{ cards: ReviewCard[] }>("/study/review", { params: deck ? { deck } : {} });
    return data.cards;
  },
  async review(id: string, quality: number): Promise<void> {
    await api.post(`/study/cards/${id}/review`, { quality });
  },
  async formulas(): Promise<FormulaGroup[]> {
    const { data } = await api.get<{ groups: FormulaGroup[] }>("/study/formulas");
    return data.groups;
  },
  async starFormula(ref: string): Promise<boolean> {
    const { data } = await api.post<{ starred: boolean }>("/study/formulas/star", { ref });
    return data.starred;
  },
};
