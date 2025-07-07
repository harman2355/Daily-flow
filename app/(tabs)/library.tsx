import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, Target, Heart, Zap } from 'lucide-react-native';

export default function LibraryScreen() {
  const dayPlans = [
    {
      id: '1',
      title: 'Focus Mode',
      emoji: '📘',
      description: 'Deep work session with productivity techniques',
      tasks: ['🧘 5-min meditation', '💻 2-hour work block', '☕ Coffee break', '📝 Plan tomorrow'],
      color: ['#3B82F6', '#1D4ED8'],
      duration: '4 hours',
    },
    {
      id: '2',
      title: 'Sunday Reset',
      emoji: '🧺',
      description: 'Prepare for the week ahead',
      tasks: ['🧹 Clean house', '🛒 Grocery shopping', '📋 Week planning', '🧘 Self-care'],
      color: ['#10B981', '#047857'],
      duration: '6 hours',
    },
    {
      id: '3',
      title: 'Creative Flow',
      emoji: '🎨',
      description: 'Unleash your creative potential',
      tasks: ['🎵 Inspirational music', '✏️ Sketch ideas', '📚 Read for inspiration', '🖌️ Create something'],
      color: ['#F59E0B', '#D97706'],
      duration: '3 hours',
    },
    {
      id: '4',
      title: 'Workout & Meal Prep',
      emoji: '🏋‍♂️',
      description: 'Health-focused day routine',
      tasks: ['🏃‍♂️ Morning run', '💪 Strength training', '🥗 Meal prep', '💧 Hydration tracking'],
      color: ['#EF4444', '#DC2626'],
      duration: '5 hours',
    },
    {
      id: '5',
      title: 'Mindful Monday',
      emoji: '🧘',
      description: 'Start the week with intention',
      tasks: ['🌅 Morning meditation', '📓 Journal writing', '🚶‍♀️ Mindful walk', '🌱 Gratitude practice'],
      color: ['#8B5CF6', '#7C3AED'],
      duration: '2 hours',
    },
    {
      id: '6',
      title: 'Social Connection',
      emoji: '👥',
      description: 'Nurture relationships and community',
      tasks: ['📞 Call family', '☕ Coffee with friend', '💌 Send thank you notes', '🎉 Plan social activity'],
      color: ['#EC4899', '#DB2777'],
      duration: '4 hours',
    },
  ];

  const householdTasks = [
    { emoji: '🛒', task: 'Buy groceries' },
    { emoji: '🧹', task: 'Sweep floor' },
    { emoji: '🧺', task: 'Do laundry' },
    { emoji: '🍳', task: 'Prep meals' },
    { emoji: '🧽', task: 'Clean kitchen' },
    { emoji: '🛏️', task: 'Make beds' },
    { emoji: '🗑️', task: 'Take out trash' },
    { emoji: '🚿', task: 'Clean bathroom' },
  ];

  return (
    <LinearGradient
      colors={['#F8FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Task Library 📚</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curated Day Plans</Text>
          <Text style={styles.sectionSubtitle}>
            Pre-planned days to help you stay organized and motivated
          </Text>
          
          {dayPlans.map((plan) => (
            <TouchableOpacity key={plan.id} style={styles.planCard}>
              <LinearGradient
                colors={plan.color}
                style={styles.planGradient}
              >
                <View style={styles.planHeader}>
                  <View style={styles.planTitleContainer}>
                    <Text style={styles.planEmoji}>{plan.emoji}</Text>
                    <View>
                      <Text style={styles.planTitle}>{plan.title}</Text>
                      <Text style={styles.planDescription}>{plan.description}</Text>
                    </View>
                  </View>
                  <View style={styles.planMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={12} color="#FFFFFF" />
                      <Text style={styles.metaText}>{plan.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Target size={12} color="#FFFFFF" />
                      <Text style={styles.metaText}>{plan.tasks.length} tasks</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.taskPreview}>
                  {plan.tasks.slice(0, 3).map((task, index) => (
                    <Text key={index} style={styles.previewTask}>
                      {task}
                    </Text>
                  ))}
                  {plan.tasks.length > 3 && (
                    <Text style={styles.moreTask}>
                      +{plan.tasks.length - 3} more tasks
                    </Text>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Household Checklist</Text>
          <Text style={styles.sectionSubtitle}>
            Common household tasks to keep your space organized
          </Text>
          
          <View style={styles.householdGrid}>
            {householdTasks.map((item, index) => (
              <TouchableOpacity key={index} style={styles.householdItem}>
                <Text style={styles.householdEmoji}>{item.emoji}</Text>
                <Text style={styles.householdTask}>{item.task}</Text>
                <Plus size={16} color="#8B5CF6" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                style={styles.quickActionGradient}
              >
                <Zap size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>15-Min Tasks</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#10B981', '#06B6D4']}
                style={styles.quickActionGradient}
              >
                <Heart size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Self-Care</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 20,
  },
  planCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  planGradient: {
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  planTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  planDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  planMeta: {
    alignItems: 'flex-end',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  taskPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  previewTask: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moreTask: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  householdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  householdItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  householdEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  householdTask: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
});