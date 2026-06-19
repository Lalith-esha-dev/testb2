export const EXPLORE_ITEMS = [
  { id: '1', title: 'Getting Started', emoji: '🚀', description: 'Learn the basics of the app' },
  { id: '2', title: 'UI Components', emoji: '🎨', description: 'Explore reusable design patterns' },
  { id: '3', title: 'Navigation', emoji: '🧭', description: 'Move between screens with ease' },
  { id: '4', title: 'Best Practices', emoji: '✨', description: 'Tips for building great apps' },
];

export function findExploreItem(id) {
  return EXPLORE_ITEMS.find((item) => item.id === id);
}
