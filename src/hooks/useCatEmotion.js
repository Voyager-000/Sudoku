import { useState, useEffect, useRef } from 'react';
import { CAT_EMOTIONS } from '../engine/constants.js';
import { getThinkingDialogue } from '../engine/evaluator.js';

/**
 * Custom hook to manage Mochi the Cat's emotional states and speech bubble dialogues.
 */
export function useCatEmotion() {
  const [emotion, setEmotion] = useState(CAT_EMOTIONS.IDLE);
  const [dialogue, setDialogue] = useState("Hi! I'm Mochi, your Sudoku coach! Let's solve this together! 🐾");
  const [isTalking, setIsTalking] = useState(false);
  const timerRef = useRef(null);

  /**
   * Updates cat emotion and speech bubble based on game review report.
   * @param {object} reviewReport - From evaluateMove()
   */
  const triggerReaction = (reviewReport) => {
    if (!reviewReport) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setEmotion(reviewReport.emotion || CAT_EMOTIONS.HAPPY);
    setDialogue(reviewReport.message);
    setIsTalking(true);

    // After a few seconds, transition from shocked/happy back to idle/watching
    if (reviewReport.emotion !== CAT_EMOTIONS.CELEBRATE) {
      timerRef.current = setTimeout(() => {
        setEmotion(CAT_EMOTIONS.IDLE);
        setIsTalking(false);
      }, 4000);
    }
  };

  /**
   * Cat focuses when user selects an empty cell
   */
  const onSelectEmptyCell = () => {
    if (emotion !== CAT_EMOTIONS.CELEBRATE) {
      setEmotion(CAT_EMOTIONS.THINKING);
      setDialogue(getThinkingDialogue());
      setIsTalking(true);
    }
  };

  /**
   * Interactive petting/click handler for Mochi
   */
  const petCat = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setEmotion(CAT_EMOTIONS.HAPPY);
    setDialogue("Purrrr... Mochi believes in you! 🐱❤️");
    setIsTalking(true);
    timerRef.current = setTimeout(() => {
      setEmotion(CAT_EMOTIONS.IDLE);
      setIsTalking(false);
    }, 3000);
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
    petCat,
    setEmotion,
    setDialogue
  };
}
