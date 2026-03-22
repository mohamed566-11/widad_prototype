const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

function getLocalFallbackReply(prompt: string): string {
  const text = prompt.trim()
  const lower = text.toLowerCase()

  if (lower.includes('دورة') || lower.includes('period')) {
    return 'للدورة الشهرية: تابعي مواعيد البداية والنهاية، وشدة الألم، والأعراض المصاحبة. إذا كان النزيف شديدًا جدًا أو الدورة غير منتظمة لفترات طويلة، يُفضّل مراجعة طبيبة نساء.'
  }

  if (lower.includes('حمل') || lower.includes('pregnan')) {
    return 'في الحمل: اهتمي بالتغذية المتوازنة، شرب الماء، النوم الجيد، والمتابعة الدورية مع الطبيبة. أي ألم شديد، نزيف، أو صداع مستمر يستدعي تواصلًا طبيًا سريعًا.'
  }

  if (lower.includes('خصوبة') || lower.includes('fertility')) {
    return 'لدعم الخصوبة: نظمي النوم، خففي التوتر، تابعي أيام الإباضة، واهتمي بالغذاء الصحي. إذا تأخر الحمل لفترة مناسبة، يفضل تقييم طبي متخصص.'
  }

  return 'أنا هنا لمساعدتك بمعلومات صحية عامة للمرأة. اذكري سؤالك بشكل أدق (مثل: الدورة، الحمل، الخصوبة، التغذية) وسأعطيك خطوات أوضح. للتشخيص النهائي راجعي الطبيبة المختصة.'
}

export async function askGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    return getLocalFallbackReply(prompt)
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 500,
        },
      }),
    })

    if (!response.ok) {
      return getLocalFallbackReply(prompt)
    }

    const data = await response.json()
    const parts = data?.candidates?.[0]?.content?.parts

    if (!Array.isArray(parts)) {
      return getLocalFallbackReply(prompt)
    }

    const text = parts
      .map((part: any) => part?.text)
      .filter(Boolean)
      .join('\n')
      .trim()

    if (!text) {
      return getLocalFallbackReply(prompt)
    }

    return text
  } catch {
    return getLocalFallbackReply(prompt)
  }
}
