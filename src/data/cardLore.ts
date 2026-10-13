import { LORE_MAJOR } from './cardLore1';
import { LORE_WANDS, LORE_CUPS } from './cardLore2';
import { LORE_SWORDS, LORE_PENTACLES } from './cardLore3';
export const CARD_LORE: Record<string, [string, string, string, string]> = { ...LORE_MAJOR, ...LORE_WANDS, ...LORE_CUPS, ...LORE_SWORDS, ...LORE_PENTACLES };
