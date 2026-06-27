import { KanaEntry, RowMeta, PokemonType } from '@/types';

export const TYPE_COLORS: Record<PokemonType, string> = {
  'どく': '#A855F7',
  'ノーマル': '#A8A878',
  'ほのお': '#F97316',
  'かくとう': '#C0392B',
  'ドラゴン': '#7C3AED',
  'みず': '#3B82F6',
  'エスパー': '#EC4899',
  'くさ': '#22C55E',
  'あく': '#475569',
  'ゴースト': '#6D28D9',
  'むし': '#84CC16',
  'ひこう': '#93C5FD',
  'でんき': '#EAB308',
};

export const KANA_DATA: KanaEntry[] = [
  // あ行
  {
    kana: 'あ',
    pokemons: [
      { name: 'アーボ', id: 23, type: 'どく' },
      { name: 'アチャモ', id: 255, type: 'ほのお' },
      { name: 'アルセウス', id: 493, type: 'ノーマル' },
      { name: 'アブソル', id: 359, type: 'あく' },
      { name: 'アグノム', id: 482, type: 'エスパー' }
    ],
    row: 'a'
  },
  {
    kana: 'い',
    pokemons: [
      { name: 'イーブイ', id: 133, type: 'ノーマル' },
      { name: 'イシツブテ', id: 74, type: 'かくとう' },
      { name: 'イトマル', id: 167, type: 'むし' },
      { name: 'イワンコ', id: 744, type: 'ノーマル' },
      { name: 'インテレオン', id: 818, type: 'みず' }
    ],
    row: 'a'
  },
  {
    kana: 'う',
    pokemons: [
      { name: 'ウインディ', id: 59, type: 'ほのお' },
      { name: 'ウソッキー', id: 185, type: 'ノーマル' },
      { name: 'ウパー', id: 194, type: 'みず' },
      { name: 'ウールー', id: 831, type: 'ノーマル' },
      { name: 'ウツドン', id: 70, type: 'くさ' }
    ],
    row: 'a'
  },
  {
    kana: 'え',
    pokemons: [
      { name: 'エビワラー', id: 107, type: 'かくとう' },
      { name: 'エイパム', id: 190, type: 'ノーマル' },
      { name: 'エネコ', id: 300, type: 'ノーマル' },
      { name: 'エルレイド', id: 475, type: 'エスパー' },
      { name: 'エムリット', id: 481, type: 'エスパー' }
    ],
    row: 'a'
  },
  {
    kana: 'お',
    pokemons: [
      { name: 'オコリザル', id: 56, type: 'かくとう' },
      { name: 'オタマロ', id: 535, type: 'みず' },
      { name: 'オオスバメ', id: 277, type: 'ひこう' },
      { name: 'オタチ', id: 161, type: 'ノーマル' },
      { name: 'オニゴーリ', id: 362, type: 'ノーマル' }
    ],
    row: 'a'
  },
  // か行
  {
    kana: 'か',
    pokemons: [
      { name: 'カイリュー', id: 149, type: 'ドラゴン' },
      { name: 'カラカラ', id: 104, type: 'ノーマル' },
      { name: 'カビゴン', id: 143, type: 'ノーマル' },
      { name: 'カイリキー', id: 68, type: 'かくとう' },
      { name: 'カムカメ', id: 824, type: 'みず' }
    ],
    row: 'ka'
  },
  {
    kana: 'き',
    pokemons: [
      { name: 'キュウコン', id: 38, type: 'ほのお' },
      { name: 'キモリ', id: 252, type: 'くさ' },
      { name: 'キバゴ', id: 610, type: 'ドラゴン' },
      { name: 'キラーメ', id: 969, type: 'どく' },
      { name: 'キリンリキ', id: 203, type: 'ノーマル' }
    ],
    row: 'ka'
  },
  {
    kana: 'く',
    pokemons: [
      { name: 'クリムガン', id: 621, type: 'ドラゴン' },
      { name: 'クヌギダマ', id: 204, type: 'むし' },
      { name: 'クマシュン', id: 613, type: 'ノーマル' },
      { name: 'クワガノン', id: 738, type: 'でんき' },
      { name: 'クサイハナ', id: 44, type: 'くさ' }
    ],
    row: 'ka'
  },
  {
    kana: 'け',
    pokemons: [
      { name: 'ケッキング', id: 289, type: 'ノーマル' },
      { name: 'ケムッソ', id: 265, type: 'むし' },
      { name: 'ケーシィ', id: 63, type: 'エスパー' },
      { name: 'ケロマツ', id: 656, type: 'みず' },
      { name: 'ケンタロス', id: 128, type: 'ノーマル' }
    ],
    row: 'ka'
  },
  {
    kana: 'こ',
    pokemons: [
      { name: 'コイキング', id: 129, type: 'みず' },
      { name: 'コダック', id: 54, type: 'みず' },
      { name: 'ココドラ', id: 304, type: 'ノーマル' },
      { name: 'コリンク', id: 403, type: 'でんき' },
      { name: 'ココガラ', id: 821, type: 'ひこう' }
    ],
    row: 'ka'
  },
  // さ行
  {
    kana: 'さ',
    pokemons: [
      { name: 'サーナイト', id: 282, type: 'エスパー' },
      { name: 'サンド', id: 27, type: 'ノーマル' },
      { name: 'サボネア', id: 331, type: 'くさ' },
      { name: 'サルノリ', id: 810, type: 'くさ' },
      { name: 'サクラビス', id: 368, type: 'みず' }
    ],
    row: 'sa'
  },
  {
    kana: 'し',
    pokemons: [
      { name: 'シャワーズ', id: 134, type: 'みず' },
      { name: 'シシコ', id: 667, type: 'ほのお' },
      { name: 'シェイミ', id: 492, type: 'くさ' },
      { name: 'シンボラー', id: 561, type: 'エスパー' },
      { name: 'シュシュプ', id: 682, type: 'エスパー' }
    ],
    row: 'sa'
  },
  {
    kana: 'す',
    pokemons: [
      { name: 'スターミー', id: 121, type: 'みず' },
      { name: 'スバメ', id: 276, type: 'ひこう' },
      { name: 'スコルピ', id: 451, type: 'どく' },
      { name: 'スナバァ', id: 769, type: 'ゴースト' },
      { name: 'ストライク', id: 123, type: 'むし' }
    ],
    row: 'sa'
  },
  {
    kana: 'せ',
    pokemons: [
      { name: 'セレビィ', id: 251, type: 'エスパー' },
      { name: 'セビエ', id: 996, type: 'ドラゴン' },
      { name: 'セグレイブ', id: 998, type: 'ドラゴン' },
      { name: 'セキタンザン', id: 837, type: 'ほのお' },
      { name: 'セゴール', id: 997, type: 'ドラゴン' }
    ],
    row: 'sa'
  },
  {
    kana: 'そ',
    pokemons: [
      { name: 'ソーナンス', id: 202, type: 'エスパー' },
      { name: 'ソルロック', id: 338, type: 'ほのお' },
      { name: 'ソーナノ', id: 360, type: 'エスパー' },
      { name: 'ソウブレイズ', id: 937, type: 'ほのお' },
      { name: 'ソルガレオ', id: 791, type: 'エスパー' }
    ],
    row: 'sa'
  },
  // た行
  {
    kana: 'た',
    pokemons: [
      { name: 'タッツー', id: 116, type: 'みず' },
      { name: 'タネボー', id: 273, type: 'くさ' },
      { name: 'タマンタ', id: 446, type: 'みず' },
      { name: 'タツベイ', id: 371, type: 'ドラゴン' },
      { name: 'タイレーツ', id: 869, type: 'かくとう' }
    ],
    row: 'ta'
  },
  {
    kana: 'ち',
    pokemons: [
      { name: 'チコリータ', id: 152, type: 'くさ' },
      { name: 'チョンチー', id: 170, type: 'みず' },
      { name: 'チルット', id: 333, type: 'ひこう' },
      { name: 'チャオブー', id: 499, type: 'ほのお' },
      { name: 'チルタリス', id: 334, type: 'ドラゴン' }
    ],
    row: 'ta'
  },
  {
    kana: 'つ',
    pokemons: [
      { name: 'ツタージャ', id: 495, type: 'くさ' },
      { name: 'ツボツボ', id: 213, type: 'むし' },
      { name: 'ツンベアー', id: 614, type: 'みず' },
      { name: 'ツツケラ', id: 731, type: 'ひこう' },
      { name: 'ツンデツンデ', id: 805, type: 'いわ' as any }
    ],
    row: 'ta'
  },
  {
    kana: 'て',
    pokemons: [
      { name: 'テールナー', id: 654, type: 'ほのお' },
      { name: 'テラキオン', id: 639, type: 'かくとう' },
      { name: 'テッシード', id: 597, type: 'くさ' },
      { name: 'テブリム', id: 857, type: 'エスパー' },
      { name: 'テラパゴス', id: 990, type: 'ノーマル' }
    ],
    row: 'ta'
  },
  {
    kana: 'と',
    pokemons: [
      { name: 'トゲピー', id: 175, type: 'ノーマル' },
      { name: 'トサキント', id: 118, type: 'みず' },
      { name: 'トドゼルガ', id: 365, type: 'みず' },
      { name: 'トゲキッス', id: 468, type: 'ひこう' },
      { name: 'トドグラー', id: 364, type: 'みず' }
    ],
    row: 'ta'
  },
  // な行
  {
    kana: 'な',
    pokemons: [
      { name: 'ナッシー', id: 103, type: 'くさ' },
      { name: 'ナエトル', id: 387, type: 'くさ' },
      { name: 'ナゲツケサル', id: 766, type: 'かくとう' },
      { name: 'ナゲキ', id: 539, type: 'かくとう' },
      { name: 'ナックラー', id: 328, type: 'じめん' as any }
    ],
    row: 'na'
  },
  {
    kana: 'に',
    pokemons: [
      { name: 'ニャース', id: 52, type: 'ノーマル' },
      { name: 'ニドラン♀', id: 29, type: 'どく' },
      { name: 'ニョロモ', id: 60, type: 'みず' },
      { name: 'ニャオハ', id: 906, type: 'くさ' },
      { name: 'ニャヒート', id: 726, type: 'ほのお' }
    ],
    row: 'na'
  },
  {
    kana: 'ぬ',
    pokemons: [
      { name: 'ヌオー', id: 195, type: 'みず' },
      { name: 'ヌメラ', id: 704, type: 'ドラゴン' },
      { name: 'ヌイコグマ', id: 759, type: 'ノーマル' },
      { name: 'ヌメイル', id: 705, type: 'ドラゴン' },
      { name: 'ヌケニン', id: 292, type: 'むし' }
    ],
    row: 'na'
  },
  {
    kana: 'ね',
    pokemons: [
      { name: 'ネイティ', id: 177, type: 'エスパー' },
      { name: 'ネマシュ', id: 755, type: 'くさ' },
      { name: 'ネオラント', id: 457, type: 'みず' },
      { name: 'ネイティオ', id: 178, type: 'エスパー' },
      { name: 'ネッコアラ', id: 775, type: 'ノーマル' }
    ],
    row: 'na'
  },
  {
    kana: 'の',
    pokemons: [
      { name: 'ノコッチ', id: 206, type: 'ノーマル' },
      { name: 'ノズパス', id: 299, type: 'いわ' as any },
      { name: 'ノココッチ', id: 982, type: 'ノーマル' },
      { name: 'ノクタス', id: 332, type: 'くさ' }
      // 'の' has only 4 clean standard pokemons available in Japanese Pokedex
    ],
    row: 'na'
  },
  // は行
  {
    kana: 'は',
    pokemons: [
      { name: 'ハピナス', id: 242, type: 'ノーマル' },
      { name: 'ハリマロン', id: 650, type: 'くさ' },
      { name: 'ハスボー', id: 270, type: 'みず' },
      { name: 'ハッサム', id: 212, type: 'むし' },
      { name: 'ハガネール', id: 208, type: 'はがね' as any }
    ],
    row: 'ha'
  },
  {
    kana: 'ひ',
    pokemons: [
      { name: 'ヒトカゲ', id: 4, type: 'ほのお' },
      { name: 'ヒコザル', id: 390, type: 'ほのお' },
      { name: 'ヒノアラシ', id: 155, type: 'ほのお' },
      { name: 'ヒバニー', id: 813, type: 'ほのお' },
      { name: 'ヒドイデ', id: 747, type: 'どく' }
    ],
    row: 'ha'
  },
  {
    kana: 'ふ',
    pokemons: [
      { name: 'フシギダネ', id: 1, type: 'くさ' },
      { name: 'フカマル', id: 443, type: 'ドラゴン' },
      { name: 'フワンテ', id: 425, type: 'ゴースト' },
      { name: 'フォッコ', id: 653, type: 'ほのお' },
      { name: 'フローゼル', id: 419, type: 'みず' }
    ],
    row: 'ha'
  },
  {
    kana: 'へ',
    pokemons: [
      { name: 'ヘルガー', id: 228, type: 'あく' },
      { name: 'ヘイガニ', id: 341, type: 'みず' },
      { name: 'ヘラクロス', id: 214, type: 'むし' },
      { name: 'ヘイラッシャ', id: 977, type: 'みず' }
      // 'へ' has only 4 clean standard pokemons available in Japanese Pokedex
    ],
    row: 'ha'
  },
  {
    kana: 'ほ',
    pokemons: [
      { name: 'ホウオウ', id: 250, type: 'ほのお' },
      { name: 'ホエルオー', id: 321, type: 'みず' },
      { name: 'ホーホー', id: 163, type: 'ノーマル' },
      { name: 'ホゲータ', id: 909, type: 'ほのお' },
      { name: 'ホルビー', id: 659, type: 'ノーマル' }
    ],
    row: 'ha'
  },
  // ま行
  {
    kana: 'ま',
    pokemons: [
      { name: 'マリル', id: 183, type: 'みず' },
      { name: 'マダツボミ', id: 69, type: 'くさ' },
      { name: 'マッギョ', id: 618, type: 'でんき' },
      { name: 'マホイップ', id: 869, type: 'エスパー' },
      { name: 'マニューラ', id: 461, type: 'あく' }
    ],
    row: 'ma'
  },
  {
    kana: 'み',
    pokemons: [
      { name: 'ミュウ', id: 151, type: 'エスパー' },
      { name: 'ミズゴロウ', id: 258, type: 'みず' },
      { name: 'ミミッキュ', id: 778, type: 'ゴースト' },
      { name: 'ミジュマル', id: 501, type: 'みず' },
      { name: 'ミニリュウ', id: 147, type: 'ドラゴン' }
    ],
    row: 'ma'
  },
  {
    kana: 'む',
    pokemons: [
      { name: 'ムウマ', id: 200, type: 'ゴースト' },
      { name: 'ムックル', id: 396, type: 'ひこう' },
      { name: 'ムシャーナ', id: 518, type: 'エスパー' },
      { name: 'ムクホーク', id: 398, type: 'ひこう' },
      { name: 'ムンナ', id: 517, type: 'エスパー' }
    ],
    row: 'ma'
  },
  {
    kana: 'め',
    pokemons: [
      { name: 'メタモン', id: 132, type: 'ノーマル' },
      { name: 'メグロコ', id: 551, type: 'あく' },
      { name: 'メリープ', id: 179, type: 'でんき' },
      { name: 'メロエッタ', id: 648, type: 'エスパー' },
      { name: 'メガヤンマ', id: 469, type: 'むし' }
    ],
    row: 'ma'
  },
  {
    kana: 'も',
    pokemons: [
      { name: 'モルフォン', id: 49, type: 'むし' },
      { name: 'モクロー', id: 722, type: 'くさ' },
      { name: 'モココ', id: 180, type: 'でんき' },
      { name: 'モルペコ', id: 877, type: 'でんき' },
      { name: 'モグリュー', id: 529, type: 'じめん' as any }
    ],
    row: 'ma'
  },
  // や行
  {
    kana: 'や',
    pokemons: [
      { name: 'ヤドン', id: 79, type: 'みず' },
      { name: 'ヤミラミ', id: 302, type: 'あく' },
      { name: 'ヤンチャム', id: 675, type: 'かくとう' },
      { name: 'ヤドキング', id: 199, type: 'みず' },
      { name: 'ヤバチャ', id: 854, type: 'ゴースト' }
    ],
    row: 'ya'
  },
  {
    kana: 'ゆ',
    pokemons: [
      { name: 'ユンゲラー', id: 64, type: 'エスパー' },
      { name: 'ユキワラシ', id: 361, type: 'こおり' as any },
      { name: 'ユキハミ', id: 872, type: 'むし' },
      { name: 'ユキノオー', id: 460, type: 'くさ' },
      { name: 'ユキメノコ', id: 478, type: 'ゴースト' }
    ],
    row: 'ya'
  },
  {
    kana: 'よ',
    pokemons: [
      { name: 'ヨルノズク', id: 164, type: 'ひこう' },
      { name: 'ヨーギラス', id: 246, type: 'ノーマル' },
      { name: 'ヨマワル', id: 355, type: 'ゴースト' },
      { name: 'ヨワシ', id: 746, type: 'みず' },
      { name: 'ヨノワール', id: 477, type: 'ゴースト' }
    ],
    row: 'ya'
  },
  // ら行
  {
    kana: 'ら',
    pokemons: [
      { name: 'ラプラス', id: 131, type: 'みず' },
      { name: 'ライチュウ', id: 26, type: 'でんき' },
      { name: 'ラッキー', id: 113, type: 'ノーマル' },
      { name: 'ラルトス', id: 280, type: 'エスパー' },
      { name: 'ランドロス', id: 645, type: 'じめん' as any }
    ],
    row: 'ra'
  },
  {
    kana: 'り',
    pokemons: [
      { name: 'リザードン', id: 6, type: 'ほのお' },
      { name: 'リオル', id: 447, type: 'かくとう' },
      { name: 'リーフィア', id: 470, type: 'くさ' },
      { name: 'リグレー', id: 561, type: 'エスパー' },
      { name: 'リザード', id: 5, type: 'ほのお' }
    ],
    row: 'ra'
  },
  {
    kana: 'る',
    pokemons: [
      { name: 'ルギア', id: 249, type: 'ひこう' },
      { name: 'ルカリオ', id: 448, type: 'かくとう' },
      { name: 'ルリリ', id: 298, type: 'ノーマル' },
      { name: 'ルンパッパ', id: 272, type: 'くさ' },
      { name: 'ルガルガン', id: 745, type: 'いわ' as any }
    ],
    row: 'ra'
  },
  {
    kana: 'れ',
    pokemons: [
      { name: 'レントラー', id: 405, type: 'でんき' },
      { name: 'レディバ', id: 165, type: 'むし' },
      { name: 'レックウザ', id: 384, type: 'ドラゴン' },
      { name: 'レジロック', id: 377, type: 'いわ' as any },
      { name: 'レジアイス', id: 378, type: 'こおり' as any }
    ],
    row: 'ra'
  },
  {
    kana: 'ろ',
    pokemons: [
      { name: 'ロコン', id: 37, type: 'ほのお' },
      { name: 'ロゼリア', id: 315, type: 'くさ' },
      { name: 'ロトム', id: 479, type: 'でんき' },
      { name: 'ロズレイド', id: 407, type: 'くさ' }
      // 'ろ' has only 4 clean standard pokemons available in Japanese Pokedex
    ],
    row: 'ra'
  },
  // わ行
  {
    kana: 'わ',
    pokemons: [
      { name: 'ワニノコ', id: 158, type: 'みず' },
      { name: 'ワンリキー', id: 66, type: 'かくとう' },
      { name: 'ワタッコ', id: 189, type: 'くさ' },
      { name: 'ワカシャモ', id: 256, type: 'ほのお' },
      { name: 'ワタシラガ', id: 830, type: 'くさ' }
    ],
    row: 'wa'
  },
  { kana: 'を', pokemons: null, row: 'wa', special: true },
  { kana: 'ん', pokemons: null, row: 'wa', special: true },
];

export const ROW_META: RowMeta[] = [
  { id: 'a',  label: 'あ行', kanaList: ['あ','い','う','え','お'] },
  { id: 'ka', label: 'か行', kanaList: ['か','き','く','け','こ'] },
  { id: 'sa', label: 'さ行', kanaList: ['さ','し','す','せ','そ'] },
  { id: 'ta', label: 'た行', kanaList: ['た','ち','つ','て','と'] },
  { id: 'na', label: 'な行', kanaList: ['な','に','ぬ','ね','の'] },
  { id: 'ha', label: 'は行', kanaList: ['は','ひ','ふ','へ','ほ'] },
  { id: 'ma', label: 'ま行', kanaList: ['ま','み','む','め','も'] },
  { id: 'ya', label: 'や行', kanaList: ['や','ゆ','よ'] },
  { id: 'ra', label: 'ら行', kanaList: ['ら','り','る','れ','ろ'] },
  { id: 'wa', label: 'わ行', kanaList: ['わ','を','ん'] },
];

export function getKanaEntry(kana: string): KanaEntry | undefined {
  return KANA_DATA.find(e => e.kana === kana);
}

export function getRowEntries(rowId: string): KanaEntry[] {
  return KANA_DATA.filter(e => e.row === rowId);
}

export function getNonSpecialEntries(): KanaEntry[] {
  return KANA_DATA.filter(e => !e.special);
}
