/**
 * translations.js
 * 7 ngôn ngữ: Tiếng Việt, English, 中文, 한국어, 日本語, Español, Français
 */

export const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'zh', label: '中文',        flag: '🇨🇳' },
  { code: 'ko', label: '한국어',       flag: '🇰🇷' },
  { code: 'ja', label: '日本語',       flag: '🇯🇵' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
];

export const translations = {
  // ─── DevRoleBar ──────────────────────────────────────────────────────────────
  'dev.prototype':    { vi:'PROTOTYPE — Xem vai:',   en:'PROTOTYPE — View as:',    zh:'原型 — 切换角色:',   ko:'프로토타입 — 역할 보기:', ja:'プロトタイプ — ロール表示:', es:'PROTOTIPO — Ver como:', fr:'PROTOTYPE — Voir en tant que:' },
  'role.student':     { vi:'🎮 Học sinh',             en:'🎮 Student',               zh:'🎮 学生',            ko:'🎮 학생',                ja:'🎮 生徒',                   es:'🎮 Estudiante',          fr:'🎮 Élève'          },
  'role.teacher':     { vi:'📋 Giáo viên',            en:'📋 Teacher',               zh:'📋 教师',            ko:'📋 선생님',              ja:'📋 先生',                   es:'📋 Profesor',            fr:'📋 Professeur'     },
  'role.parent':      { vi:'👨‍👩‍👧 Phụ huynh',         en:'👨‍👩‍👧 Parent',             zh:'👨‍👩‍👧 家长',          ko:'👨‍👩‍👧 학부모',           ja:'👨‍👩‍👧 保護者',              es:'👨‍👩‍👧 Padre/Madre',      fr:'👨‍👩‍👧 Parent'        },

  // ─── StudentHome ─────────────────────────────────────────────────────────────
  'home.greeting':    { vi:'Xin chào, {name}!',      en:'Hello, {name}!',           zh:'你好，{name}！',      ko:'안녕하세요, {name}!',    ja:'こんにちは、{name}さん！',  es:'¡Hola, {name}!',        fr:'Bonjour, {name} !' },
  'home.subtitle':    { vi:'Chọn game để bắt đầu học',en:'Choose a game to start learning', zh:'选择游戏开始学习', ko:'게임을 선택하여 시작하세요', ja:'ゲームを選んで学ぼう',    es:'Elige un juego para aprender', fr:'Choisissez un jeu pour apprendre' },
  'home.noGames':     { vi:'Không có game nào cho môn này.', en:'No games for this subject.', zh:'该科目暂无游戏。', ko:'이 과목에 게임이 없습니다.', ja:'このカテゴリにゲームがありません。', es:'No hay juegos para esta asignatura.', fr:'Aucun jeu pour cette matière.' },

  // ─── Subject filters ─────────────────────────────────────────────────────────
  'subject.all':      { vi:'Tất cả',    en:'All',       zh:'全部',   ko:'전체',   ja:'すべて',  es:'Todos',   fr:'Tous'      },
  'subject.math':     { vi:'Toán',      en:'Math',      zh:'数学',   ko:'수학',   ja:'算数',    es:'Matemáticas', fr:'Maths'  },
  'subject.logic':    { vi:'Tư duy',    en:'Logic',     zh:'逻辑',   ko:'논리',   ja:'論理',    es:'Lógica',  fr:'Logique'   },
  'subject.vietnamese':{ vi:'Tiếng Việt',en:'Vietnamese',zh:'越南语', ko:'베트남어',ja:'ベトナム語',es:'Vietnamita',fr:'Vietnamien' },
  'subject.science':  { vi:'Khoa học',  en:'Science',   zh:'科学',   ko:'과학',   ja:'理科',    es:'Ciencias',fr:'Sciences'  },

  // ─── Game card ───────────────────────────────────────────────────────────────
  'game.playNow':     { vi:'Chơi ngay →',  en:'Play now →',    zh:'立即游戏 →', ko:'지금 플레이 →', ja:'今すぐプレイ →', es:'Jugar ahora →', fr:'Jouer →'       },
  'game.comingSoon':  { vi:'Sắp ra mắt',   en:'Coming soon',   zh:'即将推出',   ko:'출시 예정',     ja:'近日公開',       es:'Próximamente',  fr:'Bientôt'       },
  'game.playable':    { vi:'✦ Chơi được',  en:'✦ Playable',    zh:'✦ 可玩',     ko:'✦ 플레이 가능', ja:'✦ プレイ可能',   es:'✦ Jugable',     fr:'✦ Jouable'     },
  'game.notFound':    { vi:'Game chưa được tích hợp.', en:'Game not integrated yet.', zh:'游戏尚未集成。', ko:'게임이 아직 통합되지 않았습니다.', ja:'ゲームはまだ統合されていません。', es:'El juego aún no está integrado.', fr:'Le jeu n\'est pas encore intégré.' },
  'game.backHome':    { vi:'← Về trang chủ', en:'← Back to home', zh:'← 返回主页', ko:'← 홈으로',      ja:'← ホームへ',     es:'← Volver al inicio', fr:'← Accueil'  },

  // ─── Banners ─────────────────────────────────────────────────────────────────
  'banner.offline':   { vi:'Bạn đang offline. Tiến trình sẽ được đồng bộ khi có mạng.', en:'You are offline. Progress will sync when reconnected.', zh:'您已离线，联网后将自动同步进度。', ko:'오프라인 상태입니다. 연결되면 동기화됩니다.', ja:'オフラインです。接続後に同期されます。', es:'Estás sin conexión. El progreso se sincronizará al reconectar.', fr:'Vous êtes hors ligne. La progression sera synchronisée dès la reconnexion.' },
  'banner.syncing':   { vi:'Đang đồng bộ dữ liệu...', en:'Syncing data...', zh:'正在同步数据...', ko:'데이터 동기화 중...', ja:'データを同期中...', es:'Sincronizando datos...', fr:'Synchronisation en cours...' },

  // ─── Teacher dashboard ───────────────────────────────────────────────────────
  'teacher.title':    { vi:'Dashboard Giáo viên', en:'Teacher Dashboard', zh:'教师控制台', ko:'교사 대시보드', ja:'教師ダッシュボード', es:'Panel del Profesor', fr:'Tableau de bord Professeur' },
  'teacher.tabAssign':{ vi:'Giao bài tập',        en:'Assign Tasks',      zh:'布置作业',   ko:'과제 배정',     ja:'課題を配布',         es:'Asignar tareas',    fr:'Assigner des tâches' },
  'teacher.tabReport':{ vi:'Báo cáo',             en:'Reports',           zh:'报告',       ko:'보고서',        ja:'レポート',           es:'Informes',          fr:'Rapports'    },
  'teacher.newTask':  { vi:'Giao bài tập mới',    en:'New Assignment',    zh:'新建作业',   ko:'새 과제',       ja:'新しい課題',         es:'Nueva tarea',       fr:'Nouvelle tâche' },
  'teacher.inputTitle':{ vi:'Tiêu đề bài tập:',  en:'Assignment title:', zh:'作业标题：', ko:'과제 제목:',    ja:'課題タイトル:',       es:'Título de tarea:',  fr:'Titre de la tâche :' },
  'teacher.selectGame':{ vi:'Chọn game:',         en:'Select game:',      zh:'选择游戏：', ko:'게임 선택:',    ja:'ゲームを選択:',       es:'Seleccionar juego:',fr:'Choisir le jeu :' },
  'teacher.classId':  { vi:'Mã lớp:',             en:'Class ID:',         zh:'班级编号：', ko:'반 코드:',      ja:'クラスID:',          es:'ID de clase:',      fr:'ID de classe :' },
  'teacher.dueDate':  { vi:'Hạn nộp:',            en:'Due date:',         zh:'截止日期：', ko:'마감일:',       ja:'提出期限:',           es:'Fecha límite:',     fr:'Date limite :' },
  'teacher.btnAssign':{ vi:'Giao bài',             en:'Assign',            zh:'布置',       ko:'배정',          ja:'配布する',           es:'Asignar',           fr:'Assigner'    },
  'teacher.assigning':{ vi:'Đang lưu...',          en:'Saving...',         zh:'保存中...',  ko:'저장 중...',    ja:'保存中...',           es:'Guardando...',      fr:'Enregistrement...' },
  'teacher.assigned': { vi:'Giao bài thành công!',en:'Assigned successfully!', zh:'布置成功！', ko:'배정 완료!', ja:'配布しました！',     es:'¡Asignado con éxito!', fr:'Tâche assignée !' },
  'teacher.assigned_list': { vi:'Bài tập đã giao',en:'Assigned tasks',   zh:'已布置作业', ko:'배정된 과제',   ja:'配布済み課題',        es:'Tareas asignadas',  fr:'Tâches assignées' },
  'teacher.viewReport':{ vi:'Xem báo cáo',        en:'View report',       zh:'查看报告',   ko:'보고서 보기',   ja:'レポートを見る',      es:'Ver informe',       fr:'Voir le rapport' },
  'teacher.noReport': { vi:'Chọn một bài tập để xem báo cáo.', en:'Select an assignment to view its report.', zh:'请选择作业查看报告。', ko:'과제를 선택하여 보고서를 보세요.', ja:'課題を選択してレポートを表示してください。', es:'Selecciona una tarea para ver el informe.', fr:'Sélectionnez une tâche pour afficher le rapport.' },
  'teacher.reportTitle':{ vi:'Báo cáo kết quả học sinh', en:'Student Results Report', zh:'学生成绩报告', ko:'학생 결과 보고서', ja:'生徒の成績レポート', es:'Informe de resultados', fr:'Rapport de résultats' },

  // ─── Table headers ───────────────────────────────────────────────────────────
  'col.title':        { vi:'Tiêu đề',   en:'Title',     zh:'标题',   ko:'제목',   ja:'タイトル',  es:'Título',   fr:'Titre'     },
  'col.game':         { vi:'Game',      en:'Game',      zh:'游戏',   ko:'게임',   ja:'ゲーム',    es:'Juego',    fr:'Jeu'       },
  'col.class':        { vi:'Lớp',       en:'Class',     zh:'班级',   ko:'반',     ja:'クラス',    es:'Clase',    fr:'Classe'    },
  'col.due':          { vi:'Hạn nộp',   en:'Due',       zh:'截止',   ko:'마감',   ja:'期限',      es:'Vence',    fr:'Échéance'  },
  'col.student':      { vi:'Học sinh',  en:'Student',   zh:'学生',   ko:'학생',   ja:'生徒',      es:'Alumno',   fr:'Élève'     },
  'col.status':       { vi:'Trạng thái',en:'Status',    zh:'状态',   ko:'상태',   ja:'ステータス',es:'Estado',   fr:'Statut'    },
  'col.score':        { vi:'Điểm',      en:'Score',     zh:'得分',   ko:'점수',   ja:'スコア',    es:'Puntaje',  fr:'Score'     },
  'col.correct':      { vi:'Câu đúng',  en:'Correct',   zh:'答对',   ko:'정답',   ja:'正解',      es:'Correctas',fr:'Correctes' },
  'col.wrong':        { vi:'Câu sai',   en:'Wrong',     zh:'答错',   ko:'오답',   ja:'不正解',    es:'Incorrectas',fr:'Incorrectes' },
  'col.duration':     { vi:'Thời gian (giây)', en:'Duration (s)', zh:'用时(秒)', ko:'소요 시간(초)', ja:'時間(秒)', es:'Duración (s)', fr:'Durée (s)' },
  'status.done':      { vi:'Hoàn thành',en:'Completed', zh:'已完成', ko:'완료',   ja:'完了',      es:'Completado',fr:'Terminé'  },
  'status.pending':   { vi:'Chưa làm',  en:'Pending',   zh:'未完成', ko:'미완료', ja:'未完了',    es:'Pendiente',fr:'En attente' },

  // ─── Parent dashboard ────────────────────────────────────────────────────────
  'parent.title':     { vi:'Tiến độ học tập của con', en:"Child's Learning Progress", zh:'孩子的学习进度', ko:'아이 학습 진도', ja:'お子様の学習進捗', es:'Progreso del Aprendizaje', fr:'Progrès d\'apprentissage' },
  'parent.onlineTime':{ vi:'Thời gian online tuần này', en:'Online time this week', zh:'本周在线时间', ko:'이번 주 온라인 시간', ja:'今週のオンライン時間', es:'Tiempo en línea esta semana', fr:'Temps en ligne cette semaine' },
  'parent.gamesPlayed':{ vi:'Game đã chơi tuần này', en:'Games played this week', zh:'本周游戏次数', ko:'이번 주 플레이 게임', ja:'今週のプレイ回数', es:'Juegos jugados esta semana', fr:'Jeux joués cette semaine' },
  'parent.avgScore':  { vi:'Điểm trung bình', en:'Average score', zh:'平均分', ko:'평균 점수', ja:'平均スコア', es:'Puntaje promedio', fr:'Score moyen' },
  'parent.assignments':{ vi:'Bài tập hoàn thành', en:'Assignments completed', zh:'作业完成情况', ko:'완료된 과제', ja:'課題の完了状況', es:'Tareas completadas', fr:'Devoirs terminés' },
  'parent.weeklyTitle':{ vi:'Tiến độ môn học 7 ngày qua', en:'Subject progress (last 7 days)', zh:'过去7天各科进度', ko:'최근 7일 과목별 진도', ja:'過去7日間の科目別進捗', es:'Progreso por materia (7 días)', fr:'Progression par matière (7 jours)' },
  'parent.noData':    { vi:'Chưa có dữ liệu trong tuần này.', en:'No data for this week.', zh:'本周暂无数据。', ko:'이번 주 데이터가 없습니다.', ja:'今週のデータはありません。', es:'Sin datos esta semana.', fr:'Pas de données cette semaine.' },
  'col.subject':      { vi:'Môn học',   en:'Subject',   zh:'科目',   ko:'과목',   ja:'科目',      es:'Asignatura',fr:'Matière'   },
  'col.sessions':     { vi:'Số lần chơi',en:'Sessions', zh:'游戏次数',ko:'세션 수', ja:'プレイ回数', es:'Sesiones', fr:'Sessions'  },
  'col.totalTime':    { vi:'Tổng thời gian', en:'Total time', zh:'总时间', ko:'총 시간', ja:'総時間', es:'Tiempo total', fr:'Temps total' },
  'col.avgScore':     { vi:'Điểm TB',   en:'Avg score', zh:'平均分',  ko:'평균 점수',ja:'平均点',   es:'Prom.',    fr:'Moy.'      },
  'col.trend':        { vi:'Xu hướng',  en:'Trend',     zh:'趋势',   ko:'추세',   ja:'傾向',      es:'Tendencia',fr:'Tendance'  },
  'trend.up':         { vi:'↑ Tốt hơn',en:'↑ Improving',zh:'↑ 进步', ko:'↑ 향상', ja:'↑ 向上中',  es:'↑ Mejorando',fr:'↑ En progrès' },
  'trend.down':       { vi:'↓ Cần cải thiện', en:'↓ Needs work', zh:'↓ 需改进', ko:'↓ 개선 필요', ja:'↓ 要改善', es:'↓ Necesita mejorar', fr:'↓ À améliorer' },
  'trend.stable':     { vi:'→ Ổn định', en:'→ Stable',  zh:'→ 稳定', ko:'→ 안정',  ja:'→ 安定',    es:'→ Estable', fr:'→ Stable'  },

  // ─── 2048 ────────────────────────────────────────────────────────────────────
  '2048.hint':        { vi:'Dùng phím mũi tên hoặc vuốt để chơi', en:'Use arrow keys or swipe to play', zh:'使用方向键或滑动来玩', ko:'방향키 또는 스와이프로 플레이하세요', ja:'矢印キーまたはスワイプで操作', es:'Usa las teclas de flecha o desliza', fr:'Utilisez les flèches ou glissez' },
  '2048.score':       { vi:'ĐIỂM',       en:'SCORE',   zh:'得分',   ko:'점수',   ja:'スコア',  es:'PUNTOS',  fr:'SCORE'   },
  '2048.best':        { vi:'CAO NHẤT',   en:'BEST',    zh:'最高分', ko:'최고점', ja:'ベスト',  es:'MEJOR',   fr:'MEILLEUR'},
  '2048.back':        { vi:'← Quay lại',en:'← Back',  zh:'← 返回', ko:'← 뒤로',ja:'← 戻る',  es:'← Volver',fr:'← Retour'},
  '2048.restart':     { vi:'Chơi lại',   en:'Restart', zh:'重新开始',ko:'다시시작',ja:'もう一度',es:'Reiniciar',fr:'Recommencer'},
  '2048.won':         { vi:'🎉 Thắng rồi!', en:'🎉 You won!', zh:'🎉 你赢了！', ko:'🎉 승리!', ja:'🎉 クリア！', es:'🎉 ¡Ganaste!', fr:'🎉 Gagné !' },
  '2048.lost':        { vi:'😢 Thua rồi!',  en:'😢 Game over!',zh:'😢 游戏结束！',ko:'😢 게임 오버!',ja:'😢 ゲームオーバー！',es:'😢 ¡Perdiste!',fr:'😢 Perdu !' },
  '2048.score_label': { vi:'Điểm:',      en:'Score:',  zh:'得分：', ko:'점수:',  ja:'スコア：',es:'Puntos:',  fr:'Score :'  },

  // ─── TicTacToe ───────────────────────────────────────────────────────────────
  'ttt.you':          { vi:'Bạn (X)',    en:'You (X)',  zh:'你 (X)',  ko:'나 (X)', ja:'あなた(X)',es:'Tú (X)',   fr:'Vous (X)' },
  'ttt.draw':         { vi:'Hòa',        en:'Draw',     zh:'平局',   ko:'무승부', ja:'引き分け', es:'Empate',   fr:'Égalité'  },
  'ttt.ai':           { vi:'AI (O)',      en:'AI (O)',   zh:'AI (O)', ko:'AI (O)', ja:'AI (O)',   es:'IA (O)',   fr:'IA (O)'   },
  'ttt.yourTurn':     { vi:'👆 Lượt của bạn (X)', en:'👆 Your turn (X)', zh:'👆 轮到你了 (X)', ko:'👆 당신의 차례 (X)', ja:'👆 あなたの番 (X)', es:'👆 Tu turno (X)', fr:'👆 Votre tour (X)' },
  'ttt.aiThinking':   { vi:'⏳ AI đang nghĩ...', en:'⏳ AI thinking...', zh:'⏳ AI思考中...', ko:'⏳ AI 생각 중...', ja:'⏳ AI考え中...', es:'⏳ IA pensando...', fr:'⏳ IA réfléchit...' },
  'ttt.youWin':       { vi:'🎉 Bạn thắng!', en:'🎉 You win!', zh:'🎉 你赢了！', ko:'🎉 당신이 이겼어요!', ja:'🎉 あなたの勝ち！', es:'🎉 ¡Ganaste!', fr:'🎉 Vous gagnez !' },
  'ttt.aiWin':        { vi:'🤖 AI thắng!', en:'🤖 AI wins!', zh:'🤖 AI获胜！', ko:'🤖 AI가 이겼어요!', ja:'🤖 AIの勝ち！', es:'🤖 ¡Ganó la IA!', fr:'🤖 L\'IA gagne !' },
  'ttt.drawMsg':      { vi:'🤝 Hòa!',      en:'🤝 Draw!',    zh:'🤝 平局！',  ko:'🤝 무승부!',    ja:'🤝 引き分け！',  es:'🤝 ¡Empate!',    fr:'🤝 Égalité !' },
  'ttt.newGame':      { vi:'Ván mới',      en:'New game',    zh:'新一局',    ko:'새 게임',       ja:'新しいゲーム',   es:'Nueva partida',  fr:'Nouvelle partie' },
  'ttt.back':         { vi:'← Quay lại',  en:'← Back',      zh:'← 返回',    ko:'← 뒤로',       ja:'← 戻る',         es:'← Volver',       fr:'← Retour'  },
};

/** Tra cứu bản dịch, fallback về tiếng Anh → key nếu thiếu */
export function translate(key, lang, vars = {}) {
  const entry = translations[key];
  if (!entry) return key;
  let str = entry[lang] || entry['en'] || key;
  // Thay biến: {name} → value
  Object.entries(vars).forEach(([k, v]) => {
    str = str.replace(`{${k}}`, v);
  });
  return str;
}
