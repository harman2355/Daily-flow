import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react-native';

export default function ProgressScreen() {
  const streakDays = 7;
  const completedToday = 6;
  const totalToday = 8;
  const weeklyGoal = 35;
  const weeklyCompleted = 28;

  const weekData = [
    { day: 'Mon', completed: 5, total: 6 },
    { day: 'Tue', completed: 4, total: 5 },
    { day: 'Wed', completed: 6, total: 7 },
    { day: 'Thu', completed: 3, total: 4 },
    { day: 'Fri', completed: 5, total: 6 },
    { day: 'Sat', completed: 3, total: 4 },
    { day: 'Sun', completed: 2, total: 3 },
  ];

  const achievements = [
    { id: 1, title: 'First Week', emoji: '🎯', description: 'Complete 7 days in a row', unlocked: true },
    { id: 2, title: 'Early Bird', emoji: '🌅', description: 'Complete morning routine 5 times', unlocked: true },
    { id: 3, title: 'Consistency King', emoji: '👑', description: 'Maintain 30-day streak', unlocked: false },
    { id: 4, title: 'Productivity Pro', emoji: '💪', description: 'Complete 100 tasks', unlocked: true },
  ];

  const getEmoji = (percentage: number) => {
    if (percentage >= 90) return '🔥';
    if (percentage >= 70) return '😊';
    if (percentage >= 50) return '😐';
    return '😔';
  };

  const progressPercentage = (completedToday / totalToday) * 100;

  return (
    <LinearGradient
      colors={['#F8FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress 📊</Text>
        <Text style={styles.subtitle}>
          {getEmoji(progressPercentage)} Keep up the great work!
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Streak Card */}
        <View style={styles.streakCard}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            style={styles.streakGradient}
          >
            <View style={styles.streakHeader}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <View>
                <Text style={styles.streakNumber}>{streakDays}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
            </View>
            <Text style={styles.streakText}>
              Amazing! You're on fire! Keep this momentum going! 🚀
            </Text>
          </LinearGradient>
        </View>

        {/* Today's Progress */}
        <View style={styles.progressCard}>
          <View style={styles.cardHeader}>
            <Target size={24} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Today's Progress</Text>
          </View>
          
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {completedToday} of {totalToday} tasks completed
            </Text>
            <Text style={styles.progressEmoji}>
              {getEmoji(progressPercentage)}
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
        </View>

        {/* Weekly Overview */}
        <View style={styles.weeklyCard}>
          <View style={styles.cardHeader}>
            <Calendar size={24} color="#10B981" />
            <Text style={styles.cardTitle}>This Week</Text>
          </View>
          
          <View style={styles.weeklyStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyCompleted}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyGoal}</Text>
              <Text style={styles.statLabel}>Goal</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((weeklyCompleted / weeklyGoal) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
          
          <View style={styles.weekChart}>
            {weekData.map((day) => (
              <View key={day.day} style={styles.dayColumn}>
                <View style={styles.dayBar}>
                  <View 
                    style={[
                      styles.dayBarFill, 
                      { height: `${(day.completed / day.total) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <View style={styles.cardHeader}>
            <Award size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Achievements</Text>
          </View>
          
          {achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementItem,
                !achievement.unlocked && styles.lockedAchievement
              ]}
            >
              <Text style={styles.achievementEmoji}>
                {achievement.unlocked ? achievement.emoji : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.unlocked && (
                <Text style={styles.achievementCheck}>✅</Text>
              )}
            </View>
          ))}
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteCard}>
          <LinearGradient
            colors={['#10B981', '#06B6D4']}
            style={styles.quoteGradient}
          >
            <Text style={styles.quoteText}>
              "Progress, not perfection. Every small step counts! 💫"
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  streakCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  streakGradient: {
    padding: 20,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  streakNumber: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  streakText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  progressEmoji: {
    fontSize: 24,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#8B5CF6',
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  weekChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 60,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayBar: {
    width: 20,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  dayBarFill: {
    backgroundColor: '#10B981',
    width: '100%',
    borderRadius: 10,
  },
  dayLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 2,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  achievementCheck: {
    fontSize: 20,
  },
  quoteCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 40,
  },
  quoteGradient: {
    padding: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
});