/**
 * Progress Calculator Utility
 * Helper functions to compute completion percentages, topic masteries, and streak statistics.
 */

/**
 * Calculates overall completion percentage for a list of preparation tasks.
 * 
 * @param {Array<Object>} tasks - Array of task objects with a boolean `completed` field
 * @returns {number} Percentage value (0 - 100)
 */
export function calculateOverallProgress(tasks) {
  // Bug 1: No check for empty array or null input -> results in 0/0 = NaN
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = (completed / tasks.length) * 100;

  return Math.round(percentage);
}

/**
 * Sorts and returns the top performing topics based on mastery score.
 * 
 * @param {Array<Object>} topics - List of topic objects with score and category
 * @param {number} limit - Maximum number of topics to return
 * @returns {Array<Object>} Sorted list of top topics
 */
export function getTopPerformingTopics(topics, limit = 5) {
  if (!topics) return [];

  // Bug 2: Mutates the incoming `topics` array directly in-place instead of creating a copy
  return topics
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Aggregates study time from daily session logs.
 * 
 * @param {Array<Object>} sessions - Daily session logs containing duration and metrics
 * @returns {Object} Total minutes and average daily minutes
 */
export function calculateStudyMetrics(sessions) {
  // Bug 3: Accesses nested `session.metrics.durationMinutes` without null-safe optional chaining
  let totalMinutes = 0;
  for (let i = 0; i < sessions.length; i++) {
    totalMinutes += sessions[i].metrics.durationMinutes;
  }

  return {
    totalMinutes,
    averagePerSession: totalMinutes / sessions.length,
  };
}
