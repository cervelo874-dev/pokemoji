'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChoiceState, RowId, PokemonInfo, QuizChoice } from '@/types';
import { ROW_META, getKanaEntry, getRowEntries } from '@/data/hiraganaData';
import { generateQuiz, generateReverseQuiz, generateRowQuestions, generateRandomQuestions } from '@/utils/quiz';
import { useProgress } from '@/hooks/useProgress';
import { useSpeech } from '@/hooks/useSpeech';
import KanaCard from '@/components/KanaCard';
import ChoiceGrid from '@/components/ChoiceGrid';
import SpeakButton from '@/components/SpeakButton';
import ClearModal from '@/components/ClearModal';
import ReverseChoiceCard from '@/components/ReverseChoiceCard';
import RowProgressBar from '@/components/RowProgressBar';

interface PageProps {
  params: Promise<{ row: string }>;
}

export default function GamePage({ params }: PageProps) {
  const { row: rowId } = use(params);
  const router = useRouter();
  const { progress, isLoaded, settings, recordAnswer, unlockNextRow } = useProgress();
  const { speakKana, speakCorrect, speakWrong, speakClear } = useSpeech(
    settings.soundEnabled,
    settings.volume
  );

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choiceStates, setChoiceStates] = useState<ChoiceState[]>(['idle', 'idle', 'idle', 'idle']);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sessionCorrectPokemons, setSessionCorrectPokemons] = useState<PokemonInfo[]>([]);

  const rowMeta = rowId === 'random'
    ? { id: 'random' as RowId, label: 'ごちゃまぜテスト', kanaList: [] }
    : ROW_META.find(r => r.id === rowId);

  // Generate questions on mount
  useEffect(() => {
    if (rowId) {
      if (rowId === 'random') {
        const q = generateRandomQuestions();
        setQuestions(q);
      } else {
        const q = generateRowQuestions(rowId);
        setQuestions(q);
      }
    }
  }, [rowId]);

  // Current kana
  const currentKana = questions[currentIndex];
  const currentEntry = currentKana ? getKanaEntry(currentKana) : undefined;
  const isSpecial = currentEntry?.special ?? false;

  // Generate quiz data
  const quiz = currentEntry && !isSpecial ? generateQuiz(currentEntry) : null;
  const reverseQuiz = currentEntry && isSpecial ? generateReverseQuiz(currentKana) : null;

  // Auto-speak on new question
  useEffect(() => {
    if (currentKana && isLoaded) {
      const timer = setTimeout(() => {
        speakKana(currentKana);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentKana, currentIndex, isLoaded, speakKana]);

  // Handle normal quiz choice
  const handleChoiceTap = useCallback((choiceIndex: number) => {
    if (answered || !quiz) return;
    setAnswered(true);

    const selectedChoice = quiz.choices[choiceIndex];
    const isCorrect = selectedChoice.name === quiz.correctChoice.name;

    if (isCorrect) {
      // Correct answer
      const newStates: ChoiceState[] = quiz.choices.map((_, i) =>
        i === choiceIndex ? 'correct' : 'disabled'
      );
      setChoiceStates(newStates);
      setCorrectCount(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      speakCorrect();

      // Sparkle effect for 3+ streak
      if (newStreak >= 3) {
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 600);
      }

      // Add to session correct list
      setSessionCorrectPokemons(prev => {
        if (prev.some(p => p.name === quiz.correctChoice.name)) return prev;
        return [...prev, { name: quiz.correctChoice.name, id: quiz.correctChoice.id, type: quiz.correctChoice.type }];
      });

      recordAnswer(currentKana, rowId, true, quiz.correctChoice.name);

      // Advance after delay
      setTimeout(() => advanceQuestion(), 800);
    } else {
      // Wrong answer - show correct
      const correctIndex = quiz.choices.findIndex(
        c => c.name === quiz.correctChoice.name
      );
      const newStates: ChoiceState[] = quiz.choices.map((_, i) => {
        if (i === choiceIndex) return 'wrong';
        if (i === correctIndex) return 'correct';
        return 'disabled';
      });
      setChoiceStates(newStates);
      setStreak(0);
      speakWrong(quiz.correctChoice.name);
      recordAnswer(currentKana, rowId, false);

      setTimeout(() => advanceQuestion(), 1200);
    }
  }, [answered, quiz, streak, currentKana, rowId, recordAnswer, speakCorrect, speakWrong]);

  // Handle reverse quiz choice
  const handleReverseChoiceTap = useCallback((choiceIndex: number) => {
    if (answered || !reverseQuiz) return;
    setAnswered(true);

    const selectedKana = reverseQuiz.choices[choiceIndex];
    const isCorrect = selectedKana === reverseQuiz.correctKana;

    if (isCorrect) {
      const newStates: ChoiceState[] = reverseQuiz.choices.map((_, i) =>
        i === choiceIndex ? 'correct' : 'disabled'
      );
      setChoiceStates(newStates);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      speakCorrect();
      recordAnswer(currentKana, rowId, true);
      setTimeout(() => advanceQuestion(), 800);
    } else {
      const correctIndex = reverseQuiz.choices.findIndex(
        k => k === reverseQuiz.correctKana
      );
      const newStates: ChoiceState[] = reverseQuiz.choices.map((_, i) => {
        if (i === choiceIndex) return 'wrong';
        if (i === correctIndex) return 'correct';
        return 'disabled';
      });
      setChoiceStates(newStates);
      setStreak(0);
      speakWrong(reverseQuiz.correctKana);
      recordAnswer(currentKana, rowId, false);
      setTimeout(() => advanceQuestion(), 1200);
    }
  }, [answered, reverseQuiz, currentKana, rowId, recordAnswer, speakCorrect, speakWrong]);

  const advanceQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // Row complete!
      if (rowId !== 'random') {
        unlockNextRow(rowId);
      }
      if (rowMeta) {
        speakClear(rowMeta.label);
      }
      setShowClearModal(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setChoiceStates(['idle', 'idle', 'idle', 'idle']);
      setAnswered(false);
    }
  }, [currentIndex, questions.length, rowId, unlockNextRow, rowMeta, speakClear]);

  const handleNextRow = useCallback(() => {
    if (rowId === 'random') {
      router.push('/learn');
      return;
    }
    const currentRowIndex = ROW_META.findIndex(r => r.id === rowId);
    if (currentRowIndex >= 0 && currentRowIndex < ROW_META.length - 1) {
      const nextRow = ROW_META[currentRowIndex + 1];
      router.push(`/learn/${nextRow.id}`);
    } else {
      router.push('/');
    }
  }, [rowId, router]);

  // Loading state
  if (!isLoaded || !progress || questions.length === 0 || !currentEntry) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-brand-purplePale">
        <motion.div
          className="text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⭐
        </motion.div>
      </main>
    );
  }

  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);
  const hasNextRow = rowId === 'random'
    ? false
    : ROW_META.findIndex(r => r.id === rowId) < ROW_META.length - 1;
  const earnedPokemon = rowId === 'random' ? [] : getRowEntries(rowId);

  // Star display
  const stars = Array.from({ length: 3 }, (_, i) => i < correctCount);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-brand-purplePale to-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push('/learn')}
            className="text-brand-purple font-bold text-lg flex items-center gap-1"
            aria-label="行選択に戻る"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            {rowMeta?.label}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">
              {currentIndex + 1} / {totalQuestions}
            </span>
            <div className="flex gap-1">
              {stars.map((filled, i) => (
                <motion.span
                  key={i}
                  className={filled ? 'animate-star-pop' : ''}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {filled ? '⭐' : '☆'}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <RowProgressBar progress={progressPercent} height={6} />
      </div>

      {/* Sparkle overlay */}
      <AnimatePresence>
        {showSparkle && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: Math.cos((i * Math.PI) / 4) * 100,
                  y: Math.sin((i * Math.PI) / 4) * 100,
                  opacity: 0,
                  scale: 1.5,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        {/* Streak indicator */}
        {streak >= 3 && (
          <motion.div
            className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={streak}
          >
            🔥 {streak}れんぞくせいかい！
          </motion.div>
        )}

        {/* Kana card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentKana}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <KanaCard kana={currentKana} />
            
            {isSpecial && (
              <p className="text-sm text-gray-500 font-medium">
                ただしい ひらがなを えらんでね！
              </p>
            )}

            <SpeakButton onSpeak={() => speakKana(currentKana)} />
          </motion.div>
        </AnimatePresence>

        {/* Choices */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`choices-${currentKana}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full flex justify-center"
          >
            {isSpecial && reverseQuiz ? (
              // Reverse format for を and ん
              <div className="grid grid-cols-2 gap-4 w-full max-w-md px-4">
                {reverseQuiz.choices.map((kana, index) => (
                  <ReverseChoiceCard
                    key={`${kana}-${index}`}
                    kana={kana}
                    state={choiceStates[index]}
                    onTap={() => handleReverseChoiceTap(index)}
                  />
                ))}
              </div>
            ) : quiz ? (
              <ChoiceGrid
                choices={quiz.choices}
                choiceStates={choiceStates}
                onChoiceTap={handleChoiceTap}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Clear Modal */}
      <ClearModal
        isOpen={showClearModal}
        rowLabel={rowMeta?.label || ''}
        earnedPokemon={sessionCorrectPokemons}
        onNext={handleNextRow}
        hasNextRow={hasNextRow}
      />
    </main>
  );
}
