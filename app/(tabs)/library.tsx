import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Clock, Target, Heart, Zap, ChevronRight, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';

interface DayPlan {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tasks: string[];
  color: [string, string];
  duration: string;
  category: string;
}

interface QuickTask {
  emoji: string;
  task: string;
  category: string;
}

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const dayPlans: DayPlan[] = [
    {
      id: '1',
      title: 'Focus Mode',
      emoji: '📘',
      description: 'Deep work session with productivity techniques',
      tasks: ['🧘 5-min meditation', '💻 2-hour work block', '☕ Coffee break', '📝 Plan tomorrow'],
      color: ['#3B82F6', '#1D4ED8'],
      duration: '4 hours',
      category: 'productivity',
    },
    {
      id: '2',
      title: 'Sunday Reset',
      emoji: '🧺',
      description: 'Prepare for the week ahead',
      tasks: ['🧹 Clean house', '🛒 Grocery shopping', '📋 Week planning', '🧘 Self-care'],
      color: ['#10B981', '#047857'],
      duration: '6 hours',
      category: 'lifestyle',
    },
    {
      id: '3',
      title: 'Creative Flow',
      emoji: '🎨',
      description: 'Unleash your creative potential',
      tasks: ['🎵 Inspirational music', '✏️ Sketch ideas', '📚 Read for inspiration', '🖌️ Create something'],
      color: ['#F59E0B', '#D97706'],
      duration: '3 hours',
      category: 'creative',
    },
    {
      id: '4',
      title: 'Workout & Meal Prep',
      emoji: '🏋‍♂️',
      description: 'Health-focused day routine',
      tasks: ['🏃‍♂️ Morning run', '💪 Strength training', '🥗 Meal prep', '💧 Hydration tracking'],
      color: ['#EF4444', '#DC2626'],
      duration: '5 hours',
      category: 'health',
    },
    {
      id: '5',
      title: 'Mindful Monday',
      emoji: '🧘',
      description: 'Start the week with intention',
      tasks: ['🌅 Morning meditation', '📓 Journal writing', '🚶‍♀️ Mindful walk', '🌱 Gratitude practice'],
      color: ['#8B5CF6', '#7C3AED'],
      duration: '2 hours',
      category: 'wellness',
    },
    {
      id: '6',
      title: 'Social Connection',
      emoji: '👥',
      description: 'Nurture relationships and community',
      tasks: ['📞 Call family', '☕ Coffee with friend', '💌 Send thank you notes', '🎉 Plan social activity'],
      color: ['#EC4899', '#DB2777'],
      duration: '4 hours',
      category: 'social',
    },
    {
      id: '7',
      title: 'Learning Sprint',
      emoji: '📚',
      description: 'Dedicated time for skill development',
      tasks: ['📖 Read chapter', '🎥 Watch tutorial', '✍️ Take notes', '🧪 Practice exercises'],
      color: ['#06B6D4', '#0891B2'],
      duration: '3 hours',
      category: 'learning',
    },
    {
      id: '8',
      title: 'Digital Detox',
      emoji: '🌿',
      description: 'Disconnect and recharge naturally',
      tasks: ['📱 Phone in drawer', '🌳 Nature walk', '📖 Read physical book', '🧘 Meditation'],
      color: ['#84CC16', '#65A30D'],
      duration: '4 hours',
      category: 'wellness',
    },
  ];

  const householdTasks: QuickTask[] = [
    { emoji: '🛒', task: 'Buy groceries', category: 'shopping' },
    { emoji: '🧹', task: 'Sweep floor', category: 'cleaning' },
    { emoji: '🧺', task: 'Do laundry', category: 'cleaning' },
    { emoji: '🍳', task: 'Prep meals', category: 'cooking' },
    { emoji: '🧽', task: 'Clean kitchen', category: 'cleaning' },
    { emoji: '🛏️', task: 'Make beds', category: 'organizing' },
    { emoji: '🗑️', task: 'Take out trash', category: 'cleaning' },
    { emoji: '🚿', task: 'Clean bathroom', category: 'cleaning' },
    { emoji: '🧴', task: 'Organize pantry', category: 'organizing' },
    { emoji: '🪟', task: 'Clean windows', category: 'cleaning' },
    { emoji: '🌱', task: 'Water plants', category: 'gardening' },
    { emoji: '🧸', task: 'Tidy living room', category: 'organizing' },
  ];

  const categories = [
    { id: 'all', name: 'All Plans', emoji: '📋' },
    { id: 'productivity', name: 'Productivity', emoji: '⚡' },
    { id: 'health', name: 'Health', emoji: '💪' },
    { id: 'wellness', name: 'Wellness', emoji: '🧘' },
    { id: 'creative', name: 'Creative', emoji: '🎨' },
    { id: 'lifestyle', name: 'Lifestyle', emoji: '🏠' },
    { id: 'social', name: 'Social', emoji: '👥' },
    { id: 'learning', name: 'Learning', emoji: '📚' },
  ];

  const quickActionTemplates = [
    {
      title: '15-Min Tasks',
      emoji: '⚡',
      tasks: ['📧 Check emails', '🧹 Quick tidy', '💧 Drink water', '🌱 Water plants', '📝 Write note'],
      color: ['#8B5CF6', '#EC4899']
    },
    {
      title: 'Self-Care',
      emoji: '💆‍♀️',
      tasks: ['🧘 5-min meditation', '🛁 Take bath', '📚 Read book', '🎵 Listen music', '🌸 Skincare'],
      color: ['#10B981', '#06B6D4']
    }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? dayPlans 
    : dayPlans.filter(plan => plan.category === selectedCategory);

  const handlePlanSelect = (plan: DayPlan) => {
    Alert.alert(
      `Add "${plan.title}" to Today? 🎯`,
      `This will add ${plan.tasks.length} tasks to your daily plan:\n\n${plan.tasks.join('\n')}\n\nEstimated time: ${plan.duration}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add All Tasks', 
          style: 'default',
          onPress: () => {
            Alert.alert(
              'Success! 🎉', 
              `"${plan.title}" plan has been added to your daily schedule! ${plan.tasks.length} tasks are ready for you. Go to the Today tab to see them!`,
              [
                { text: 'Stay Here', style: 'cancel' },
                { 
                  text: 'Go to Today', 
                  style: 'default',
                  onPress: () => router.push('/(tabs)/')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleTaskAdd = (task: QuickTask) => {
    Alert.alert(
      'Task Added! ✅',
      `"${task.task}" has been added to your daily plan. Time to get it done! 💪`,
      [
        { text: 'Add Another', style: 'cancel' },
        { 
          text: 'Go to Today', 
          style: 'default',
          onPress: () => router.push('/(tabs)/')
        }
      ]
    );
  };

  const handleQuickAction = (template: any) => {
    Alert.alert(
      `Add ${template.title}? ⚡`,
      `This will add ${template.tasks.length} quick tasks:\n\n${template.tasks.join('\n')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add Tasks', 
          onPress: () => {
            Alert.alert(
              'Added! 🎉', 
              `${template.title} tasks are now in your daily plan! Check the Today tab to see them.`,
              [
                { text: 'Stay Here', style: 'cancel' },
                { 
                  text: 'Go to Today', 
                  style: 'default',
                  onPress: () => router.push('/(tabs)/')
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#F8FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Task Library 📚</Text>
          <Text style={styles.headerSubtitle}>
            Pre-built plans and quick tasks to boost your productivity
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/')}
          activeOpacity={0.8}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.selectedCategoryChip
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Day Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Day Plans</Text>
            <Text style={styles.planCount}>{filteredPlans.length} plans</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Pre-planned days to help you stay organized and motivated
          </Text>
          
          {filteredPlans.map((plan) => (
            <TouchableOpacity 
              key={plan.id} 
              style={styles.planCard}
              onPress={() => handlePlanSelect(plan)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={plan.color}
                style={styles.planGradient}
              >
                <View style={styles.planHeader}>
                  <View style={styles.planTitleContainer}>
                    <Text style={styles.planEmoji}>{plan.emoji}</Text>
                    <View style={styles.planInfo}>
                      <Text style={styles.planTitle}>{plan.title}</Text>
                      <Text style={styles.planDescription}>{plan.description}</Text>
                    </View>
                  </View>
                  <View style={styles.actionIndicator}>
                    <ChevronRight size={20} color="#FFFFFF" />
                  </View>
                </View>
                
                <View style={styles.planMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color="#FFFFFF" />
                    <Text style={styles.metaText}>{plan.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Target size={14} color="#FFFFFF" />
                    <Text style={styles.metaText}>{plan.tasks.length} tasks</Text>
                  </View>
                </View>
                
                <View style={styles.taskPreview}>
                  {plan.tasks.slice(0, 3).map((task, index) => (
                    <View key={index} style={styles.previewTaskContainer}>
                      <Text style={styles.previewTask}>{task}</Text>
                    </View>
                  ))}
                  {plan.tasks.length > 3 && (
                    <Text style={styles.moreTask}>
                      +{plan.tasks.length - 3} more tasks
                    </Text>
                  )}
                </View>

                <View style={styles.tapHint}>
                  <Sparkles size={12} color="#FFFFFF" />
                  <Text style={styles.tapHintText}>Tap to add to today</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Household Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Household Checklist</Text>
          <Text style={styles.sectionSubtitle}>
            Common household tasks to keep your space organized
          </Text>
          
          <View style={styles.householdGrid}>
            {householdTasks.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.householdItem}
                onPress={() => handleTaskAdd(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.householdEmoji}>{item.emoji}</Text>
                <Text style={styles.householdTask}>{item.task}</Text>
                <View style={styles.addIcon}>
                  <Plus size={16} color="#8B5CF6" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActionTemplates.map((template, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quickAction}
                onPress={() => handleQuickAction(template)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={template.color}
                  style={styles.quickActionGradient}
                >
                  <Text style={styles.quickActionEmoji}>{template.emoji}</Text>
                  <Text style={styles.quickActionText}>{template.title}</Text>
                  <Text style={styles.quickActionSubtext}>
                    {template.tasks.length} quick tasks
                  </Text>
                  <View style={styles.quickActionHint}>
                    <Plus size={14} color="#FFFFFF" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryScroll: {
    marginTop: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategoryChip: {
    backgroundColor: '#8B5CF6',
    borderColor: '#7C3AED',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  planCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
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
    alignItems: 'flex-start',
    flex: 1,
  },
  planEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  planDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
    lineHeight: 18,
  },
  actionIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  planMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
    opacity: 0.9,
  },
  taskPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  previewTaskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  previewTask: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  moreTask: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tapHintText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.9,
  },
  householdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  householdItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  householdEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  householdTask: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  addIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    position: 'relative',
  },
  quickActionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  quickActionHint: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 4,
  },
  bottomSpacing: {
    height: 40,
  },
});