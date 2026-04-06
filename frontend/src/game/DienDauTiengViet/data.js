export const QUESTION_BANK = [
  { id: 'ddtv-01', plainWord: 'me', correctAnswer: 'mẹ', options: ['mẹ', 'mé', 'mè'], level: 1, topic: 'family' },
  { id: 'ddtv-02', plainWord: 'ba', correctAnswer: 'bà', options: ['bà', 'bá', 'bạ'], level: 1, topic: 'family' },
  { id: 'ddtv-03', plainWord: 'ca', correctAnswer: 'cá', options: ['cà', 'cá', 'cạ'], level: 1, topic: 'animal' },
  { id: 'ddtv-04', plainWord: 'ga', correctAnswer: 'gà', options: ['gá', 'gà', 'gạ'], level: 1, topic: 'animal' },
  { id: 'ddtv-05', plainWord: 'de', correctAnswer: 'dê', options: ['dè', 'dê', 'dé'], level: 1, topic: 'animal' },
  { id: 'ddtv-06', plainWord: 'tho', correctAnswer: 'thỏ', options: ['thó', 'thỏ', 'thọ'], level: 1, topic: 'animal' },
  { id: 'ddtv-07', plainWord: 've', correctAnswer: 'vé', options: ['vè', 'vé', 'vẽ'], level: 2, topic: 'daily-life' },
  { id: 'ddtv-08', plainWord: 'co', correctAnswer: 'cô', options: ['cò', 'có', 'cô', 'cỏ'], level: 2, topic: 'school' },
  { id: 'ddtv-09', plainWord: 'dua', correctAnswer: 'dừa', options: ['dừa', 'dứa', 'dưa', 'dủa'], level: 2, topic: 'food' },
  { id: 'ddtv-10', plainWord: 'mia', correctAnswer: 'mía', options: ['mía', 'mìa', 'mỉa'], level: 2, topic: 'food' },
  { id: 'ddtv-11', plainWord: 'lua', correctAnswer: 'lúa', options: ['lụa', 'lưa', 'lúa'], level: 2, topic: 'nature' },
  { id: 'ddtv-12', plainWord: 'banh', correctAnswer: 'bánh', options: ['bánh', 'bành', 'bảnh', 'bạnh'], level: 2, topic: 'food' },
  { id: 'ddtv-13', plainWord: 'rua', correctAnswer: 'rùa', options: ['rứa', 'rùa', 'rửa'], level: 2, topic: 'animal' },
  { id: 'ddtv-14', plainWord: 'buom', correctAnswer: 'bướm', options: ['bướm', 'buồm', 'bườm', 'bướp'], level: 3, topic: 'animal' },
  { id: 'ddtv-15', plainWord: 'suoi', correctAnswer: 'suối', options: ['suối', 'suồi', 'suổi', 'suỗi'], level: 3, topic: 'nature' },
  { id: 'ddtv-16', plainWord: 'truong', correctAnswer: 'trường', options: ['trường', 'trưởng', 'trượng', 'trương'], level: 3, topic: 'school' },
  { id: 'ddtv-17', plainWord: 'vuon', correctAnswer: 'vườn', options: ['vườn', 'vươn', 'vưỡn', 'vườm'], level: 3, topic: 'nature' },
  { id: 'ddtv-18', plainWord: 'muoi', correctAnswer: 'muỗi', options: ['muối', 'muỗi', 'muội', 'muồi'], level: 3, topic: 'animal' },
  { id: 'ddtv-19', plainWord: 'cua', correctAnswer: 'của', options: ['của', 'cưa', 'cùa', 'cứa'], level: 3, topic: 'language' },
  { id: 'ddtv-20', plainWord: 'bien', correctAnswer: 'biển', options: ['biên', 'biển', 'biện', 'bển'], level: 3, topic: 'nature' },
];

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleByLevel(level, count, usedIds) {
  const pool = QUESTION_BANK.filter((item) => item.level === level && !usedIds.has(item.id));
  return shuffle(pool).slice(0, count).map((item) => ({
    ...item,
    options: shuffle(item.options),
  }));
}

export function buildSession() {
  const usedIds = new Set();
  const plan = [[1, 3], [2, 4], [3, 3]];
  const questions = [];

  plan.forEach(([level, count]) => {
    const picked = sampleByLevel(level, count, usedIds);
    picked.forEach((item) => {
      usedIds.add(item.id);
      questions.push(item);
    });
  });

  return questions;
}
