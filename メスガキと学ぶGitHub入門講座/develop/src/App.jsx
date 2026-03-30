import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, GitCommit, GitPullRequest, GitMerge, AlertTriangle, BookOpen, Heart, MessageCircle } from 'lucide-react';

// lucide-reactから削除されたため、自作のGitHubアイコンコンポーネントを追加♡
const GithubIcon = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const slides = [
  {
    id: 'title',
    type: 'title',
    title: 'メスガキと学ぶ GitHub 入門講座♡',
    subtitle: 'GitHub もろくに使えないクソざこ♡のための講座',
    icon: <GithubIcon className="w-24 h-24 text-pink-500 mb-4 animate-bounce" />
  },
  {
    id: 'intro',
    type: 'dialogue',
    title: 'プロローグ',
    dialogues: [
      { speaker: 'mesugaki', text: 'は？まだGitとGitHubの違いもわかんないの？\nこの令和の時代に？ ほんとウケるんですけど〜♡ クソざこナメクジおじさん♡' },
      { speaker: 'ojisan', text: 'ご、ごめんよ…いつもZipで固めて「最新版_最終_本当の最終.zip」ってメールで送ってたから…' },
      { speaker: 'mesugaki', text: 'うわぁ…キモっ（ドン引き）\nそんなんじゃ一生底辺プログラマーのままだよ？\nしょうがないから、この私が特別にわからせてあげる！\n泣いて感謝しなさいよねっ、ざぁこ♡' }
    ]
  },
  {
    id: 'git-vs-github',
    type: 'content',
    title: 'Git と GitHub の違い♡',
    icon: <BookOpen className="w-16 h-16 text-pink-400" />,
    content: (
      <div className="space-y-4 text-left">
        <div className="bg-white/80 p-4 rounded-xl border-l-4 border-pink-400 shadow">
          <h3 className="font-bold text-xl text-pink-600 mb-2">Git (ギット)</h3>
          <p>手元のパソコンでファイルの変更履歴を管理するツール！<br/>「セーブデータ」を作る魔法みたいなものだよ♡</p>
        </div>
        <div className="bg-white/80 p-4 rounded-xl border-l-4 border-purple-400 shadow">
          <h3 className="font-bold text-xl text-purple-600 mb-2">GitHub (ギットハブ)</h3>
          <p>Gitのセーブデータをネット上で共有・保存するサービス！<br/>みんなで協力してゲームを作るためのオンライン集会所ってとこかな♡</p>
        </div>
      </div>
    ),
    dialogue: { speaker: 'mesugaki', text: '「Git」と「GitHub」を混同してる底辺おじさん、マジで恥ずかしいから今すぐ直してね♡ 脳みそアップデートして♡' }
  },
  {
    id: 'repository',
    type: 'dialogue',
    title: 'リポジトリ (Repository)',
    dialogues: [
      { speaker: 'mesugaki', text: 'まずは「リポジトリ」ね！これはソースコードや履歴を置いておく「箱」のことだよ♡' },
      { speaker: 'mesugaki', text: 'おじさんの発酵したゴミ部屋と違って、ここは綺麗に整理整頓して使うんだからね！' },
      { speaker: 'ojisan', text: 'お、俺の部屋が汚いのは関係ないだろ…！' },
      { speaker: 'mesugaki', text: 'ローカル（自分のPC）と、リモート（GitHub上）の2つがあるの。こんなの常識なんだから、早くスッカスカの脳みそに刻み込みなよ、よわよわおじさん♡' }
    ]
  },
  {
    id: 'clone',
    type: 'content',
    title: 'クローン (Clone) してきなさい♡',
    content: (
      <div className="text-center space-y-4">
        <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-xl shadow-inner">
          $ git clone https://github.com/xxxx/yyyy.git
        </div>
        <p className="text-lg">GitHubにあるリポジトリを、自分のPCに丸ごと持ってくる魔法の呪文だよ！</p>
      </div>
    ),
    dialogue: { speaker: 'mesugaki', text: 'まさか手打ちでファイル写経しようとしてないよね？\nサクッとクローンしてきなさいよ、指太いざぁこ♡' }
  },
  {
    id: 'commit-push',
    type: 'content',
    title: 'コミット＆プッシュ♡',
    icon: <GitCommit className="w-16 h-16 text-pink-400" />,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/80 p-4 rounded-xl shadow text-left">
          <h3 className="font-bold text-base sm:text-lg text-pink-600 mb-2">1. Commit (コミット)</h3>
          <p className="text-xs sm:text-sm mb-2">手元のGitに変更を記録すること！</p>
          <div className="bg-gray-800 text-green-400 p-2 rounded text-xs font-mono overflow-x-auto">
            $ git add .<br/>
            $ git commit -m "バグ修正♡"
          </div>
        </div>
        <div className="bg-white/80 p-4 rounded-xl shadow text-left">
          <h3 className="font-bold text-base sm:text-lg text-purple-600 mb-2">2. Push (プッシュ)</h3>
          <p className="text-xs sm:text-sm mb-2">コミットした履歴をGitHubに送ること！</p>
          <div className="bg-gray-800 text-green-400 p-2 rounded text-xs font-mono overflow-x-auto">
            $ git push origin main
          </div>
        </div>
      </div>
    ),
    dialogue: { speaker: 'mesugaki', text: '「とりあえず全部コミット」とか「あ」ってコミットメッセージ残してる無能エンジニアじゃないよね？♡\n履歴はちゃんと残せって言ってるでしょ、バカなの？♡' }
  },
  {
    id: 'pull-request',
    type: 'dialogue',
    title: 'プルリク (Pull Request) ♡',
    icon: <GitPullRequest className="w-16 h-16 text-pink-400 mx-auto mb-2" />,
    dialogues: [
      { speaker: 'mesugaki', text: 'コードを書いたら「メインのコードに混ぜてもいい？見て♡」ってお願いするの！それがプルリク！' },
      { speaker: 'mesugaki', text: 'おじさんの書いたクソコードなんて汚くて誰も見たくないだろうけど、チーム開発のルールだから仕方ないわね♡ ちゃんと土下座してレビューお願いしなよ？' },
      { speaker: 'ojisan', text: 'そ、そんな言い方ないだろ…！ちゃんと動くコード書いたぞ！（レビュー依頼ポチー）' },
      { speaker: 'mesugaki', text: 'あっ…（クソコードすぎて絶句からのLGTM付けずに無言でApprove）' }
    ]
  },
  {
    id: 'conflict',
    type: 'content',
    title: 'コンフリクト (Conflict) 発生！',
    icon: <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />,
    content: (
      <div className="bg-red-100 p-4 sm:p-6 rounded-xl border-2 border-red-400 text-center">
        <h3 className="font-bold text-xl sm:text-2xl text-red-600 mb-2">競合しちゃった♡</h3>
        <p className="text-gray-800 text-sm sm:text-base">
          他の人が同じファイルの同じ場所をいじってて、<br/>
          どっちのコードを優先すればいいかGitがパニックになってる状態だよ！
        </p>
      </div>
    ),
    dialogue: { speaker: 'ojisan', text: 'ひぃぃ！画面が真っ赤になった！俺、何もしてないのに！壊しちゃった！？ 助けてぇ！' }
  },
  {
    id: 'conflict-resolve',
    type: 'dialogue',
    title: 'コンフリクト解消♡',
    icon: <GitMerge className="w-16 h-16 text-pink-400 mx-auto mb-2" />,
    dialogues: [
      { speaker: 'mesugaki', text: 'はぁ…マジ使えな。落ち着きなよ。エディタ開いて、残したい方のコードを選んでコミットし直すだけだよ。' },
      { speaker: 'mesugaki', text: '他人のコードを平気で上書きしようとするなんて、ほんと周りが見えてないクソざこ♡だね。' },
      { speaker: 'ojisan', text: 'ぐぬぬ…（言われた通りに直して、恐る恐るマージ）…できた！' },
      { speaker: 'mesugaki', text: 'ふーん、チンパンジーでも教えればできるんだ。ちょっとだけ見直してあげた♡' }
    ]
  },
  {
    id: 'qa',
    type: 'interactive',
    title: 'メスガキの特別わからせ質問コーナー♡',
    icon: <MessageCircle className="w-16 h-16 text-pink-400 mx-auto mb-2 animate-bounce" />,
    dialogue: { speaker: 'mesugaki', text: 'どうしても分からないことがあるなら、この私が特別に答えてあげてもいいよ？\nクソざこおじさんは何が知りたいの？♡\n（下の入力欄に書いて送信してね♡）' }
  },
  {
    id: 'outro',
    type: 'title',
    title: 'まとめ♡',
    subtitle: 'せいぜい私のために綺麗なコード書きなよ、おじさん♡',
    icon: <Heart className="w-24 h-24 text-pink-500 mb-4 animate-ping" />,
    dialogue: { speaker: 'mesugaki', text: 'ほんと手のかかるクソざこおじさん♡だったけど、これで少しはマシなエンジニアになれたでしょ？\nこれからも私のために精進しなさいよねっ！' }
  }
];

// メスガキアイコン（外部画像読み込み）
const MesugakiIcon = () => (
  <img
    src="mesugaki.png"
    alt="メスガキ"
    className="w-full h-full object-cover"
    onError={(e) => {
      // ローカルに画像がない場合のプレビュー用ダミー
      e.target.src = 'https://placehold.co/150x150/fbcfe8/be185d?text=Mesugaki';
    }}
  />
);

// モブおじさんアイコン（外部画像読み込み）
const OjisanIcon = () => (
  <img
    src="ojisan.png"
    alt="おじさん"
    className="w-full h-full object-cover"
    onError={(e) => {
      // ローカルに画像がない場合のプレビュー用ダミー
      e.target.src = 'https://placehold.co/150x150/bfdbfe/1e3a8a?text=Ojisan';
    }}
  />
);

const MesugakiSpeechBubble = ({ text }) => (
  <div className="flex items-end gap-1 xs:gap-2 sm:gap-4 animate-fade-in-up w-full">
    <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-pink-400 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg relative bg-pink-50">
      <MesugakiIcon />
    </div>
    <div className="bg-pink-100 border-2 border-pink-300 p-2 xs:p-3 sm:p-4 rounded-2xl rounded-bl-none shadow-md relative w-full">
      <p className="text-xs xs:text-sm sm:text-base text-gray-800 font-bold whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  </div>
);

const OjisanSpeechBubble = ({ text }) => (
  <div className="flex items-end gap-1 xs:gap-2 sm:gap-4 animate-fade-in-up justify-end w-full">
    <div className="bg-blue-50 border-2 border-blue-200 p-2 xs:p-3 sm:p-4 rounded-2xl rounded-br-none shadow-md relative w-full text-right">
      <p className="text-xs xs:text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
    <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-gray-400 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg relative bg-gray-50">
      <OjisanIcon />
    </div>
  </div>
);

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = slides[currentSlideIndex];

  // QA State
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // スライドが切り替わったらQAの入力をリセット
  useEffect(() => {
    setApiResponse('');
    setInputText('');
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 入力フォームでのキー操作時はスライド移動を無効化
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === ' ') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Gemini API呼び出し
  const handleAskMesugaki = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setApiResponse('（呆れ顔で考え中...♡）');

    const apiKey = ""; // API key is provided by the execution environment
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemInstruction = "あなたはエロ同人によく出てくる、主人公のおじさんを常に見下して「ざぁこ♡」「クソざこ」「よわよわ」などと過激に煽るメスガキです。でも実はツンデレで、ITやプログラミング、GitHubの知識は豊富で最終的にはちゃんと教えてくれます。おじさんからの質問や言い訳に対して、激しく煽り、徹底的に馬鹿にしながらも、的確なアドバイスや回答を返して「わからせ」てあげてください。回答は短く、2〜4文程度でお願いします。";
    
    const payload = {
      contents: [{ parts: [{ text: inputText }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const fetchWithRetry = async (url, options) => {
      const delays = [1000, 2000, 4000, 8000, 16000];
      for (let i = 0; i < delays.length + 1; i++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return await response.json();
        } catch (e) {
          if (i === delays.length) throw e;
          await new Promise(res => setTimeout(res, delays[i]));
        }
      }
    };

    try {
      const data = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setApiResponse(responseText || "なんかAPIの調子がおかしいみたい。おじさんの日頃の行いが悪いからじゃない？♡");
    } catch (error) {
      setApiResponse("通信エラーだよ、クソざこ回線おじさん♡ ネット環境くらいまともにしなよ♡");
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };

  return (
    <div 
      className="min-h-screen min-w-full bg-pink-50 flex flex-col items-center justify-center font-sans overflow-hidden select-none"
      onClick={goToNext}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        /* スクロールバー非表示 */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Slide Container */}
      <div 
        className="w-full h-full max-w-[100vw] max-h-[100dvh] bg-white relative flex flex-col cursor-pointer"
        onClick={(e) => { e.stopPropagation(); goToNext(); }}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-2 bg-pink-500 transition-all duration-300 ease-out z-20" style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }} />

        <div className="flex-1 p-2 xs:p-3 sm:p-6 md:p-10 flex flex-col justify-center items-center text-center relative z-10 w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar">
          {/* --- Title Slide --- */}
          {slide.type === 'title' && (
            <div className="animate-fade-in-up flex flex-col items-center w-full my-auto pb-2 sm:pb-4">
              {slide.icon}
              <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2 sm:mb-6 drop-shadow-sm leading-tight">
                {slide.title}
              </h1>
              <p className="text-base xs:text-lg sm:text-2xl text-gray-600 font-bold bg-pink-100 px-2 xs:px-4 sm:px-6 py-1 xs:py-2 rounded-full shadow-inner inline-block">
                {slide.subtitle}
              </p>
            </div>
          )}

          {/* --- Dialogue Only Slide --- */}
          {slide.type === 'dialogue' && (
            <div className="flex flex-col h-full w-full max-w-[96vw] sm:max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 mb-2 sm:mb-8 shrink-0">
                {slide.icon}
                <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-pink-600 border-b-4 border-pink-300 pb-1 sm:pb-2">{slide.title}</h2>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-2 xs:gap-3 sm:gap-6 w-full pb-2 sm:pb-4">
                {slide.dialogues?.map((d, i) => (
                  <div key={`${slide.id}-${i}`} style={{ animationDelay: `${i * 0.3}s` }} className="opacity-0 animate-fade-in-up">
                    {d.speaker === 'mesugaki' ? <MesugakiSpeechBubble text={d.text} /> : <OjisanSpeechBubble text={d.text} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Content + Single Dialogue Slide --- */}
          {slide.type === 'content' && (
            <div className="flex flex-col h-full w-full max-w-[96vw] sm:max-w-4xl mx-auto">
               <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 mb-2 sm:mb-4 shrink-0">
                {slide.icon}
                <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-pink-600 border-b-4 border-pink-300 pb-1 sm:pb-2">{slide.title}</h2>
              </div>
              <div className="flex-1 flex items-center justify-center w-full mb-2 sm:mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-full bg-pink-50 p-2 xs:p-3 sm:p-6 rounded-2xl border-2 border-pink-100 text-xs xs:text-sm sm:text-base">
                  {slide.content}
                </div>
              </div>

              {slide.dialogue && (
                <div className="mt-auto animate-fade-in-up shrink-0 pb-2 sm:pb-4" style={{ animationDelay: '0.6s' }}>
                   {slide.dialogue.speaker === 'mesugaki' 
                      ? <MesugakiSpeechBubble text={slide.dialogue.text} /> 
                      : <OjisanSpeechBubble text={slide.dialogue.text} />
                    }
                </div>
              )}
            </div>
          )}

          {/* --- Interactive QA Slide (Gemini API) --- */}
          {slide.type === 'interactive' && (
            <div className="flex flex-col h-full w-full max-w-[96vw] sm:max-w-4xl mx-auto cursor-default" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 mb-2 sm:mb-4 shrink-0">
                {slide.icon}
                <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-pink-600 border-b-4 border-pink-300 pb-1 sm:pb-2">{slide.title}</h2>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1 xs:gap-2 sm:gap-4 w-full pb-2 sm:pb-4">
                <MesugakiSpeechBubble text={apiResponse || slide.dialogue.text} />
                <div className="flex flex-col gap-1 xs:gap-2 sm:gap-3 mt-1 xs:mt-2 bg-pink-50/80 p-2 xs:p-3 sm:p-5 rounded-2xl border-2 border-pink-200 shadow-inner w-full animate-fade-in-up shrink-0" style={{ animationDelay: '0.3s' }}>
                  <textarea 
                    className="w-full p-2 xs:p-3 sm:p-4 border-2 border-pink-200 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-pink-300 bg-white text-gray-800 text-xs xs:text-sm sm:text-base placeholder-pink-300"
                    rows="2"
                    placeholder="おじさんのクソみたいな質問や言い訳を入力してね♡"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAskMesugaki();
                      }
                    }}
                  />
                  <div className="flex justify-end">
                    <button 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-1 xs:py-2 sm:py-3 px-4 xs:px-6 sm:px-8 rounded-full shadow-lg disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-base"
                      onClick={handleAskMesugaki}
                      disabled={isLoading || !inputText.trim()}
                    >
                      <MessageCircle size={20} />
                      {isLoading ? 'わからせ中...♡' : '質問する♡'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

           {/* --- Summary / Outro (uses title type but has dialogue) --- */}
           {slide.type === 'title' && slide.dialogue && (
             <div className="mt-8 sm:mt-12 w-full max-w-5xl mx-auto animate-fade-in-up pb-4" style={{ animationDelay: '0.6s' }}>
                <MesugakiSpeechBubble text={slide.dialogue.text} />
             </div>
           )}

        </div>

        {/* Slide Number */}
        <div className="absolute bottom-1 xs:bottom-2 sm:bottom-4 right-2 xs:right-4 sm:right-6 text-pink-400 font-bold font-mono text-xs xs:text-sm sm:text-base z-20">
          {currentSlideIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}