import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { translateText } from '@/lib/translation';

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const translatedText = await translateText(text, sourceLang, targetLang);

    const { error: dbError } = await supabase.from('translations').insert({
      user_id: user.id,
      source_text: text,
      target_text: translatedText,
      source_lang: sourceLang,
      target_lang: targetLang,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save translation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        translation: translatedText,
        sourceLang,
        targetLang,
      },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}