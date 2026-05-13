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
  'game.grade':       { vi:'Lớp',          en:'Grade',         zh:'年级',          ko:'학년',          ja:'学年',           es:'Grado',           fr:'Classe'          },
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

  // ─── Game titles & descriptions ──────────────────────────────────────────────
  'game.game-2048.title':       { vi:'2048',                          en:'2048',                          zh:'2048',                     ko:'2048',                      ja:'2048',                          es:'2048',                        fr:'2048'                        },
  'game.game-2048.desc':        { vi:'Gộp các ô số để đạt 2048. Luyện tư duy logic và tính nhẩm.', en:'Merge tiles to reach 2048. Train logical thinking and mental math.', zh:'合并方块达到2048，锻炼逻辑思维和心算。', ko:'타일을 합쳐 2048을 만들어 보세요. 논리 사고와 암산을 훈련합니다.', ja:'タイルを合わせて2048を目指そう。論理的思考と暗算を鍛えます。', es:'Combina fichas para llegar a 2048. Entrena el pensamiento lógico y el cálculo mental.', fr:'Fusionnez les tuiles pour atteindre 2048. Entraîne la logique et le calcul mental.' },
  'game.tic-tac-toe.title':     { vi:'Tic Tac Toe',                   en:'Tic Tac Toe',                   zh:'井字棋',                   ko:'틱택토',                     ja:'三目並べ',                       es:'Tres en Raya',                fr:'Morpion'                     },
  'game.tic-tac-toe.desc':      { vi:'Đánh cờ ca-rô 3×3 với AI. Rèn tư duy chiến thuật.', en:'Play 3×3 against AI. Train tactical thinking.', zh:'与AI对战井字棋，培养战术思维。', ko:'AI와 3×3 게임 대결. 전술적 사고를 훈련합니다.', ja:'AIと3×3の対戦。戦術的思考を鍛えます。', es:'Juega 3×3 contra la IA. Entrena el pensamiento táctico.', fr:'Jouez 3×3 contre l\'IA. Entraîne la réflexion tactique.' },
  'game.o-an-quan-math.title':  { vi:'Ô Ăn Quan — Toán Cơ Bản',      en:'Ô Ăn Quan — Basic Math',        zh:'Ô Ăn Quan — 基础数学',      ko:'오안꽌 — 기초 수학',           ja:'オアンクアン — 基礎算数',        es:'Ô Ăn Quan — Matemáticas Básicas', fr:'Ô Ăn Quan — Maths de base'  },
  'game.o-an-quan-math.desc':   { vi:'Học cộng, trừ, nhân, chia qua game Ô Ăn Quan truyền thống.', en:'Learn addition, subtraction, multiplication and division through the traditional Ô Ăn Quan game.', zh:'通过传统的Ô Ăn Quan游戏学习加减乘除。', ko:'전통 오안꽌 게임으로 덧셈, 뺄셈, 곱셈, 나눗셈을 배웁니다.', ja:'伝統的なオアンクアンゲームで四則演算を学びます。', es:'Aprende suma, resta, multiplicación y división a través del juego tradicional Ô Ăn Quan.', fr:'Apprends les 4 opérations à travers le jeu traditionnel Ô Ăn Quan.' },
  // ─── WordQuizVi ──────────────────────────────────────────────────────────────
  'wqv.restart':      { vi:'Chơi lại',       en:'Restart',         zh:'重新开始',  ko:'다시 시작',  ja:'もう一度',    es:'Reiniciar',    fr:'Recommencer' },
  'wqv.next':         { vi:'Câu tiếp →',     en:'Next →',          zh:'下一题 →',  ko:'다음 →',    ja:'次へ →',      es:'Siguiente →',  fr:'Suivant →'   },
  'wqv.result':       { vi:'Xem kết quả →',  en:'See results →',   zh:'查看结果 →',ko:'결과 보기 →',ja:'結果を見る →', es:'Ver resultados →', fr:'Voir résultats →' },
  'wqv.score':        { vi:'Điểm',           en:'Score',           zh:'得分',      ko:'점수',       ja:'スコア',      es:'Puntos',       fr:'Score'       },
  'wqv.question':     { vi:'Câu',            en:'Question',        zh:'题',        ko:'문제',       ja:'問題',        es:'Pregunta',     fr:'Question'    },
  'wqv.correct':      { vi:'✅ Chính xác!',  en:'✅ Correct!',     zh:'✅ 正确！', ko:'✅ 정답!',  ja:'✅ 正解！',   es:'✅ ¡Correcto!',fr:'✅ Correct !' },
  'wqv.wrong':        { vi:'❌ Chưa đúng.',  en:'❌ Not quite.',   zh:'❌ 不对。', ko:'❌ 틀렸어요.',ja:'❌ 不正解。',  es:'❌ No es eso.',fr:'❌ Pas tout à fait.' },
  'wqv.back':         { vi:'← Quay lại',     en:'← Back',          zh:'← 返回',   ko:'← 뒤로',    ja:'← 戻る',      es:'← Volver',     fr:'← Retour'    },
  'game.word-quiz-vi.title':    { vi:'Đố Chữ Tiếng Việt',             en:'Vietnamese Word Quiz',          zh:'越南语单词测验',             ko:'베트남어 단어 퀴즈',           ja:'ベトナム語単語クイズ',           es:'Quiz de Vocabulario Vietnamita',fr:'Quiz de Mots Vietnamiens'    },
  'game.word-quiz-vi.desc':     { vi:'Ôn tập từ vựng và chính tả Tiếng Việt qua câu đố vui.', en:'Practice Vietnamese vocabulary and spelling through fun quizzes.', zh:'通过趣味测验练习越南语词汇和拼写。', ko:'재미있는 퀴즈로 베트남어 어휘와 맞춤법을 연습합니다.', ja:'楽しいクイズでベトナム語の語彙とスペルを練習します。', es:'Practica vocabulario y ortografía vietnamita con divertidos juegos.', fr:'Entraîne-toi en vocabulaire et orthographe vietnamiens.' },
  'game.dien-dau-tieng-viet.title': { vi:'Điền Dấu Tiếng Việt',      en:'Vietnamese Tone Marks',         zh:'越南语声调填空',               ko:'베트남어 성조 채우기',          ja:'ベトナム語の声調あて',            es:'Acentos del Vietnamita',       fr:'Accents du Vietnamien'       },
  'game.dien-dau-tieng-viet.desc':  { vi:'Chọn từ có dấu đúng từ dạng không dấu. Luyện chính tả và đọc hiểu cho lớp 1-2.', en:'Choose the correctly accented Vietnamese word from its plain form. Practice spelling and reading for grades 1-2.', zh:'从无声调形式中选择正确的越南语词语，练习拼写和阅读。', ko:'성조가 없는 형태에서 올바른 베트남어 단어를 고르며 맞춤법과 읽기를 연습해요.', ja:'声調のない語形から正しいベトナム語を選び、つづりと読解を練習します。', es:'Elige la palabra vietnamita con acentos correctos. Practica ortografía y lectura para 1.º-2.º.', fr:'Choisis le mot vietnamien avec les bons accents. Exerce l’orthographe et la lecture du CP au CE1.' },
  'game.math-compare.title':    { vi:'So Sánh Số',                   en:'Number Compare',                zh:'数字比较',                   ko:'숫자 비교',                   ja:'数くらべ',                       es:'Comparar Números',            fr:'Comparer les Nombres'       },
  'game.math-compare.desc':     { vi:'Chọn dấu >, < hoặc = để so sánh hai số. Luyện nền tảng toán lớp 1-2.', en:'Choose >, < or = to compare two numbers. Practice core math for grades 1-2.', zh:'选择 >、< 或 = 来比较两个数字，练习一年级到二年级基础数学。', ko:'>, <, = 기호를 골라 두 숫자를 비교해요. 1-2학년 기초 수학을 연습합니다.', ja:'>, <, = を選んで2つの数をくらべよう。小学1-2年向けの基礎算数です。', es:'Elige >, < o = para comparar dos números. Practica matemáticas básicas de 1.º-2.º.', fr:'Choisis >, < ou = pour comparer deux nombres. Exerce les bases de maths niveau CP-CE1.' },
  'game.animal-match.title':    { vi:'Ghép Đôi Động Vật',            en:'Animal Match',                  zh:'动物配对',                     ko:'동물 짝맞추기',                ja:'どうぶつマッチ',                  es:'Parejas de Animales',         fr:'Associer les Animaux'        },
  'game.animal-match.desc':     { vi:'Ghép con vật với môi trường sống hoặc thức ăn phù hợp. Luyện quan sát và kiến thức khoa học lớp 1-3.', en:'Match animals with the right habitat or food. Practice observation and science knowledge for grades 1-3.', zh:'将动物与合适的栖息地或食物配对，练习观察力与科学知识。', ko:'동물을 알맞은 서식지나 먹이와 연결하며 관찰력과 과학 지식을 익혀요.', ja:'動物を正しいすみかや食べ物と組み合わせて、観察力と理科の知識を育てます。', es:'Relaciona animales con su hábitat o alimento correcto. Practica observación y ciencias para 1.º-3.º.', fr:'Associe les animaux à leur habitat ou nourriture. Exerce l’observation et les sciences du CP au CE2.' },
  'game.nature-quiz.title':     { vi:'Khám Phá Tự Nhiên',             en:'Explore Nature',                zh:'探索自然',                   ko:'자연 탐험',                   ja:'自然探検',                       es:'Explorar la Naturaleza',      fr:'Explorer la Nature'          },
  'game.nature-quiz.desc':      { vi:'Tìm hiểu thực vật, động vật và hiện tượng tự nhiên.', en:'Discover plants, animals and natural phenomena.', zh:'了解植物、动物和自然现象。', ko:'식물, 동물과 자연 현상을 알아봅니다.', ja:'植物、動物、自然現象を学びます。', es:'Descubre plantas, animales y fenómenos naturales.', fr:'Découvre les plantes, animaux et phénomènes naturels.' },

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

  // ─── MathCompare ────────────────────────────────────────────────────────────
  'mathCompare.subtitle':      { vi:'Chọn dấu đúng giữa hai số.', en:'Choose the correct sign between two numbers.', zh:'在两个数字之间选择正确符号。', ko:'두 숫자 사이에 알맞은 기호를 고르세요.', ja:'2つの数のあいだに正しい記号を選ぼう。', es:'Elige el signo correcto entre dos números.', fr:'Choisis le bon signe entre deux nombres.' },
  'mathCompare.score':         { vi:'Điểm', en:'Score', zh:'得分', ko:'점수', ja:'スコア', es:'Puntos', fr:'Score' },
  'mathCompare.question':      { vi:'Câu', en:'Question', zh:'题', ko:'문제', ja:'問題', es:'Pregunta', fr:'Question' },
  'mathCompare.streak':        { vi:'Chuỗi đúng:', en:'Streak:', zh:'连对：', ko:'연속 정답:', ja:'連続正解:', es:'Racha:', fr:'Série :' },
  'mathCompare.level1':        { vi:'Mức 1 · 1-10', en:'Level 1 · 1-10', zh:'第1级 · 1-10', ko:'1단계 · 1-10', ja:'レベル1 · 1-10', es:'Nivel 1 · 1-10', fr:'Niveau 1 · 1-10' },
  'mathCompare.level2':        { vi:'Mức 2 · 1-100', en:'Level 2 · 1-100', zh:'第2级 · 1-100', ko:'2단계 · 1-100', ja:'レベル2 · 1-100', es:'Nivel 2 · 1-100', fr:'Niveau 2 · 1-100' },
  'mathCompare.level3':        { vi:'Mức 3 · 1-1000', en:'Level 3 · 1-1000', zh:'第3级 · 1-1000', ko:'3단계 · 1-1000', ja:'レベル3 · 1-1000', es:'Nivel 3 · 1-1000', fr:'Niveau 3 · 1-1000' },
  'mathCompare.instruction':   { vi:'Hãy chọn dấu đúng để so sánh.', en:'Choose the correct sign to compare.', zh:'请选择正确的比较符号。', ko:'알맞은 비교 기호를 고르세요.', ja:'正しい比較記号を選ぼう。', es:'Elige el signo correcto para comparar.', fr:'Choisis le bon signe de comparaison.' },
  'mathCompare.correct':       { vi:'✅ Chính xác!', en:'✅ Correct!', zh:'✅ 正确！', ko:'✅ 정답!', ja:'✅ 正解！', es:'✅ ¡Correcto!', fr:'✅ Correct !' },
  'mathCompare.wrong':         { vi:'❌ Chưa đúng.', en:'❌ Not quite.', zh:'❌ 不对。', ko:'❌ 틀렸어요.', ja:'❌ ちがうよ。', es:'❌ No es correcto.', fr:'❌ Pas encore.' },
  'mathCompare.points':        { vi:'điểm', en:'points', zh:'分', ko:'점', ja:'ポイント', es:'puntos', fr:'points' },
  'mathCompare.next':          { vi:'Câu tiếp →', en:'Next →', zh:'下一题 →', ko:'다음 →', ja:'次へ →', es:'Siguiente →', fr:'Suivant →' },
  'mathCompare.viewResult':    { vi:'Xem kết quả →', en:'See results →', zh:'查看结果 →', ko:'결과 보기 →', ja:'結果を見る →', es:'Ver resultados →', fr:'Voir résultats →' },
  'mathCompare.back':          { vi:'← Quay lại', en:'← Back', zh:'← 返回', ko:'← 뒤로', ja:'← 戻る', es:'← Volver', fr:'← Retour' },
  'mathCompare.playAgain':     { vi:'Chơi lại', en:'Play again', zh:'再玩一次', ko:'다시 하기', ja:'もう一度', es:'Jugar otra vez', fr:'Rejouer' },
  'mathCompare.resultTitle':   { vi:'Kết quả', en:'Result', zh:'结果', ko:'결과', ja:'結果', es:'Resultado', fr:'Résultat' },
  'mathCompare.correctAnswers':{ vi:'câu đúng', en:'correct answers', zh:'题答对', ko:'문제 정답', ja:'問正解', es:'respuestas correctas', fr:'bonnes réponses' },
  'mathCompare.resultGreat':   { vi:'Bé so sánh số rất tốt rồi!', en:'Great job comparing numbers!', zh:'你比较数字很棒！', ko:'숫자 비교를 아주 잘했어요!', ja:'数くらべがとても上手！', es:'¡Muy bien comparando números!', fr:'Très bon travail pour comparer les nombres !' },
  'mathCompare.resultGood':    { vi:'Làm tốt lắm, chơi lại để tăng điểm nhé.', en:'Nice work. Play again to improve your score.', zh:'做得不错，再玩一次争取更高分。', ko:'잘했어요. 다시 해서 점수를 더 올려봐요.', ja:'よくできたね。もう一度遊んで点数アップ！', es:'Buen trabajo. Juega otra vez para mejorar tu puntaje.', fr:'Bon travail. Rejoue pour améliorer ton score.' },
  'mathCompare.resultTry':     { vi:'Không sao, luyện thêm một chút nữa nhé.', en:'No worries. A bit more practice will help.', zh:'没关系，再多练习一下吧。', ko:'괜찮아요. 조금만 더 연습해봐요.', ja:'だいじょうぶ。もう少し練習してみよう。', es:'No pasa nada. Un poco más de práctica te ayudará.', fr:'Pas de souci. Un peu plus de pratique t’aidera.' },

  // ─── AnimalMatch ───────────────────────────────────────────────────────────
  'animalMatch.subtitle':      { vi:'Ghép con vật với nơi sống hoặc thức ăn phù hợp.', en:'Match each animal with the right habitat or food.', zh:'把动物和正确的栖息地或食物配对。', ko:'동물을 알맞은 서식지나 먹이와 연결해요.', ja:'動物を正しいすみかや食べ物と組み合わせよう。', es:'Relaciona cada animal con su hábitat o alimento.', fr:'Associe chaque animal à son habitat ou sa nourriture.' },
  'animalMatch.score':         { vi:'Điểm', en:'Score', zh:'得分', ko:'점수', ja:'スコア', es:'Puntos', fr:'Score' },
  'animalMatch.question':      { vi:'Câu', en:'Question', zh:'题', ko:'문제', ja:'問題', es:'Pregunta', fr:'Question' },
  'animalMatch.streak':        { vi:'Chuỗi đúng:', en:'Streak:', zh:'连对：', ko:'연속 정답:', ja:'連続正解:', es:'Racha:', fr:'Série :' },
  'animalMatch.level1':        { vi:'Mức 1 · Môi trường sống', en:'Level 1 · Habitat', zh:'第1级 · 栖息地', ko:'1단계 · 서식지', ja:'レベル1 · すみか', es:'Nivel 1 · Hábitat', fr:'Niveau 1 · Habitat' },
  'animalMatch.level2':        { vi:'Mức 2 · Thức ăn', en:'Level 2 · Food', zh:'第2级 · 食物', ko:'2단계 · 먹이', ja:'レベル2 · 食べ物', es:'Nivel 2 · Comida', fr:'Niveau 2 · Nourriture' },
  'animalMatch.level3':        { vi:'Mức 3 · Ghép hiểu biết', en:'Level 3 · Mixed match', zh:'第3级 · 综合配对', ko:'3단계 · 혼합 매칭', ja:'レベル3 · 総合マッチ', es:'Nivel 3 · Mixto', fr:'Niveau 3 · Mixte' },
  'animalMatch.instruction':   { vi:'Chọn đáp án đúng. Mỗi câu chỉ chọn một lần.', en:'Choose the correct answer. You can answer once per question.', zh:'选择正确答案。每题只能作答一次。', ko:'정답을 하나 고르세요. 각 문제는 한 번만 선택할 수 있어요.', ja:'正しい答えを選ぼう。各問題は1回だけ選べます。', es:'Elige la respuesta correcta. Solo puedes responder una vez por pregunta.', fr:'Choisis la bonne réponse. Une seule réponse par question.' },
  'animalMatch.correct':       { vi:'✅ Chính xác!', en:'✅ Correct!', zh:'✅ 正确！', ko:'✅ 정답!', ja:'✅ 正解！', es:'✅ ¡Correcto!', fr:'✅ Correct !' },
  'animalMatch.wrong':         { vi:'❌ Chưa đúng.', en:'❌ Not quite.', zh:'❌ 不对。', ko:'❌ 틀렸어요.', ja:'❌ ちがうよ。', es:'❌ No es correcto.', fr:'❌ Pas encore.' },
  'animalMatch.correctBadge':  { vi:'Đúng', en:'Right', zh:'正确', ko:'정답', ja:'正解', es:'Bien', fr:'Juste' },
  'animalMatch.wrongBadge':    { vi:'Sai', en:'Wrong', zh:'错误', ko:'오답', ja:'不正解', es:'Mal', fr:'Faux' },
  'animalMatch.correctAnswer': { vi:'Đáp án đúng là:', en:'Correct answer:', zh:'正确答案：', ko:'정답:', ja:'正解：', es:'Respuesta correcta:', fr:'Bonne réponse :' },
  'animalMatch.points':        { vi:'điểm', en:'points', zh:'分', ko:'점', ja:'ポイント', es:'puntos', fr:'points' },
  'animalMatch.next':          { vi:'Câu tiếp →', en:'Next →', zh:'下一题 →', ko:'다음 →', ja:'次へ →', es:'Siguiente →', fr:'Suivant →' },
  'animalMatch.viewResult':    { vi:'Xem kết quả →', en:'See results →', zh:'查看结果 →', ko:'결과 보기 →', ja:'結果を見る →', es:'Ver resultados →', fr:'Voir résultats →' },
  'animalMatch.back':          { vi:'← Quay lại', en:'← Back', zh:'← 返回', ko:'← 뒤로', ja:'← 戻る', es:'← Volver', fr:'← Retour' },
  'animalMatch.playAgain':     { vi:'Chơi lại', en:'Play again', zh:'再玩一次', ko:'다시 하기', ja:'もう一度', es:'Jugar otra vez', fr:'Rejouer' },
  'animalMatch.resultTitle':   { vi:'Kết quả', en:'Result', zh:'结果', ko:'결과', ja:'結果', es:'Resultado', fr:'Résultat' },
  'animalMatch.correctAnswers':{ vi:'câu đúng', en:'correct answers', zh:'题答对', ko:'문제 정답', ja:'問正解', es:'respuestas correctas', fr:'bonnes réponses' },
  'animalMatch.resultGreat':   { vi:'Bé ghép đúng rất tốt rồi!', en:'Great animal matching!', zh:'动物配对做得很棒！', ko:'동물 짝맞추기를 아주 잘했어요!', ja:'どうぶつマッチがとても上手！', es:'¡Excelente al relacionar animales!', fr:'Très bon travail pour associer les animaux !' },
  'animalMatch.resultGood':    { vi:'Làm tốt lắm, chơi lại để ghi điểm cao hơn nhé.', en:'Nice work. Play again to improve your score.', zh:'做得不错，再玩一次争取更高分。', ko:'잘했어요. 다시 해서 점수를 더 올려봐요.', ja:'よくできたね。もう一度遊んで点数アップ！', es:'Buen trabajo. Juega otra vez para mejorar tu puntaje.', fr:'Bon travail. Rejoue pour améliorer ton score.' },
  'animalMatch.resultTry':     { vi:'Không sao, mình học thêm về các con vật nhé.', en:'No worries. Let’s learn a bit more about animals.', zh:'没关系，我们再多认识一些动物吧。', ko:'괜찮아요. 동물에 대해 조금 더 배워봐요.', ja:'だいじょうぶ。動物についてもう少し学ぼう。', es:'No pasa nada. Aprendamos un poco más sobre los animales.', fr:'Pas de souci. Apprenons encore un peu sur les animaux.' },
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
