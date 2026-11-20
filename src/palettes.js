/**
 * Colour combinations.
 *
 * One idea, six mixes: a near-black page, cards in beige or white, red ink for
 * the words that matter, and yellow + green for everything that moves.
 *
 *   ink      page background (the black)
 *   paper    page background when the light theme is on
 *   card     the beige card surface
 *   cardAlt  the white card surface
 *   cardInk  text colour inside a card
 *   red      emphasis text — names, figures, key words
 *   yellow   animation colour A (bars, marks, sparks)
 *   green    animation colour B (bars, grid lines, live dots)
 *   line     grid line RGB on the dark page
 */

export const PALETTES = [
  {
    id: 'rust',
    name: 'Beige & Rust',
    note: 'Black page, rust red, olive green',
    ink: '#0d0c0b',
    paper: '#ece6d9',
    card: '#f3ecdd',
    cardAlt: '#fffdf8',
    cardInk: '#17130e',
    red: '#c0392b',
    yellow: '#edb744',
    green: '#3f8f66',
    line: [150, 140, 120],
    grain: 0.05,
  },
  {
    id: 'brick',
    name: 'Bone & Brick',
    note: 'Cool bone card, brick red, moss',
    ink: '#0b0b0c',
    paper: '#eceae4',
    card: '#f1eee6',
    cardAlt: '#ffffff',
    cardInk: '#141416',
    red: '#b23a33',
    yellow: '#e8c35a',
    green: '#4b8f5e',
    line: [142, 140, 134],
    grain: 0.045,
  },
  {
    id: 'clay',
    name: 'Cream & Clay',
    note: 'Warm cream, terracotta, sage',
    ink: '#100c0a',
    paper: '#f2ebdf',
    card: '#f8f1e3',
    cardAlt: '#fffdf9',
    cardInk: '#1b140f',
    red: '#cb4a2f',
    yellow: '#f0bf55',
    green: '#5b8f6a',
    line: [160, 142, 120],
    grain: 0.06,
  },
  {
    id: 'forest',
    name: 'Linen & Forest',
    note: 'Green-led, red kept for figures',
    ink: '#080b0a',
    paper: '#e8eee8',
    card: '#eff1e7',
    cardAlt: '#fdfffb',
    cardInk: '#101613',
    red: '#bb3b2c',
    yellow: '#dcc152',
    green: '#2f7d5b',
    line: [128, 148, 136],
    grain: 0.04,
  },
  {
    id: 'signal',
    name: 'Sand & Signal',
    note: 'Loud saffron, sand card, deep green',
    ink: '#0d0b07',
    paper: '#f3ecda',
    card: '#f6edd8',
    cardAlt: '#fffcf4',
    cardInk: '#191309',
    red: '#c53f24',
    yellow: '#f5bb21',
    green: '#39815c',
    line: [166, 148, 110],
    grain: 0.065,
  },
  {
    id: 'press',
    name: 'Paper & Press',
    note: 'Newsprint, one red, quiet green',
    ink: '#0a0a0a',
    paper: '#eeece7',
    card: '#f2f0ea',
    cardAlt: '#ffffff',
    cardInk: '#121211',
    red: '#a8312a',
    yellow: '#d9bd5c',
    green: '#3d7a5f',
    line: [140, 138, 132],
    grain: 0.075,
  },
];

export const DEFAULT_PALETTE = 'rust';

export function getPalette(id) {
  return PALETTES.find((p) => p.id === id) || PALETTES[0];
}
