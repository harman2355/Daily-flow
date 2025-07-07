import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    question: "What drives you to form good habits?",
    options: [
      { emoji: '🎯', text: 'Achieve goals' },
      { emoji: '💪', text: 'Boost confidence' },
      { emoji: '🌟', text: 'Be my best self' },
      { emoji: '💚', text: 'Improve health' },
    ]
  },
  {
    question: "What's your biggest struggle with planning?",
    options: [
      { emoji: '😵‍💫', text: 'Overwhelm' },
      { emoji: '⏰', text: 'Forgetting' },
      { emoji: '😴', text: 'Procrastination' },
      { emoji: '🤷‍♂', text: 'Not knowing where to start' },
    ]
  },
  {
    question: "What's your ideal daily vibe?",
    options: [
      { emoji: '🔥', text: 'Productive Hustler' },
      { emoji: '🌈', text: 'Chill and Mindful' },
      { emoji: '🎨', text: 'Creative Chaos' },
      { emoji: '🧘', text: 'Calm and Focused' },
    ]
  }
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save answers and navigate to main app
      router.replace('/(tabs)');
    }
  };

  const currentQuestion = onboardingData[currentStep];

  return (
    <LinearGradient
      colors={['#8B5CF6', '#EC4899', '#F59E0B']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentStep + 1} of {onboardingData.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / onboardingData.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleAnswer(option.text)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionText}>{option.text}</Text>
              <ChevronRight size={20} color="#8B5CF6" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>
          Let's personalize your experience! ✨
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  question: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.9,
  },
});