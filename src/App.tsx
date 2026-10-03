/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { TouchFeedback } from './components/TouchFeedback';
import { AudioController } from './components/AudioController';
import { SettingsModal } from './components/SettingsModal';

import { HomeDashboard } from './views/HomeDashboard';
import { MateriView } from './views/MateriView';
import { DetailMateriView } from './views/DetailMateriView';
import { BlurtingLab } from './views/BlurtingLab';
import { DigitalNotebook } from './views/DigitalNotebook';
import { LatihanSoalView } from './views/LatihanSoalView';
import { ErrorBankView } from './views/ErrorBankView';
import { MissionMapView } from './views/MissionMapView';
import { TimerMissionView } from './views/TimerMissionView';
import { TryoutTKAView } from './views/TryoutTKAView';
import { AITutorView } from './views/AITutorView';
import { ProgressView } from './views/ProgressView';
import { FocusModeView } from './views/FocusModeView';
import { SpiderMemoryGameView } from './views/SpiderMemoryGameView';
import { PersistentSpiderAmbience } from './components/PersistentSpiderAmbience';
import { SunflowerPlayer } from './components/SunflowerPlayer';

import { UserProgress, DailyTask, NotebookNote } from './types';
import { TOPICS, INITIAL_TASKS, INITIAL_ACHIEVEMENTS } from './data/curriculumData';
import { sound } from './services/soundEngine';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'tka_17days_progress_v2';

const DEFAULT_PROGRESS: UserProgress = {
  name: 'Ila',
  targetMajor: 'Kedokteran / Teknik Informatika',
  currentDay: 1,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 140,
  level: 1,
  completedTopicIds: [],
  completedBlurtingIds: [],
  needReviewTopicIds: [],
  solvedQuestionIds: [],
  correctCount: 4,
  wrongCount: 1,
  studyTimeSeconds: 45 * 60,
  dailyTasks: INITIAL_TASKS,
  achievements: INITIAL_ACHIEVEMENTS,
  errorBank: [
    {
      questionId: 'q-mat-2',
      subject: 'matematika',
      topicId: 'mat-spldv-spltv',
      mistakeCount: 1,
      lastWrongAt: new Date().toISOString().split('T')[0],
      isResolved: false,
    },
  ],
  notebookNotes: [],
  soundSettings: {
    musicEnabled: true,
    sfxEnabled: true,
    musicVolume: 0.4,
    sfxVolume: 0.7,
    musicMode: 'focus',
  },
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(TOPICS[0].id);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage error fallback
    }
  }, [progress]);

  const addXp = (amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 150) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        sound.playLevelUp();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#e11d48', '#38bdf8', '#fbbf24'],
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const handleSelectTab = (tab: string, topicId?: string) => {
    setActiveTab(tab);
    if (topicId) {
      setSelectedTopicId(topicId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicFromList = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('detail_materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompleteTopic = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTopicIds.includes(topicId);
      const nextCompleted = exists
        ? prev.completedTopicIds.filter((id) => id !== topicId)
        : [...prev.completedTopicIds, topicId];

      if (!exists) {
        addXp(15);
      }

      return {
        ...prev,
        completedTopicIds: nextCompleted,
      };
    });
  };

  const handleToggleNeedReview = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.needReviewTopicIds.includes(topicId);
      const nextList = exists
        ? prev.needReviewTopicIds.filter((id) => id !== topicId)
        : [...prev.needReviewTopicIds, topicId];
      return {
        ...prev,
        needReviewTopicIds: nextList,
      };
    });
  };

  const handleSaveToNotebook = (topicId: string, title: string, text: string) => {
    const newNote: NotebookNote = {
      id: `note-${Date.now()}`,
      topicId,
      title,
      subject: 'matematika',
      content: text,
      keyPoints: ['Poin Kunci Hasil Blurting', 'Konsep Esensial'],
      stickyNote: 'Catatan Active Recall Blurting!',
      stickers: ['🧠', '📌'],
      highlightColor: 'cyan',
      updatedAt: new Date().toISOString().split('T')[0],
      isBookmarked: true,
      isFavorite: true,
    };

    setProgress((prev) => ({
      ...prev,
      notebookNotes: [newNote, ...prev.notebookNotes],
    }));

    setActiveTab('notebook');
  };

  const handleAnswerQuestion = (
    questionId: string,
    isCorrect: boolean,
    topicId: string,
    subject: string
  ) => {
    setProgress((prev) => {
      const newSolved = prev.solvedQuestionIds.includes(questionId)
        ? prev.solvedQuestionIds
        : [...prev.solvedQuestionIds, questionId];

      let newErrorBank = [...prev.errorBank];

      if (!isCorrect) {
        const existingError = newErrorBank.find((e) => e.questionId === questionId);
        if (existingError) {
          existingError.mistakeCount += 1;
          existingError.lastWrongAt = new Date().toISOString().split('T')[0];
        } else {
          newErrorBank.push({
            questionId,
            topicId,
            subject: subject as any,
            mistakeCount: 1,
            lastWrongAt: new Date().toISOString().split('T')[0],
            isResolved: false,
          });
        }
      }

      return {
        ...prev,
        solvedQuestionIds: newSolved,
        correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
        wrongCount: !isCorrect ? prev.wrongCount + 1 : prev.wrongCount,
        errorBank: newErrorBank,
      };
    });
  };

  const handleResolveError = (questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      errorBank: prev.errorBank.filter((e) => e.questionId !== questionId),
    }));
  };

  const handleRecordStudyTime = (sec: number) => {
    setProgress((prev) => ({
      ...prev,
      studyTimeSeconds: prev.studyTimeSeconds + sec,
    }));
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
    setActiveTab('home');
  };

  const currentTopic = TOPICS.find((t) => t.id === selectedTopicId) || TOPICS[0];

  return (
    <div className="min-h-screen bg-[#0b0d14] text-slate-100 bg-spider-grid relative selection:bg-rose-600 selection:text-white">
      {/* Persistent Animated Spider Background Ambience (Webs & Glowing Embers) */}
      <PersistentSpiderAmbience />

      {/* Interactive Global Touch/Click Ripple Effect */}
      <TouchFeedback />

      {/* Sunflower (Spider-Man: Into the Spider-Verse) Music Player Widget */}
      <SunflowerPlayer />

      {/* Audio Controller Activation & Modal */}
      <AudioController
        unlocked={isAudioUnlocked}
        onUnlock={() => setIsAudioUnlocked(true)}
      />

      {/* Focus Mode Fullscreen View */}
      {isFocusMode && (
        <FocusModeView
          onClose={() => setIsFocusMode(false)}
          onRecordStudyTime={handleRecordStudyTime}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        progress={progress}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleFocus={() => setIsFocusMode(!isFocusMode)}
        isFocusMode={isFocusMode}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 pt-5 relative z-10">
        {activeTab === 'home' && (
          <HomeDashboard
            progress={progress}
            onUpdateTasks={(tasks) => setProgress((p) => ({ ...p, dailyTasks: tasks }))}
            onSelectTab={handleSelectTab}
            onAddXp={addXp}
          />
        )}

        {activeTab === 'game' && (
          <SpiderMemoryGameView onAddXp={addXp} />
        )}

        {activeTab === 'materi' && (
          <MateriView
            progress={progress}
            onSelectTopic={handleSelectTopicFromList}
            onSelectTab={handleSelectTab}
          />
        )}

        {activeTab === 'detail_materi' && (
          <DetailMateriView
            topic={currentTopic}
            progress={progress}
            onBack={() => setActiveTab('materi')}
            onGoToBlurting={(topId) => {
              setSelectedTopicId(topId);
              setActiveTab('blurting');
            }}
            onGoToNotebook={(topId) => {
              setSelectedTopicId(topId);
              setActiveTab('notebook');
            }}
            onToggleCompleteTopic={handleToggleCompleteTopic}
            onToggleNeedReview={handleToggleNeedReview}
          />
        )}

        {activeTab === 'blurting' && (
          <BlurtingLab
            initialTopicId={selectedTopicId}
            progress={progress}
            onAddXp={addXp}
            onSaveToNotebook={handleSaveToNotebook}
            onMarkTopicMastered={(topId) => {
              setProgress((p) => ({
                ...p,
                completedBlurtingIds: [...new Set([...p.completedBlurtingIds, topId])],
              }));
            }}
          />
        )}

        {activeTab === 'notebook' && (
          <DigitalNotebook
            progress={progress}
            onUpdateNotes={(notes) => setProgress((p) => ({ ...p, notebookNotes: notes }))}
            onAddXp={addXp}
          />
        )}

        {activeTab === 'latihan' && (
          <LatihanSoalView
            progress={progress}
            onAddXp={addXp}
            onAnswerQuestion={handleAnswerQuestion}
          />
        )}

        {activeTab === 'error_bank' && (
          <ErrorBankView
            progress={progress}
            onGoToTopic={(topId) => {
              setSelectedTopicId(topId);
              setActiveTab('detail_materi');
            }}
            onResolveError={handleResolveError}
          />
        )}

        {activeTab === 'map' && (
          <MissionMapView
            progress={progress}
            onSelectTab={handleSelectTab}
          />
        )}

        {activeTab === 'timer' && (
          <TimerMissionView
            onAddXp={addXp}
            onRecordStudyTime={handleRecordStudyTime}
          />
        )}

        {activeTab === 'tryout' && (
          <TryoutTKAView
            progress={progress}
            onAddXp={addXp}
            onRecordStudyTime={handleRecordStudyTime}
          />
        )}

        {activeTab === 'ai_tutor' && <AITutorView />}

        {activeTab === 'progress' && <ProgressView progress={progress} />}

        {activeTab === 'achievements' && <ProgressView progress={progress} />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        errorBankCount={progress.errorBank.length}
      />

      {/* Settings & Profile Modal */}
      <SettingsModal
        progress={progress}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateProfile={(name, targetMajor) => {
          setProgress((prev) => ({
            ...prev,
            name,
            targetMajor,
          }));
        }}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
