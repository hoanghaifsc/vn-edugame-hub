export const QUESTION_BANK = [
  { id: 1, left: 2, right: 5, answer: '<', explain: '2 bé hơn 5 nên chọn dấu <.', level: 1 },
  { id: 2, left: 7, right: 3, answer: '>', explain: '7 lớn hơn 3 nên chọn dấu >.', level: 1 },
  { id: 3, left: 4, right: 4, answer: '=', explain: 'Hai số bằng nhau nên chọn dấu =.', level: 1 },
  { id: 4, left: 9, right: 6, answer: '>', explain: '9 lớn hơn 6 nên chọn dấu >.', level: 1 },
  { id: 5, left: 1, right: 8, answer: '<', explain: '1 bé hơn 8 nên chọn dấu <.', level: 1 },
  { id: 6, left: 10, right: 10, answer: '=', explain: '10 bằng 10 nên chọn dấu =.', level: 1 },
  { id: 7, left: 12, right: 18, answer: '<', explain: '12 bé hơn 18 nên chọn dấu <.', level: 2 },
  { id: 8, left: 25, right: 14, answer: '>', explain: '25 lớn hơn 14 nên chọn dấu >.', level: 2 },
  { id: 9, left: 33, right: 33, answer: '=', explain: '33 bằng 33 nên chọn dấu =.', level: 2 },
  { id: 10, left: 47, right: 52, answer: '<', explain: '47 bé hơn 52 nên chọn dấu <.', level: 2 },
  { id: 11, left: 68, right: 61, answer: '>', explain: '68 lớn hơn 61 nên chọn dấu >.', level: 2 },
  { id: 12, left: 70, right: 70, answer: '=', explain: '70 bằng 70 nên chọn dấu =.', level: 2 },
  { id: 13, left: 105, right: 99, answer: '>', explain: '105 lớn hơn 99 nên chọn dấu >.', level: 3 },
  { id: 14, left: 120, right: 145, answer: '<', explain: '120 bé hơn 145 nên chọn dấu <.', level: 3 },
  { id: 15, left: 300, right: 300, answer: '=', explain: '300 bằng 300 nên chọn dấu =.', level: 3 },
  { id: 16, left: 512, right: 498, answer: '>', explain: '512 lớn hơn 498 nên chọn dấu >.', level: 3 },
  { id: 17, left: 640, right: 702, answer: '<', explain: '640 bé hơn 702 nên chọn dấu <.', level: 3 },
  { id: 18, left: 888, right: 888, answer: '=', explain: '888 bằng 888 nên chọn dấu =.', level: 3 },
  { id: 19, left: 91, right: 19, answer: '>', explain: '91 lớn hơn 19 nên chọn dấu >.', level: 2 },
  { id: 20, left: 206, right: 260, answer: '<', explain: '206 bé hơn 260 nên chọn dấu <.', level: 3 },
];

export function getQuestionsByLevel(level) {
  return QUESTION_BANK.filter((item) => item.level === level);
}

export function getQuestion(level, usedIds = []) {
  const pool = getQuestionsByLevel(level).filter((item) => !usedIds.includes(item.id));
  const source = pool.length ? pool : getQuestionsByLevel(level);
  return source[Math.floor(Math.random() * source.length)];
}
