import { describe, it, expect } from 'vitest';
import { EXPLORE_ITEMS, findExploreItem } from '../screens/exploreItems';

describe('exploreItems', () => {
  it('exposes the expected number of items', () => {
    expect(EXPLORE_ITEMS).toHaveLength(4);
  });

  it('every item has the required fields', () => {
    for (const item of EXPLORE_ITEMS) {
      expect(typeof item.id).toBe('string');
      expect(typeof item.title).toBe('string');
      expect(typeof item.emoji).toBe('string');
      expect(typeof item.description).toBe('string');
    }
  });

  it('findExploreItem returns the matching item by id', () => {
    expect(findExploreItem('1')).toEqual(EXPLORE_ITEMS[0]);
    expect(findExploreItem('3')).toEqual(EXPLORE_ITEMS[2]);
  });

  it('findExploreItem returns undefined for unknown ids', () => {
    expect(findExploreItem('does-not-exist')).toBeUndefined();
    expect(findExploreItem('')).toBeUndefined();
  });
});
