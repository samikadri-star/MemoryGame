import { CardArtwork, ThemeId, DifficultyConfig, DifficultyLevel } from '../types/game';

// Image asset paths generated in project
export const CARD_BACK_IMAGE = '/src/assets/images/card_back_mystic_1793456626018.jpg';
export const TABLE_FELT_IMAGE = '/src/assets/images/game_table_felt_1793456624780.jpg';

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultyConfig> = {
  EASY: {
    id: 'EASY',
    name: { en: 'Novice (3×4)', ar: 'مبتدئ (٣×٤)' },
    gridRows: 3,
    gridCols: 4,
    totalCards: 12,
    pairCount: 6,
    memorizeSeconds: 5
  },
  MEDIUM: {
    id: 'MEDIUM',
    name: { en: 'Adept (4×4)', ar: 'متقدم (٤×٤)' },
    gridRows: 4,
    gridCols: 4,
    totalCards: 16,
    pairCount: 8,
    memorizeSeconds: 4
  },
  HARD: {
    id: 'HARD',
    name: { en: 'Master (4×5)', ar: 'خبير (٤×٥)' },
    gridRows: 4,
    gridCols: 5,
    totalCards: 20,
    pairCount: 10,
    memorizeSeconds: 4
  },
  MASTER: {
    id: 'MASTER',
    name: { en: 'Grandmaster (5×6)', ar: 'أسطوري (٥×٦)' },
    gridRows: 5,
    gridCols: 6,
    totalCards: 30,
    pairCount: 15,
    memorizeSeconds: 3
  }
};

export const THEMES_META: Record<ThemeId, { name: { en: string; ar: string }; icon: string; description: { en: string; ar: string } }> = {
  CELESTIAL: {
    name: { en: 'Celestial Arcana', ar: 'الأسرار الفلكية' },
    icon: '✦',
    description: { en: 'Ancient astral relics and cosmic constellations', ar: 'آثار فلكية قديمة وأبراج كونية' }
  },
  CYBER_ARTIFACT: {
    name: { en: 'Cyber Relics', ar: 'الآثار السيبرانية' },
    icon: '⚡',
    description: { en: 'Quantum crystals, neon nodes, and data prisms', ar: 'بلورات كمومية وعُقد نيون' }
  },
  NATURE_SPIRIT: {
    name: { en: 'Spirit Wildlife', ar: 'كائنات الطبيعة' },
    icon: '🌿',
    description: { en: 'Ethereal forest guardians and sacred fauna', ar: 'حراس الغابة الأثيريون وحيوانات أسطورية' }
  },
  ELEMENTAL: {
    name: { en: 'Primal Elements', ar: 'العناصر الأولية' },
    icon: '🔥',
    description: { en: 'Blazing embers, tidal runes, and lightning crests', ar: 'جمرات نارية ورُموز برق وأمواج' }
  }
};

export const ALL_CARD_ARTWORKS: CardArtwork[] = [
  // CELESTIAL
  {
    id: 'phoenix_astral',
    themeId: 'CELESTIAL',
    name: { en: 'Solar Phoenix', ar: 'العنقاء الشمسية' },
    imageSrc: '/src/assets/images/card_sigil_phoenix_1793456626598.jpg',
    primaryColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    description: { en: 'Eternal flame born from supernova dust', ar: 'لهب سرمدي متولد من غبار المستعرات العظمى' }
  },
  {
    id: 'celestial_compass',
    themeId: 'CELESTIAL',
    name: { en: 'Astral Astrolabe', ar: 'الإسطرلاب النجمي' },
    svgIcon: 'astrolabe',
    primaryColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    description: { en: 'Guides navigators across cosmic voids', ar: 'يرشد الملاحين عبر المدارات الكونية' }
  },
  {
    id: 'lunar_crescent',
    themeId: 'CELESTIAL',
    name: { en: 'Silver Eclipse', ar: 'الخسوف الفضي' },
    svgIcon: 'moon_sigil',
    primaryColor: '#E0E7FF',
    glowColor: 'rgba(224, 231, 255, 0.45)',
    description: { en: 'A mirror of celestial silence and tide', ar: 'مرآة الصمت والمد والجزر الفلكي' }
  },
  {
    id: 'solar_orb',
    themeId: 'CELESTIAL',
    name: { en: 'Solar Monolith', ar: 'المسلة الشمسية' },
    svgIcon: 'sun_orb',
    primaryColor: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    description: { en: 'Radiant pulse that warms sleeping worlds', ar: 'نبض مشع يدفئ العوالم الساكنة' }
  },
  {
    id: 'cosmic_eye',
    themeId: 'CELESTIAL',
    name: { en: 'Omniscient Eye', ar: 'العين الكونية' },
    svgIcon: 'eye_sigil',
    primaryColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    description: { en: 'Perceives all coordinates across time', ar: 'ترصد كافة الإحداثيات عبر الأبعاد' }
  },
  {
    id: 'stellar_crown',
    themeId: 'CELESTIAL',
    name: { en: 'Crown of Pulsars', ar: 'تاج النجوم النباضة' },
    svgIcon: 'crown_sigil',
    primaryColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    description: { en: 'Worn by sovereigns of the astral expanse', ar: 'يرتديه ملوك الفضاء السرمدي' }
  },

  // CYBER ARTIFACT
  {
    id: 'cyber_prism',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Quantum Prism', ar: 'البلورة الكمومية' },
    imageSrc: '/src/assets/images/card_sigil_cyber_1793456626089.jpg',
    primaryColor: '#C084FC',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    description: { en: 'Refracts pure holographic computational matrices', ar: 'تكسر مصفوفات الحوسبة المجسمة' }
  },
  {
    id: 'cyber_core',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Plasma Core', ar: 'نواة البلازما' },
    svgIcon: 'plasma_core',
    primaryColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    description: { en: 'Supercharged containment of zero-point fuel', ar: 'احتواء فائق لشحنة نقطة الصفر' }
  },
  {
    id: 'cyber_mantis',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Mecha Scarab', ar: 'الجعل الآلي' },
    svgIcon: 'scarab_sigil',
    primaryColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    description: { en: 'Autonomous nanotech excavator', ar: 'مستكشف نانوي ذاتي التشغيل' }
  },
  {
    id: 'cyber_nexus',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Hyper Nexus', ar: 'عقدة النكسس' },
    svgIcon: 'nexus_sigil',
    primaryColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    description: { en: 'Instantaneous data conduit across galaxies', ar: 'قناة نقل فوري للبيانات عبر المجرات' }
  },
  {
    id: 'neural_chip',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Neural Relic', ar: 'الرقاقة العصبية' },
    svgIcon: 'chip_sigil',
    primaryColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    description: { en: 'Crystallized memory of the first architect', ar: 'ذاكرة مبلورة للمعماري الأول' }
  },
  {
    id: 'cyber_sentinel',
    themeId: 'CYBER_ARTIFACT',
    name: { en: 'Drone Sentinel', ar: 'الحارس الطائر' },
    svgIcon: 'sentinel_sigil',
    primaryColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    description: { en: 'Silent guardian of forgotten server crypts', ar: 'حارس صامت لسجلات البيانات المنسية' }
  },

  // NATURE SPIRIT
  {
    id: 'mystic_owl',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Lunar Owl', ar: 'بومة القمر الحكيمة' },
    svgIcon: 'owl_sigil',
    primaryColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    description: { en: 'Whispers forgotten prophecies in the midnight mist', ar: 'تهمس بنبوءات منسية في ضباب الليل' }
  },
  {
    id: 'spirit_fox',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Ember Kitsune', ar: 'ثعلب الجمر الأسطوري' },
    svgIcon: 'fox_sigil',
    primaryColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.45)',
    description: { en: 'Dances between dream planes leaving spark trails', ar: 'يرقص بين عوالم الأحلام تاركاً أثراً من الشرر' }
  },
  {
    id: 'sacred_tree',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Yggdrasil Seed', ar: 'بذرة شجرة الحياة' },
    svgIcon: 'tree_sigil',
    primaryColor: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    description: { en: 'Contains the genetic blueprints of all flora', ar: 'تحمل الشفرة الأصلية لكافة النباتات' }
  },
  {
    id: 'crystal_stag',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Frost Antler', ar: 'الأيل البلوري' },
    svgIcon: 'stag_sigil',
    primaryColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    description: { en: 'Walks upon frozen lakes without breaking glass', ar: 'يمشي فوق البحيرات المتجمدة دون كسرها' }
  },
  {
    id: 'radiant_lotus',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Bioluminescent Lotus', ar: 'زهرة اللوتس المضيئة' },
    svgIcon: 'lotus_sigil',
    primaryColor: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    description: { en: 'Blooms only when total equilibrium is attained', ar: 'تتفتح فقط عند اكتمال التناغم' }
  },
  {
    id: 'mystic_moth',
    themeId: 'NATURE_SPIRIT',
    name: { en: 'Prismatic Moth', ar: 'عثة الأطياف' },
    svgIcon: 'moth_sigil',
    primaryColor: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.45)',
    description: { en: 'Carries starlight across nocturnal meadows', ar: 'تحمل وميض النجوم فوق المروج الليلية' }
  },

  // ELEMENTAL
  {
    id: 'element_fire',
    themeId: 'ELEMENTAL',
    name: { en: 'Eternal Blaze', ar: 'شعلة الخلود' },
    svgIcon: 'flame_sigil',
    primaryColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    description: { en: 'Primeval heat that forged the bedrock of worlds', ar: 'الحرارة الأولى التي صهرت صخور الكواكب' }
  },
  {
    id: 'element_water',
    themeId: 'ELEMENTAL',
    name: { en: 'Tidal Crest', ar: 'قمة الطوفان' },
    svgIcon: 'wave_sigil',
    primaryColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    description: { en: 'Ever-shifting depths of fluid vitality', ar: 'أعماق متغيرة من الحيوية السائلة' }
  },
  {
    id: 'element_wind',
    themeId: 'ELEMENTAL',
    name: { en: 'Tempest Rune', ar: 'تعويذة العاصفة' },
    svgIcon: 'wind_sigil',
    primaryColor: '#2DD4BF',
    glowColor: 'rgba(45, 212, 191, 0.45)',
    description: { en: 'Untamed gales carving canyon pathways', ar: 'رياح عاتية تنحت مسارات الأخاديد' }
  },
  {
    id: 'element_earth',
    themeId: 'ELEMENTAL',
    name: { en: 'Titan Monolith', ar: 'حجر التيتان الصلد' },
    svgIcon: 'earth_sigil',
    primaryColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    description: { en: 'Unyielding granite foundation of mountain spines', ar: 'أساسات الجرانيت الراسخة لقمم الجبال' }
  },
  {
    id: 'element_thunder',
    themeId: 'ELEMENTAL',
    name: { en: 'Thunder Bolt', ar: 'صاعقة الرعد' },
    svgIcon: 'lightning_sigil',
    primaryColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.45)',
    description: { en: 'Shatters the sky with blinding electric fury', ar: 'تشق السماء بغضب كهربائي خاطف' }
  },
  {
    id: 'element_void',
    themeId: 'ELEMENTAL',
    name: { en: 'Cosmic Singularity', ar: 'تفرد الفراغ' },
    svgIcon: 'void_sigil',
    primaryColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    description: { en: 'Gravity well where light bends and time pauses', ar: 'حفرة جاذبية ينحني فيها الضوء ويتوقف الزمن' }
  }
];

/**
 * Fisher-Yates shuffle helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates card items for a game round
 */
export function generateGameCards(
  difficulty: DifficultyLevel,
  themeId?: ThemeId
): { cards: { instanceId: string; artworkId: string; artwork: CardArtwork; gridIndex: number; isFaceUp: boolean; isMatched: boolean }[]; artworksUsed: CardArtwork[] } {
  const config = DIFFICULTY_PRESETS[difficulty];
  const pairCount = config.pairCount;

  // Filter or prioritize selected theme, then backfill
  let pool = ALL_CARD_ARTWORKS;
  if (themeId) {
    const themeArt = pool.filter(a => a.themeId === themeId);
    const otherArt = pool.filter(a => a.themeId !== themeId);
    pool = [...shuffleArray(themeArt), ...shuffleArray(otherArt)];
  } else {
    pool = shuffleArray(pool);
  }

  const selectedArt = pool.slice(0, pairCount);

  // Create pairs
  const pairedList: { artwork: CardArtwork; pairIdx: number }[] = [];
  selectedArt.forEach((art, idx) => {
    pairedList.push({ artwork: art, pairIdx: idx });
    pairedList.push({ artwork: art, pairIdx: idx });
  });

  const shuffledPairs = shuffleArray(pairedList);

  const cards = shuffledPairs.map((item, index) => ({
    instanceId: `card_${index}_${item.artwork.id}_${Math.random().toString(36).substr(2, 5)}`,
    artworkId: item.artwork.id,
    artwork: item.artwork,
    gridIndex: index,
    isFaceUp: false,
    isMatched: false
  }));

  return { cards, artworksUsed: selectedArt };
}
