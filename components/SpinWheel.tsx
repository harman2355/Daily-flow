import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, RefreshCw } from 'lucide-react-native';
import { Task } from '@/types/Task';

const { width } = Dimensions.get('window');

interface SpinWheelProps {
  visible: boolean;
  onClose: () => void;
  tasks: Task[];
}

export function SpinWheel({ visible, onClose, tasks }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const spinWheel = () => {
    if (tasks.length === 0) return;
    
    setSpinning(true);
    setSelectedTask(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      setSelectedTask(tasks[randomIndex]);
      setSpinning(false);
    }, 2000);
  };

  const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Decision Spinner 🎡</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Let fate decide what to tackle next!
          </Text>

          <View style={styles.wheelContainer}>
            <View style={[styles.wheel, spinning && styles.spinning]}>
              {tasks.slice(0, 6).map((task, index) => (
                <View
                  key={task.id}
                  style={[
                    styles.wheelSegment,
                    { backgroundColor: colors[index % colors.length] }
                  ]}
                >
                  <Text style={styles.wheelEmoji}>{task.emoji}</Text>
                  <Text style={styles.wheelText} numberOfLines={2}>
                    {task.title}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.pointer} />
          </View>

          {selectedTask && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>🎉 Your task is:</Text>
              <View style={styles.selectedTaskCard}>
                <Text style={styles.selectedTaskEmoji}>{selectedTask.emoji}</Text>
                <Text style={styles.selectedTaskTitle}>{selectedTask.title}</Text>
              </View>
              <Text style={styles.encouragement}>
                You've got this! Time to make it happen! 💪
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.spinButton}
            onPress={spinWheel}
            disabled={spinning || tasks.length === 0}
          >
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.spinButtonGradient}
            >
              <RefreshCw size={20} color="#FFFFFF" />
              <Text style={styles.spinButtonText}>
                {spinning ? 'Spinning...' : 'Spin the Wheel!'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: width - 40,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  spinning: {
    transform: [{ rotate: '1080deg' }],
  },
  wheelSegment: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  wheelEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  wheelText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pointer: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#1F2937',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  selectedTaskCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedTaskEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  selectedTaskTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
  },
  encouragement: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  spinButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  spinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  spinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});