import { useState, useEffect, useRef } from 'react';
import { CAT_EMOTIONS } from '../engine/constants.js';
import {
  getThinkingReaction,
  getStudyReaction,
  getHintReaction,
  getPoliteReaction,
  getLoveReaction,
  getGojoReaction
} from '../engine/evaluator.js';

import { sound } from '../utils/audio.js';

export function useCatEmotion() {
  const [emotion, setEmotion] = useState(CAT_EMOTIONS.POLITE);
  const [dialogue, setDialogue] = useState("Politely waiting for your grandmaster move :) 🐾");
  const [isTalking, setIsTalking] = useState(false);
  const timerRef = useRef(null);

  const setEmotionWithReset = (newEmotion, newMessage, resetDelay = 4000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setEmotion(newEmotion);
    setDialogue(newMessage);
    setIsTalking(true);

    if (newEmotion !== CAT_EMOTIONS.BOSS && resetDelay > 0) {
      timerRef.current = setTimeout(() => {
        setEmotion(CAT_EMOTIONS.POLITE);
        setIsTalking(false);
      }, resetDelay);
    }
  };

  const triggerReaction = (reviewReport) => {
    if (!reviewReport) return;
    setEmotionWithReset(reviewReport.emotion, reviewReport.message, 4500);
  };

  const onSelectEmptyCell = (difficulty = 'easy') => {
    const reaction = getThinkingReaction(difficulty);
    setEmotionWithReset(reaction.emotion, reaction.message, 4000);
  };

  const onToggleNotes = (nextNotesMode) => {
    sound.playTap();
    const reaction = getStudyReaction(nextNotesMode);
    setEmotionWithReset(reaction.emotion, reaction.message, 3500);
  };

  const onHintGiven = (digit) => {
    sound.playChime();
    const reaction = getHintReaction(digit);
    setEmotionWithReset(reaction.emotion, reaction.message, 4000);
  };

  const onResetGame = () => {
    sound.playTap();
    const reaction = getPoliteReaction();
    setEmotionWithReset(reaction.emotion, reaction.message, 4000);
  };

  const petCat = () => {
    sound.playPurr();
    const reaction = getLoveReaction();
    setEmotionWithReset(reaction.emotion, reaction.message, 3500);
  };

  const onGojoSolve = () => {
    const reaction = getGojoReaction();
    setEmotionWithReset(reaction.emotion, reaction.message, 6000);
  };

  const onUndoMove = () => {
    setEmotionWithReset(
      CAT_EMOTIONS.SAD,
      "We take that back... let's pretend that move never happened 🥺",
      3500
    );
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    emotion,
    dialogue,
    isTalking,
    triggerReaction,
    onSelectEmptyCell,
    onToggleNotes,
    onHintGiven,
    onResetGame,
    petCat,
    onGojoSolve,
    onUndoMove
  };
}
