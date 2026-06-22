import { describe, it, expect } from 'vitest';
import { colors, radius } from '../theme/colors';

describe('theme/colors', () => {
  it('exports the new primary palette', () => {
    expect(colors.primary).toBe('#6366f1');
    expect(colors.primaryDark).toBe('#4f46e5');
    expect(colors.primarySoft).toBe('#eef2ff');
    expect(colors.primaryLight).toBe('#c7d2fe');
  });

  it('exports the new accent palette', () => {
    expect(colors.accent).toBe('#e11d48');
    expect(colors.accentSoft).toBe('#ffe4e6');
  });

  it('exports neutral and status tokens', () => {
    expect(colors.background).toBe('#f1f5f9');
    expect(colors.surface).toBe('#ffffff');
    expect(colors.text).toBe('#0f172a');
    expect(colors.textMuted).toBe('#64748b');
    expect(colors.warning).toBe('#d97706');
  });

  it('exports an overlay token', () => {
    expect(colors.overlay).toBe('rgba(15, 23, 42, 0.04)');
  });

  it('exports a radius scale with all named steps', () => {
    expect(radius).toEqual({ sm: 10, md: 16, lg: 22, xl: 28, full: 999 });
  });
});
