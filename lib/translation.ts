interface MyMemoryResponse {
  responseStatus: number;
  responseData: {
    translatedText: string;
  };
  responseDetails?: string;
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const langpair = `${sourceLang}|${targetLang}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`MyMemory API error: ${response.status}`);
  }

  const data: MyMemoryResponse = await response.json();

  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'Translation failed');
  }

  return data.responseData.translatedText;
}