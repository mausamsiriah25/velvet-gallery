// [unsplash photo id, width, height, category, title, description, tags]
// Heights vary on purpose to give the masonry layout its rhythm.
// To swap a photo, replace the id (the part after "photo-" in an Unsplash URL).
const RAW = [
  ['1522337660859-02fbefca4702', 4, 5, 'Haircuts', 'The soft layered bob', 'A collarbone bob with feathered layers that move with every turn.', ['bob', 'layers', 'short']],
  ['1560066984-138dadb4c035', 3, 2, 'Salon Interiors', 'The main floor', 'Warm light, deep tones and a quiet room made for long appointments.', ['interior', 'studio', 'chairs']],
  ['1531746020798-e6953c6e8e04', 2, 3, 'Blonde', 'Champagne blonde', 'Lived-in blonde with a creamy, lightly toned finish.', ['blonde', 'toner', 'long']],
  ['1519699047748-de8e457a634e', 4, 5, 'Brunette', 'Glossy espresso', 'Deep brunette with a mirror-like gloss treatment.', ['brunette', 'gloss', 'shine']],
  ['1562322140-8baeececf3df', 1, 1, 'Haircuts', 'Precision at the shears', 'Clean, deliberate sectioning for a sharp finished line.', ['cut', 'precision', 'stylist']],
  ['1589156280159-27698a70f29e', 3, 4, 'Curly Hair', 'Defined curls', 'Curl-by-curl shaping that keeps volume and bounce.', ['curls', 'volume', 'texture']],
  ['1492106087820-71f1a00d2b11', 2, 3, 'Balayage', 'Sun-washed balayage', 'Hand-painted highlights that grow out softly.', ['balayage', 'highlights', 'long']],
  ['1521590832167-7bcbfaa6381f', 4, 3, 'Salon Interiors', 'The styling stations', 'Backlit mirrors and a calm, editorial palette.', ['interior', 'mirrors']],
  ['1534528741775-53994a69daeb', 4, 5, 'Transformations', 'Dark to dimensional', 'A full colour change, from flat dark brown to rich, dimensional tones.', ['transformation', 'color', 'before-after']],
  ['1580618672591-eb180b1a973f', 3, 4, 'Transformations', 'Consultation first', 'Every transformation starts with a conversation about your hair and your routine.', ['consultation', 'stylist', 'client']],
  ['1517841905240-472988babdf9', 2, 3, 'Brunette', 'Chestnut movement', 'Warm chestnut with long, polished layers.', ['brunette', 'chestnut', 'layers']],
  ['1595476108010-b4d1f102b1b1', 3, 2, 'Haircuts', 'Blow-dry finish', 'Volume and shape, finished by hand.', ['blowdry', 'finish', 'styling']],
  ['1605497788044-5a32c7078486', 4, 5, 'Hair Color', 'Copper glow', 'A saturated copper that catches the light.', ['copper', 'red', 'color']],
  ['1494790108377-be9c29b29330', 1, 1, 'Blonde', 'Honey blonde', 'Warm, buttery blonde with soft root blending.', ['blonde', 'honey', 'rootmelt']],
  ['1438761681033-6461ffad8d80', 2, 3, 'Balayage', 'Caramel melt', 'Caramel balayage melted into a brunette base.', ['balayage', 'caramel', 'brunette']],
  ['1531123897727-8f129e1688ce', 3, 4, 'Curly Hair', 'Spiral texture', 'Natural spirals cut dry to respect the curl pattern.', ['curly', 'dry-cut', 'spirals']],
  ['1524504388940-b1c1722653e1', 4, 5, 'Hair Color', 'Soft rose tint', 'A subtle rose gloss over pale blonde.', ['rose', 'gloss', 'pastel']],
  ['1633681926022-84c23e8cb2d6', 3, 2, 'Salon Interiors', 'The colour bar', 'Where formulas are mixed and timed to the minute.', ['interior', 'color-bar']],
  ['1544005313-94ddf0286df2', 2, 3, 'Haircuts', 'Long layers, light ends', 'Long layers cut to add lift without losing length.', ['layers', 'long', 'cut']],
  ['1529626455594-4ff0802cfb7e', 4, 5, 'Transformations', 'Short and sleek', 'A big chop, finished with a glossy, blunt line.', ['transformation', 'short', 'blunt']],
  ['1508214751196-bcfd4ca60f91', 3, 4, 'Brunette', 'Mocha waves', 'Loose waves in a rich mocha shade.', ['brunette', 'waves', 'mocha']],
  ['1520813792240-56fc4a3765a7', 2, 3, 'Blonde', 'Platinum, softened', 'Bright platinum with a lived-in root.', ['blonde', 'platinum', 'bleach']],
];

const W = 640;
const unsplash = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces,entropy&w=${w}&h=${h}&q=80`;

export const INITIAL_IMAGES = RAW.map(([id, rw, rh, category, title, description, tags], i) => {
  const h = Math.round((W * rh) / rw);
  return {
    id: `seed-${i + 1}`,
    src: unsplash(id, W, h),
    full: unsplash(id, 1400, Math.round((1400 * rh) / rw)),
    w: W,
    h,
    category,
    title,
    description,
    tags,
    alt: `${title}: ${description}`,
    isLocal: false,
    isNew: false,
  };
});
