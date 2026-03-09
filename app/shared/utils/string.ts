export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    // إزالة التشكيل (الحركات)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // إزالة التطويل (الكشيدة)
    .replace(/ـ/g, '')
    // توحيد أشكال الألف
    .replace(/[أإآا]/g, 'ا')
    // توحيد الهمزات على الواو والياء والسطر (كمقاربة مرنة)
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي')
    // توحيد التاء المربوطة والهاء
    .replace(/[ةه]/g, 'ه')
    // توحيد الياء والألف المقصورة
    .replace(/[يى]/g, 'ي');
}

export function toDomSafeId(value: string, prefix: string = 'id'): string {
  const normalized = value.trim();
  if (!normalized) return prefix;

  const safeBody = Array.from(normalized)
    .map((char) => {
      if (/[a-z0-9]/i.test(char)) {
        return char.toLowerCase();
      }

      if (/\s/.test(char)) {
        return '-';
      }

      return char.codePointAt(0)?.toString(16) ?? '';
    })
    .join('')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${prefix}-${safeBody || 'section'}`;
}
