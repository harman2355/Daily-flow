import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Sparkles, RotateCcw } from 'lucide-react-native';
import { TaskCard } from '@/components/TaskCard';
import { SpinWheel } from '@/components/SpinWheel';
import { AddTaskModal } from '@/components/AddTaskModal';
import { Task } from '@/types/Task';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Morning workout',
      emoji: '🏃‍♂️',
      priority: 'high',
      timeBlock: '7:00 AM',
      completed: false,
      category: 'health'
    },
    {
      id: '2',
      title: 'Finish project presentation',
      emoji: '💻',
      priority: 'high',
      timeBlock: '10:00 AM',
      completed: false,
      category: 'work'
    },
    {
      id: '3',
      title: 'Buy groceries',
      emoji: '🛒',
      priority: 'medium',
      timeBlock: '2:00 PM',
      completed: false,
      category: 'household'
    },
    {
      id: '4',
      title: 'Call mom',
      emoji: '📞',
      priority: 'low',
      timeBlock: '6:00 PM',
      completed: true,
      category: 'personal'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    setCompletedToday(completed);
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <LinearGradient
      colors={['#F8FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 🌅</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            style={styles.progressGradient}
          >
            <View style={styles.progressHeader}>
              <Sparkles size={24} color="#FFFFFF" />
              <Text style={styles.progressTitle}>Today's Progress</Text>
            </View>
            <Text style={styles.progressText}>
              {completedToday} of {tasks.length} tasks completed
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${tasks.length ? (completedToday / tasks.length) * 100 : 0}%` }
                  ]} 
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Decision Helper */}
        {incompleteTasks.length > 1 && (
          <TouchableOpacity
            style={styles.spinButton}
            onPress={() => setShowSpinWheel(true)}
          >
            <LinearGradient
              colors={['#F59E0B', '#EF4444']}
              style={styles.spinButtonGradient}
            >
              <RotateCcw size={20} color="#FFFFFF" />
              <Text style={styles.spinButtonText}>
                Feeling overwhelmed? Let's spin! 🎡
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Tasks List */}
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>📝</Text>
              <Text style={styles.emptyStateTitle}>No tasks yet!</Text>
              <Text style={styles.emptyStateText}>
                Add your first task or browse the library for inspiration
              </Text>
            </View>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTask}
      />

      <SpinWheel
        visible={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        tasks={incompleteTasks}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  progressCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressGradient: {
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  spinButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  spinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  spinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tasksContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});