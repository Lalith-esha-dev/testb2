export const EXPLORE_ITEMS = [
  {
    id: '1',
    title: 'Getting Started',
    emoji: '🚀',
    description: 'Learn the basics of the app',
    tag: 'Guides',
  },
  {
    id: '2',
    title: 'UI Components',
    emoji: '🎨',
    description: 'Explore reusable design patterns',
    tag: 'UI',
  },
  {
    id: '3',
    title: 'Navigation',
    emoji: '🧭',
    description: 'Move between screens with ease',
    tag: 'Guides',
  },
  {
    id: '4',
    title: 'Best Practices',
    emoji: '✨',
    description: 'Tips for building great apps',
    tag: 'Tips',
  },
];

export const EXPLORE_FILTERS = ['All', 'Guides', 'UI', 'Tips'];

export function findExploreItem(id) {
  return EXPLORE_ITEMS.find((item) => item.id === id);
}
