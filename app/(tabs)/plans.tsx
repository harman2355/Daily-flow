import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Target } from 'lucide-react-native';

export default function PlansScreen() {
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const sampleTasks = [
    { time: '9:00 AM', task: 'Team meeting', emoji: '👥', day: 'Mon' },
    { time: '2:00 PM', task: 'Grocery shopping', emoji: '🛒', day: 'Tue' },
    { time: '11:00 AM', task: 'Workout', emoji: '💪', day: 'Wed' },
    { time: '3:00 PM', task: 'Doctor appointment', emoji: '⚕️', day: 'Thu' },
    { time: '10:00 AM', task: 'Project deadline', emoji: '📋', day: 'Fri' },
  ];

  return (
    <LinearGradient
      colors={['#F8FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Plans 📅</Text>
        <View style={styles.viewSelector}>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              selectedView === 'week' && styles.selectedSelector
            ]}
            onPress={() => setSelectedView('week')}
          >
            <Text style={[
              styles.selectorText,
              selectedView === 'week' && styles.selectedSelectorText
            ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              selectedView === 'month' && styles.selectedSelector
            ]}
            onPress={() => setSelectedView('month')}
          >
            <Text style={[
              styles.selectorText,
              selectedView === 'month' && styles.selectedSelectorText
            ]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedView === 'week' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.weekHeader}>
            {weekDays.map((day) => (
              <View key={day} style={styles.dayHeader}>
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.dayNumber}>
                  {new Date().getDate() + weekDays.indexOf(day)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <View key={time} style={styles.timeRow}>
                <Text style={styles.timeText}>{time}</Text>
                <View style={styles.timeSlots}>
                  {weekDays.map((day) => {
                    const task = sampleTasks.find(t => t.time === time && t.day === day);
                    return (
                      <View key={day} style={styles.timeSlot}>
                        {task && (
                          <View style={styles.taskBlock}>
                            <Text style={styles.taskEmoji}>{task.emoji}</Text>
                            <Text style={styles.taskText}>{task.task}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.monthView}>
            <View style={styles.monthHeader}>
              <Calendar size={24} color="#8B5CF6" />
              <Text style={styles.monthTitle}>
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
            </View>

            <View style={styles.monthGrid}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <View key={day} style={styles.monthDay}>
                  <Text style={styles.monthDayText}>{day}</Text>
                  {Math.random() > 0.7 && (
                    <View style={styles.monthDayTask}>
                      <Text style={styles.monthDayTaskText}>
                        {['🎯', '💻', '🏃‍♂️', '🛒'][Math.floor(Math.random() * 4)]}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            style={styles.actionButtonGradient}
          >
            <Target size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Set Goals</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#10B981', '#06B6D4']}
            style={styles.actionButtonGradient}
          >
            <Clock size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Time Block</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedSelector: {
    backgroundColor: '#8B5CF6',
  },
  selectorText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedSelectorText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 60,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  dayNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 4,
  },
  timeGrid: {
    marginBottom: 40,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    width: 60,
  },
  timeSlots: {
    flex: 1,
    flexDirection: 'row',
  },
  timeSlot: {
    flex: 1,
    height: 40,
    marginHorizontal: 1,
  },
  taskBlock: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    padding: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskEmoji: {
    fontSize: 12,
  },
  taskText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  monthView: {
    marginBottom: 40,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  monthDay: {
    width: '13%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  monthDayText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  monthDayTask: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthDayTaskText: {
    fontSize: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});