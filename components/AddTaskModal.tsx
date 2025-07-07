import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { X, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '@/types/Task';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
}

const emojis = [
  '💻', '🏃‍♂️', '🛒', '🧹', '📚', '🍳', '📞', '🎨', 
  '🧘', '💪', '🌱', '🚗', '✍️', '🎵', '🏠', '💡',
  '🎯', '⚡', '🌟', '🔥', '💎', '🚀', '🎪', '🎭'
];

const priorities = [
  { value: 'high', label: 'High', color: '#EF4444', emoji: '🔴' },
  { value: 'medium', label: 'Medium', color: '#F59E0B', emoji: '🟡' },
  { value: 'low', label: 'Low', color: '#10B981', emoji: '🟢' }
];

const categories = [
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'health', label: 'Health', emoji: '💪' },
  { value: 'household', label: 'Household', emoji: '🏠' },
  { value: 'personal', label: 'Personal', emoji: '👤' },
  { value: 'creative', label: 'Creative', emoji: '🎨' },
  { value: 'other', label: 'Other', emoji: '📋' }
];

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💻');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [timeBlock, setTimeBlock] = useState('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Oops! 😅', 'Please enter a task title to continue.');
      return;
    }

    onAdd({
      title: title.trim(),
      emoji: selectedEmoji,
      priority: selectedPriority as 'high' | 'medium' | 'low',
      category: selectedCategory as 'work' | 'health' | 'household' | 'personal' | 'creative' | 'other',
      timeBlock: timeBlock.trim() || undefined,
      completed: false,
      createdAt: new Date(),
    });

    // Reset form
    setTitle('');
    setSelectedEmoji('💻');
    setSelectedPriority('medium');
    setSelectedCategory('work');
    setTimeBlock('');
    setShowTimeSlots(false);
    onClose();

    // Success feedback
    Alert.alert('Success! 🎉', 'Your task has been added to today\'s plan!');
  };

  const handleTimeSlotSelect = (slot: string) => {
    setTimeBlock(slot);
    setShowTimeSlots(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Sparkles size={24} color="#FFFFFF" />
                <Text style={styles.title}>Add New Task</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.formContent}>
              <Text style={styles.label}>What needs to be done? ✨</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="e.g., Finish project presentation"
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={100}
              />

              <Text style={styles.label}>Choose an Emoji 😊</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiContainer}>
                {emojis.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={[
                      styles.emojiButton,
                      selectedEmoji === emoji && styles.selectedEmoji
                    ]}
                    onPress={() => setSelectedEmoji(emoji)}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.label}>Priority Level 🎯</Text>
              <View style={styles.priorityContainer}>
                {priorities.map((priority) => (
                  <TouchableOpacity
                    key={priority.value}
                    style={[
                      styles.priorityButton,
                      selectedPriority === priority.value && styles.selectedPriority
                    ]}
                    onPress={() => setSelectedPriority(priority.value)}
                  >
                    <Text style={styles.priorityEmoji}>{priority.emoji}</Text>
                    <Text style={[
                      styles.priorityText,
                      selectedPriority === priority.value && styles.selectedPriorityText
                    ]}>
                      {priority.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Category 📂</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.value}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.value && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.value)}
                  >
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.value && styles.selectedCategoryText
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Time Block (Optional) ⏰</Text>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => setShowTimeSlots(!showTimeSlots)}
              >
                <Text style={[
                  styles.timeInputText,
                  !timeBlock && styles.timeInputPlaceholder
                ]}>
                  {timeBlock || 'Select a time slot'}
                </Text>
              </TouchableOpacity>

              {showTimeSlots && (
                <View style={styles.timeSlotsContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {timeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot}
                        style={[
                          styles.timeSlot,
                          timeBlock === slot && styles.selectedTimeSlot
                        ]}
                        onPress={() => handleTimeSlotSelect(slot)}
                      >
                        <Text style={[
                          styles.timeSlotText,
                          timeBlock === slot && styles.selectedTimeSlotText
                        ]}>
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.addButton, !title.trim() && styles.disabledButton]}
              onPress={handleAdd}
              disabled={!title.trim()}
            >
              <LinearGradient
                colors={title.trim() ? ['#10B981', '#06B6D4'] : ['#D1D5DB', '#D1D5DB']}
                style={styles.addButtonGradient}
              >
                <Text style={styles.addButtonText}>Add Task 🚀</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  form: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
    textAlignVertical: 'top',
  },
  emojiContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  emojiButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedEmoji: {
    backgroundColor: '#8B5CF6',
    borderColor: '#7C3AED',
  },
  emojiText: {
    fontSize: 24,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPriority: {
    backgroundColor: '#8B5CF6',
    borderColor: '#7C3AED',
  },
  priorityEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  priorityText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedPriorityText: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: '30%',
  },
  selectedCategory: {
    backgroundColor: '#8B5CF6',
    borderColor: '#7C3AED',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  timeInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F9FAFB',
  },
  timeInputText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  timeInputPlaceholder: {
    color: '#9CA3AF',
  },
  timeSlotsContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeSlot: {
    backgroundColor: '#8B5CF6',
    borderColor: '#7C3AED',
  },
  timeSlotText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});