import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { Task } from '@/types/Task';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleLongPress = () => {
    if (onDelete) {
      Alert.alert(
        'Delete Task',
        `Are you sure you want to delete "${task.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: onDelete }
        ]
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, task.completed && styles.completedContainer]}
      onPress={onToggle}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <TouchableOpacity 
          style={[styles.checkbox, task.completed && styles.completedCheckbox]}
          onPress={onToggle}
        >
          {task.completed && <Check size={16} color="#FFFFFF" />}
        </TouchableOpacity>
        <View style={styles.taskInfo}>
          <View style={styles.taskHeader}>
            <Text style={styles.emoji}>{task.emoji}</Text>
            <Text style={[styles.title, task.completed && styles.completedTitle]}>
              {task.title}
            </Text>
          </View>
          {task.timeBlock && (
            <Text style={styles.timeBlock}>⏰ {task.timeBlock}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
        {onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleLongPress}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  completedContainer: {
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
    borderColor: '#10B981',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedCheckbox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  taskInfo: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  timeBlock: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  rightSection: {
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  deleteButton: {
    padding: 4,
  },
});