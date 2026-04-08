"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Terminal,
  BookOpen,
  GitBranch,
  History,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";

/**
 * TYPES & INTERFACES
 */
interface Commit {
  id: string;
  hash: string;
  msg: string;
  parents: string[];
  isRoot?: boolean;
  isEmpty?: boolean;
}

interface Step {
  title: string;
  desc: string;
  hint: string;
  check: (cmd: string) => boolean;
  action?: (
    cmd: string,
    commits: Commit[],
    wcId: string,
  ) => { commits: Commit[]; wcId: string; bookmarks: Record<string, string> };
}

interface Lesson {
  id: string;
  title: string;
  group: string;
  steps: Step[];
  initialState: () => {
    commits: Commit[];
    wcId: string;
    bookmarks: Record<string, string>;
  };
}

/**
 * UTILS
 */
const generateId = () => Math.random().toString(36).substring(2, 10);
const generateHash = () => Math.random().toString(16).substring(2, 10);

/**
 * LESSON DATA
 */
const LESSONS: Lesson[] = [
  {
    id: "intro",
    title: "Meet jj",
    group: "Foundations",
    initialState: () => {
      const r = generateId();
      const w = generateId();
      return {
        commits: [
          {
            id: r,
            hash: generateHash(),
            msg: "root()",
            parents: [],
            isRoot: true,
            isEmpty: false,
          },
          {
            id: w,
            hash: generateHash(),
            msg: "(no description set)",
            parents: [r],
            isEmpty: true,
          },
        ],
        wcId: w,
        bookmarks: {},
      };
    },
    steps: [
      {
        title: "Working copy is a commit",
        desc: "In jj, your working copy is a live commit marked with `@`. Run `jj log` to see it.",
        hint: "jj log",
        check: (c) => c === "jj log" || c === "jj l",
      },
      {
        title: "Check status",
        desc: "Run `jj status` to see the state of your working copy.",
        hint: "jj status",
        check: (c) => c === "jj status" || c === "jj st",
      },
    ],
  },
  {
    id: "describe",
    title: "Describe changes",
    group: "Foundations",
    initialState: () => {
      const r = generateId();
      const w = generateId();
      return {
        commits: [
          {
            id: r,
            hash: generateHash(),
            msg: "root()",
            parents: [],
            isRoot: true,
            isEmpty: false,
          },
          {
            id: w,
            hash: generateHash(),
            msg: "(no description set)",
            parents: [r],
            isEmpty: true,
          },
        ],
        wcId: w,
        bookmarks: {},
      };
    },
    steps: [
      {
        title: "Set a description",
        desc: 'Use `jj describe -m "message"` to label your current `@` commit.',
        hint: 'jj describe -m "add homepage"',
        check: (c) => /^jj (describe|desc)\s+-m\s+/.test(c),
        action: (c, commits, wcId) => {
          const m = c.match(/-m\s+["']?(.+?)["']?\s*$/);
          const newCommits = commits.map((com) =>
            com.id === wcId
              ? { ...com, msg: m?.[1] || com.msg, isEmpty: false }
              : com,
          );
          return { commits: newCommits, wcId, bookmarks: {} };
        },
      },
    ],
  },
];

/**
 * MAIN COMPONENT
 */
const JjBookmark: React.FC = () => {
  // --- 1. State ---
  const [curLessonIdx, setCurLessonIdx] = useState(0);
  const [curStepIdx, setCurStepIdx] = useState(0);

  // Initialize these from the first lesson immediately
  const [commits, setCommits] = useState<Commit[]>(
    () => LESSONS[0].initialState().commits,
  );
  const [wcId, setWcId] = useState<string>(
    () => LESSONS[0].initialState().wcId,
  );
  const [bookmarks, setBookmarks] = useState<Record<string, string>>(
    () => LESSONS[0].initialState().bookmarks,
  );

  const [output, setOutput] = useState<{ type: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  );

  const outputEndRef = useRef<HTMLDivElement>(null);

  // --- 2. Helper Functions ---
  const addToOutput = (type: string, text: string) => {
    setOutput((prev) => [...prev, { type, text }]);
  };

  // NEW: Centralized function to handle lesson transitions
  const selectLesson = (idx: number) => {
    const lesson = LESSONS[idx];
    const newState = lesson.initialState();

    // Update all state at once in the event handler (No useEffect needed)
    setCurLessonIdx(idx);
    setCurStepIdx(0);
    setCommits(newState.commits);
    setWcId(newState.wcId);
    setBookmarks(newState.bookmarks);

    addToOutput("info", `--- Lesson ${idx + 1}: ${lesson.title} ---`);
  };

  const renderLog = () => {
    // We use the current commits state here
    commits
      .slice()
      .reverse()
      .forEach((c) => {
        const isWc = c.id === wcId;
        addToOutput(
          "log",
          `${isWc ? " @ " : " ◆ "} ${c.id.slice(0, 8)} ${c.msg}`,
        );
      });
  };

  // --- 3. Effects ---
  // We only keep the scroll effect. The initialization effect is DELETED.
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // --- 4. Logic ---
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    addToOutput("cmd", `$ ${input}`);

    if (cmd === "jj log" || cmd === "jj l") {
      renderLog();
      checkProgress(cmd);
      setInput("");
      return;
    }

    const lesson = LESSONS[curLessonIdx];
    const step = lesson.steps[curStepIdx];

    if (step.check(cmd)) {
      if (step.action) {
        const result = step.action(input, commits, wcId);
        setCommits(result.commits);
        // If the action changes the wcId, update it here too
        if (result.wcId) setWcId(result.wcId);
      }
      addToOutput("ok", "✓ Correct!");

      if (curStepIdx + 1 < lesson.steps.length) {
        setCurStepIdx((prev) => prev + 1);
      } else {
        setCompletedLessons((prev) => new Set(prev).add(curLessonIdx));
        addToOutput("ok", "🎉 Lesson complete!");
      }
    } else {
      addToOutput("err", 'That is not the expected command. Try "hint".');
    }
    setInput("");
  };

  const checkProgress = (cmd: string) => {
    const step = LESSONS[curLessonIdx].steps[curStepIdx];
    if (step.check(cmd)) {
      if (curStepIdx + 1 < LESSONS[curLessonIdx].steps.length) {
        setCurStepIdx((prev) => prev + 1);
      }
    }
  };

  const currentLesson = LESSONS[curLessonIdx];
  const currentStep = currentLesson.steps[curStepIdx];

  return (
    <div className="flex h-[700px] w-full max-w-5xl mx-auto bg-[#0d1117] text-[#c9d1d9] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl font-sans">
      {/* SIDEBAR */}
      <div className="w-60 bg-[#161b22] border-r border-[#30363d] flex flex-col">
        <div className="p-4 border-b border-[#30363d] flex items-center gap-2">
          <GitBranch className="text-orange-500 w-5 h-5" />
          <span className="font-mono font-bold tracking-tighter text-lg">
            jj<span className="text-orange-500 italic">learn</span>
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {LESSONS.map((lesson, idx) => {
            const isLocked =
              idx > Math.max(...Array.from(completedLessons), -1) + 1;
            const isActive = idx === curLessonIdx;
            return (
              <button
                key={lesson.id}
                disabled={isLocked}
                onClick={() => selectLesson(idx)} // Use the new handler here
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-orange-500/10 text-orange-500 border-r-2 border-orange-500"
                    : isLocked
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#21262d]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    completedLessons.has(idx)
                      ? "bg-green-500/20 text-green-500"
                      : "bg-[#30363d]"
                  }`}
                >
                  {completedLessons.has(idx) ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    idx + 1
                  )}
                </div>
                {lesson.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* INSTRUCTION HEADER */}
        <div className="p-6 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Lesson {curLessonIdx + 1} • Step {curStepIdx + 1} of{" "}
              {currentLesson.steps.length}
            </span>
            <div className="flex gap-1">
              {currentLesson.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-6 rounded-full ${i < curStepIdx ? "bg-green-500" : i === curStepIdx ? "bg-orange-500" : "bg-[#30363d]"}`}
                />
              ))}
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">{currentStep?.title}</h2>
          <p
            className="text-sm text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentStep?.desc }}
          />
        </div>

        {/* GRAPH VISUALIZATION (Simplified) */}
        <div className="flex-1 bg-[#0d1117] p-8 overflow-auto flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-8">
            {commits.map((commit, i) => (
              <div
                key={commit.id}
                className="relative flex items-center gap-4 group"
              >
                <div
                  className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    commit.id === wcId
                      ? "bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                      : "bg-[#21262d] border-[#30363d]"
                  }`}
                >
                  {commit.id === wcId ? (
                    <span className="text-orange-500 font-bold">@</span>
                  ) : (
                    <span className="text-purple-400">◆</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-mono text-xs ${commit.id === wcId ? "text-orange-500" : "text-teal-500"}`}
                  >
                    {commit.id.slice(0, 8)}
                  </span>
                  <span className="text-xs text-gray-500">{commit.msg}</span>
                </div>
                {i < commits.length - 1 && (
                  <div className="absolute top-10 left-5 w-[2px] h-8 bg-[#30363d]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TERMINAL */}
        <div className="h-64 bg-[#0d1117] border-t border-[#30363d] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1">
            {output.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "cmd"
                    ? "text-purple-400"
                    : line.type === "ok"
                      ? "text-green-400"
                      : line.type === "err"
                        ? "text-red-400"
                        : line.type === "info"
                          ? "text-blue-400"
                          : "text-gray-300"
                }
              >
                {line.text}
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>
          <form
            onSubmit={handleCommand}
            className="p-3 bg-[#161b22] border-t border-[#30363d] flex items-center gap-3"
          >
            <span className="font-mono text-xs text-purple-500">jj@repo $</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-[#c9d1d9]"
              placeholder="type a command..."
              autoFocus
            />
            <button
              type="button"
              onClick={() =>
                addToOutput("info", `💡 Hint: ${currentStep.hint}`)
              }
              className="px-3 py-1 bg-[#21262d] border border-[#30363d] rounded text-[10px] hover:bg-[#30363d] transition-colors"
            >
              HINT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JjBookmark;
