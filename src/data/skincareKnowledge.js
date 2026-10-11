// Skincare Knowledge Base & Rules Engine

export const SKIN_TYPES = [
  {
    id: 'dry',
    title: 'Dry',
    description: 'Feels tight, rough, or flaky. Minimal visible oiliness throughout the day.',
    icon: 'Droplets',
    focus: 'Lipid barrier repair, rich hydration, occlusives',
    keyActives: ['Ceramides', 'Squalane', 'Hyaluronic Acid', 'Shea Butter', 'Panthenol']
  },
  {
    id: 'oily',
    title: 'Oily',
    description: 'Visible shine across forehead, nose, and cheeks. Prone to enlarged pores.',
    icon: 'Sparkles',
    focus: 'Sebum balancing, pore refinement, non-comedogenic hydration',
    keyActives: ['Niacinamide', 'Salicylic Acid (BHA)', 'Zinc PCA', 'Green Tea Extract']
  },
  {
    id: 'combination',
    title: 'Combination',
    description: 'Oily T-zone (forehead, nose, chin) paired with normal or dry cheeks.',
    icon: 'Layers',
    focus: 'Zonal balance, lightweight layering, dual-action moisture',
    keyActives: ['Niacinamide', 'Hyaluronic Acid', 'Centella Asiatica', 'Glycerin']
  },
  {
    id: 'sensitive',
    title: 'Sensitive',
    description: 'Easily turns red, stings, or reacts to fragrance and harsh weather.',
    icon: 'Shield',
    focus: 'Calming inflammation, minimalist formulas, barrier soothing',
    keyActives: ['Centella Asiatica (Cica)', 'Colloidal Oat', 'Allantoin', 'Ceramides']
  },
  {
    id: 'normal',
    title: 'Normal / Balanced',
    description: 'Evenly balanced, neither overly dry nor oily. Rarely reacts to products.',
    icon: 'Smile',
    focus: 'Preventative care, antioxidant defense, consistent radiance',
    keyActives: ['Vitamin C', 'Peptides', 'Hyaluronic Acid', 'Niacinamide']
  }
];

export const SKIN_CONCERNS = [
  { id: 'breakouts', label: 'Breakouts & Blemishes', desc: 'Active pimples, blackheads, or clogged pores', icon: 'AlertCircle' },
  { id: 'dehydration', label: 'Dehydration & Tightness', desc: 'Dull surface tension or lack of internal water', icon: 'Droplets' },
  { id: 'dullness', label: 'Dullness & Uneven Tone', desc: 'Lack of glow, post-inflammatory dark spots', icon: 'Sun' },
  { id: 'redness', label: 'Redness & Flushing', desc: 'Visible capillaries, rosacea tendency, or blotchiness', icon: 'Heart' },
  { id: 'fine_lines', label: 'Fine Lines & Elasticity', desc: 'Expression lines, loss of firmness, early aging signs', icon: 'Clock' },
  { id: 'texture', label: 'Rough Texture & Large Pores', desc: 'Uneven skin feel and visible follicular openings', icon: 'Grid' }
];

export const SENSITIVITY_LEVELS = [
  { id: 'low', label: 'Resilient / Low', desc: 'Skin tolerates most active ingredients and essential oils well.' },
  { id: 'moderate', label: 'Moderate', desc: 'Occasional tingling or redness when starting strong exfoliants or retinoids.' },
  { id: 'high', label: 'Highly Reactive', desc: 'Easily stings, burns, or flushes. Requires strict fragrance-free soothing formulas.' }
];

export const SUN_EXPOSURES = [
  { id: 'minimal', label: 'Mostly Indoors', desc: 'Working from home or office with limited direct window sun.' },
  { id: 'moderate', label: 'Moderate Daily Sun', desc: 'Commuting, errands, and occasional outdoor lunch walks.' },
  { id: 'high', label: 'High Outdoor UV', desc: 'Outdoor sports, field work, or tropical/sunny climates.' }
];

export const ROUTINE_EXPERIENCE = [
  { id: 'beginner', label: 'Essential (3 Steps)', desc: 'Cleanse, Hydrate/Moisturize, Protect. 3-4 minutes max.' },
  { id: 'balanced', label: 'Targeted (4-5 Steps)', desc: 'Adds targeted treatment serums and soothing toner. 5-7 minutes.' },
  { id: 'advanced', label: 'Holistic (6+ Steps)', desc: 'Full multi-step regimen with essences, eye care, and weekly masks.' }
];

export const INGREDIENT_GLOSSARY = [
  {
    name: 'Ceramides NP, AP, EOP',
    role: 'Barrier Architect',
    description: 'Essential skin-identical lipids that hold skin cells together, forming a protective seal against water loss and environmental irritants.',
    goodFor: ['Dry', 'Sensitive', 'Compromised Barrier'],
    timeOfDay: 'AM & PM'
  },
  {
    name: 'Niacinamide (Vitamin B3 2-5%)',
    role: 'Multi-Tasking Balancer',
    description: 'Regulates excess sebum production, calms redness, strengthens ceramide synthesis, and softens hyperpigmentation gently.',
    goodFor: ['Oily', 'Combination', 'Breakouts', 'Pores'],
    timeOfDay: 'AM & PM'
  },
  {
    name: 'Centella Asiatica (Cica / Madecassoside)',
    role: 'Herbal Soother',
    description: 'Ancient medicinal herb known for rapid relief of inflammation, wound healing, and calming acute irritation or flare-ups.',
    goodFor: ['Sensitive', 'Redness', 'Post-Acne'],
    timeOfDay: 'AM & PM'
  },
  {
    name: 'Hyaluronic Acid & Multi-Molecular Weight Sodium Hyaluronate',
    role: 'Deep Hydration Magnet',
    description: 'Draws up to 1000x its weight in water into epidermal layers, plumping dehydration lines and restoring bounce.',
    goodFor: ['All Skin Types', 'Dehydration'],
    timeOfDay: 'AM & PM (Apply to damp skin)'
  },
  {
    name: 'Squalane (Plant-Derived)',
    role: 'Non-Greasy Emollient',
    description: 'Mimics the skin’s natural squalene lipid. Lightweight, non-comedogenic, and softens rough texture without clogging pores.',
    goodFor: ['Dry', 'Dehydrated', 'Combination'],
    timeOfDay: 'AM & PM'
  },
  {
    name: 'Azelaic Acid (10%)',
    role: 'Clarifying & Anti-Redness',
    description: 'Gently exfoliates pores, reduces acne-causing bacteria, and notably dims persistent red blotchiness and post-blemish marks.',
    goodFor: ['Breakouts', 'Redness', 'Sensitive Blemish-Prone'],
    timeOfDay: 'AM or PM'
  },
  {
    name: 'Broad Spectrum Zinc Oxide SPF 50',
    role: 'Mineral Shield',
    description: 'Physically reflects harmful UVA and UVB rays without creating skin heat. Exceptionally well-tolerated by sensitive and acneic skin.',
    goodFor: ['All Types', 'Daily Defense'],
    timeOfDay: 'Every Morning'
  },
  {
    name: 'Panthenol (Pro-Vitamin B5)',
    role: 'Deep Moisture Anchor',
    description: 'Penetrates deeply to attract moisture and supports skin elasticity while soothing micro-abrasions.',
    goodFor: ['Sensitive', 'Dry', 'Compromised'],
    timeOfDay: 'AM & PM'
  }
];

export const PRODUCT_CATALOG = [
  {
    id: 'p-1',
    category: 'Cleanser',
    name: 'Cloud Milk Gentle Amino Cleanser',
    brand: 'Botanical Reserve',
    skinTypes: ['dry', 'sensitive', 'normal'],
    concerns: ['dehydration', 'redness'],
    texture: 'Milky gel emulsion that does not foam aggressively',
    keyIngredients: ['Oat Amino Acids', 'Glycerin', 'Colloidal Oat'],
    ph: '5.5 (Acid Mantle Friendly)',
    whyItFits: 'Leaves natural barrier lipids intact without stripping moisture or causing post-wash tightness.',
    tips: 'Massage gently for 45-60 seconds on damp skin with lukewarm water.'
  },
  {
    id: 'p-2',
    category: 'Cleanser',
    name: 'Clear Balance Gentle Foaming Gel',
    brand: 'Derm Pure',
    skinTypes: ['oily', 'combination'],
    concerns: ['breakouts', 'texture'],
    texture: 'Refreshing gel that forms a soft micro-lather',
    keyIngredients: ['0.5% Salicylic Acid', 'Green Tea Leaf', 'Zinc PCA'],
    ph: '5.2',
    whyItFits: 'Deeply clears pores and excess oil while respecting delicate skin barrier integrity.',
    tips: 'Focus on the T-zone and nose crevices; rinse thoroughly with cool-to-lukewarm water.'
  },
  {
    id: 'p-3',
    category: 'Toner & Mist',
    name: 'Cica Barrier Recovery Essence',
    brand: 'Aura Phyto',
    skinTypes: ['sensitive', 'dry', 'combination', 'normal'],
    concerns: ['redness', 'dehydration', 'breakouts'],
    texture: 'Light, silky water-essence',
    keyIngredients: ['78% Centella Asiatica', 'Madecassoside', 'Panthenol B5'],
    ph: '5.8',
    whyItFits: 'Instantly quenches redness, preps skin for serum absorption, and reduces flushing.',
    tips: 'Pat 3-4 drops directly into skin with clean palms rather than using cotton pads.'
  },
  {
    id: 'p-4',
    category: 'Serum',
    name: 'Hydra-Plump Multi-Weight Hyaluronic Serum',
    brand: 'Nourish Lab',
    skinTypes: ['dry', 'dehydration', 'combination', 'normal'],
    concerns: ['dehydration', 'fine_lines'],
    texture: 'Bouncy, weightless viscous serum',
    keyIngredients: ['5 Multi-Molecular Hyaluronic Acids', 'Polyglutamic Acid', 'Snow Mushroom'],
    ph: '5.5',
    whyItFits: 'Multi-depth water binding restores instant bounce and softens surface tension.',
    tips: 'Crucial: apply directly to damp skin right after cleansing or essence to lock in hydration.'
  },
  {
    id: 'p-5',
    category: 'Serum',
    name: 'Clarity Guard 5% Niacinamide + Zinc Serum',
    brand: 'Clean Balance',
    skinTypes: ['oily', 'combination', 'normal'],
    concerns: ['breakouts', 'dullness', 'texture'],
    texture: 'Fast-absorbing watery serum',
    keyIngredients: ['5% Niacinamide', '1% Zinc PCA', 'Licorice Root'],
    ph: '6.0',
    whyItFits: 'Balanced 5% concentration minimizes oiliness without irritating sensitive skin.',
    tips: 'Can be used twice daily. Pairs well with hydrating essences.'
  },
  {
    id: 'p-6',
    category: 'Moisturizer',
    name: 'Ceramide Lipid Shield Barrier Cream',
    brand: 'Derma Restore',
    skinTypes: ['dry', 'sensitive'],
    concerns: ['dehydration', 'redness', 'fine_lines'],
    texture: 'Rich, comforting cream with a cashmere finish',
    keyIngredients: ['3:1:1 Physiological Ceramides', 'Plant Squalane', 'Cholesterol'],
    ph: '5.4',
    whyItFits: 'Rebuilds compromised skin lipid layers, preventing transepidermal water loss overnight.',
    tips: 'Warm a pea-sized amount between fingertips before pressing into skin.'
  },
  {
    id: 'p-7',
    category: 'Moisturizer',
    name: 'Water-Burst Peptide Gel-Cream',
    brand: 'Aura Phyto',
    skinTypes: ['oily', 'combination'],
    concerns: ['texture', 'dehydration', 'breakouts'],
    texture: 'Cooling translucent gel that breaks into water droplets',
    keyIngredients: ['Oligopeptides', 'Betaine', 'Aloe Barbadensis', 'Niacinamide'],
    ph: '5.7',
    whyItFits: 'Provides deep 24-hour hydration without any greasy residue or clogged pores.',
    tips: 'Ideal morning primer under sunscreen; absorbs in under 30 seconds.'
  },
  {
    id: 'p-8',
    category: 'Sunscreen',
    name: 'Invisible Mineral Silk Daily Defense SPF 50',
    brand: 'Sun Sanctuary',
    skinTypes: ['all', 'sensitive', 'dry', 'oily', 'combination'],
    concerns: ['all'],
    texture: 'Non-nano sheer fluid with zero white cast and satin glow',
    keyIngredients: ['18% Non-Nano Zinc Oxide', 'Ectoin', 'Bisabolol', 'Vitamin E'],
    ph: '6.5',
    whyItFits: 'Non-comedogenic, reef safe, and gentle enough for the most reactive eyes and skin.',
    tips: 'Apply two finger-lengths as the last morning step 15 minutes before stepping outside.'
  }
];

export const INITIAL_USER_PROFILE = {
  skinType: 'combination',
  concerns: ['dehydration', 'texture'],
  sensitivity: 'moderate',
  sunExposure: 'moderate',
  experience: 'balanced',
  preferences: {
    fragranceFree: true,
    crueltyFree: true,
    minimalSteps: false
  },
  photo: null, // Client-only data URI
  hasCompletedOnboarding: false
};
