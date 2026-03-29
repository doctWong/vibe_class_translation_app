export interface Translation {
  id: string;
  user_id: string;
  source_text: string;
  target_text: string;
  source_lang: string;
  target_lang: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export interface TranslationResponse {
  success: boolean;
  data?: {
    translation: string;
    sourceLang: string;
    targetLang: string;
  };
  error?: string;
}

export interface HistoryResponse {
  success: boolean;
  data?: {
    items: Translation[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}