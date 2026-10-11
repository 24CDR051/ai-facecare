/**
 * Educational Skincare Routine Generator Engine
 * Generates transparent, evidence-aligned AM and PM cosmetic routines based on self-reported inputs.
 */

export const generatePersonalizedRoutine = (profile) => {
  const { skinType = 'combination', concerns = [], sensitivity = 'moderate', experience = 'balanced' } = profile;

  // Compute educational wellness indices
  let barrierScore = 85;
  let hydrationScore = 78;
  let sunScore = 90;

  if (skinType === 'dry' || concerns.includes('dehydration')) {
    barrierScore -= 8;
    hydrationScore -= 12;
  }
  if (skinType === 'sensitive' || sensitivity === 'high') {
    barrierScore -= 10;
  }
  if (concerns.includes('breakouts')) {
    barrierScore -= 5;
  }
  if (skinType === 'normal') {
    barrierScore = 92;
    hydrationScore = 88;
  }

  // --- AM STEPS GENERATION ---
  const amSteps = [];

  // Step 1: Cleansing
  if (skinType === 'dry' || sensitivity === 'high') {
    amSteps.push({
      id: 'am-1',
      title: 'Gentle Splash / Non-Foaming Cleanser',
      category: 'Cleanse',
      time: 'AM',
      duration: '60 sec',
      productType: 'Hydrating milk or lukewarm water rinse',
      why: 'Preserves delicate lipid barrier formed overnight; prevents stripping natural protective sebum.',
      instructions: 'Use lukewarm water. Pat lightly dry with a clean cotton towel, leaving skin slightly damp.'
    });
  } else {
    amSteps.push({
      id: 'am-1',
      title: 'Gentle Balancing Gel Cleanser',
      category: 'Cleanse',
      time: 'AM',
      duration: '60 sec',
      productType: 'pH 5.5 Amino-acid foaming gel',
      why: 'Rinses away overnight excess sebum and sweat without compromising the acid mantle.',
      instructions: 'Lather between damp hands, massage for 45 seconds concentrating on the T-zone, and rinse with lukewarm water.'
    });
  }

  // Step 2: Hydrating Mist / Essence (for balanced & advanced)
  if (experience !== 'beginner' || concerns.includes('dehydration') || concerns.includes('redness')) {
    amSteps.push({
      id: 'am-2',
      title: 'Soothing Barrier Hydration Mist / Essence',
      category: 'Tone & Prep',
      time: 'AM',
      duration: '30 sec',
      productType: 'Centella Asiatica + Panthenol B5 Essence',
      why: 'Quenches micro-dehydration and primes skin cells to absorb following active serums more effectively.',
      instructions: 'Pat 3-4 drops directly into skin with clean palms. Do not let it dry completely before serum.'
    });
  }

  // Step 3: Targeted Morning Active
  if (concerns.includes('breakouts') || skinType === 'oily') {
    amSteps.push({
      id: 'am-3',
      title: 'Targeted Balancer: Niacinamide 5% + Zinc',
      category: 'Treat',
      time: 'AM',
      duration: '60 sec',
      productType: 'Lightweight Sebum-Control Serum',
      why: 'Regulates daily shine, minimizes the look of enlarged pores, and calms surface irritation.',
      instructions: 'Press 2-3 drops evenly over entire face. Safe for daily morning use.'
    });
  } else if (concerns.includes('dullness') && sensitivity !== 'high') {
    amSteps.push({
      id: 'am-3',
      title: 'Antioxidant Radiance: Vitamin C / Ectoin Serum',
      category: 'Treat',
      time: 'AM',
      duration: '60 sec',
      productType: 'Stable Vitamin C or Ferulic Booster',
      why: 'Neutralizes free radicals from UV light and environmental smog while brightening tone.',
      instructions: 'Smooth 3 drops over face and neck. Allow 1 minute to absorb before moisturizer.'
    });
  } else {
    amSteps.push({
      id: 'am-3',
      title: 'Hydration Plump: Multi-Weight Hyaluronic Acid',
      category: 'Treat',
      time: 'AM',
      duration: '60 sec',
      productType: 'Hyaluronic Acid + Glycerin Serum',
      why: 'Holds moisture inside skin layers throughout the day, preventing environmental tightness.',
      instructions: 'Smooth onto damp skin to trap ambient moisture.'
    });
  }

  // Step 4: Moisturizer
  amSteps.push({
    id: 'am-4',
    title: skinType === 'oily' ? 'Ultra-Light Water-Gel Moisturizer' : 'Ceramide Nourishing Daily Emulsion',
    category: 'Moisturize',
    time: 'AM',
    duration: '60 sec',
    productType: skinType === 'oily' ? 'Oil-free peptide gel' : 'Ceramide-rich daily cream',
    why: 'Locks in active serum benefits and reinforces intercellular lipid matrix.',
    instructions: 'Dispense a nickel-sized amount. Smooth from center of face outwards onto neck.'
  });

  // Step 5: Sun Protection (Essential for all!)
  amSteps.push({
    id: 'am-5',
    title: 'Broad-Spectrum Mineral / Hybrid Daily Sunscreen SPF 50',
    category: 'Protect',
    time: 'AM',
    duration: '2 min',
    productType: 'Non-greasy SPF 50+ PA++++ with Zinc Oxide & Ectoin',
    why: 'The single most effective step to prevent premature photo-aging, dark spots, and cellular damage.',
    instructions: 'Apply generously (two full finger lengths) across face, neck, and behind ears 15 minutes prior to sun exposure.'
  });

  // --- PM STEPS GENERATION ---
  const pmSteps = [];

  // Step 1: PM Cleanse / Double Cleanse
  if (experience === 'advanced' || skinType === 'oily' || concerns.includes('breakouts')) {
    pmSteps.push({
      id: 'pm-1',
      title: 'First Cleanse: Gentle Cleansing Balm or Micellar Milk',
      category: 'Cleanse',
      time: 'PM',
      duration: '90 sec',
      productType: 'Plant-oil emulsifying balm or gentle micellar wash',
      why: 'Melts away water-resistant SPF, city smog, and sebum without tugging or stripping.',
      instructions: 'Massage onto dry skin for 60 seconds. Emulsify with warm water and rinse clean.'
    });
  }

  pmSteps.push({
    id: 'pm-2',
    title: 'Second Cleanse: Conditioning Hydrating Wash',
    category: 'Cleanse',
    time: 'PM',
    duration: '60 sec',
    productType: 'Gentle pH-balanced amino cleanser',
    why: 'Removes water-soluble impurities and preps skin for overnight recovery.',
    instructions: 'Lather gently, rinse thoroughly, and pat skin with a clean fresh towel.'
  });

  // PM Treatment: Targeted Active
  if (concerns.includes('breakouts') || concerns.includes('redness')) {
    pmSteps.push({
      id: 'pm-3',
      title: 'Targeted Treatment: Azelaic Acid 10% / Gentle BHA',
      category: 'Treat & Repair',
      time: 'PM',
      duration: '90 sec',
      productType: 'Azelaic calming cream or 1% Salicylic spot serum',
      why: 'Diminishes redness, clears follicular debris, and discourages breakout formation overnight.',
      instructions: 'Apply a pea-sized amount onto dry skin. Use 3-4 nights per week; pause if irritation occurs.'
    });
  } else if (concerns.includes('fine_lines') && sensitivity !== 'high') {
    pmSteps.push({
      id: 'pm-3',
      title: 'Renewal Booster: Peptide Complex or Gentle Retinol Alternative',
      category: 'Treat & Repair',
      time: 'PM',
      duration: '60 sec',
      productType: 'Bakuchiol or Copper Tripeptide-1 Serum',
      why: 'Encourages cellular turnover and supports collagen synthesis during nocturnal skin repair.',
      instructions: 'Smooth 2-3 drops over clean, dry face. Always follow with barrier cream.'
    });
  } else {
    pmSteps.push({
      id: 'pm-3',
      title: 'Barrier Quench: Centella & Madecassoside Repair Serum',
      category: 'Treat & Repair',
      time: 'PM',
      duration: '60 sec',
      productType: 'Concentrated Cica Ampoule',
      why: 'Soothes daily oxidative stress and accelerates micro-barrier recovery while you sleep.',
      instructions: 'Press gently into cheeks, forehead, and jawline until absorbed.'
    });
  }

  // PM Night Recovery Moisturizer / Barrier Cream
  pmSteps.push({
    id: 'pm-4',
    title: 'Night Recovery Lipid Cream (Ceramides + Squalane)',
    category: 'Nourish & Seal',
    time: 'PM',
    duration: '90 sec',
    productType: 'Physiological 3:1:1 lipid barrier recovery cream',
    why: 'Transepidermal water loss spikes between 11 PM and 4 AM. This seals hydration and repairs the stratum corneum.',
    instructions: 'Warm a generous dollop between clean palms and press deeply into skin and neck.'
  });

  // Educational cautions
  const cautions = [];
  if (sensitivity === 'high') {
    cautions.push('Highly reactive skin profile detected: Avoid using physical face scrubs, synthetic fragrance, or strong alcohol-based toners.');
    cautions.push('Patch-test any new product on the inside of your forearm or behind your ear for 48 hours before applying to your face.');
  }
  if (concerns.includes('breakouts') && skinType === 'dry') {
    cautions.push('Combination of dryness and breakouts: Do not over-dry skin with harsh astringents. Keeping the barrier hydrated reduces compensatory sebum spikes.');
  }

  return {
    barrierScore,
    hydrationScore,
    sunScore,
    amRoutine: amSteps,
    pmRoutine: pmSteps,
    cautions,
    generatedAt: new Date().toISOString()
  };
};
