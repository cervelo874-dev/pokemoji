import { ROW_META } from '@/data/hiraganaData';
import GameScreen from './GameScreen';

export function generateStaticParams() {
  const paths = ROW_META.map((row) => ({
    row: row.id,
  }));
  paths.push({ row: 'random' });
  return paths;
}

interface PageProps {
  params: Promise<{ row: string }>;
}

export default function Page({ params }: PageProps) {
  return <GameScreen params={params} />;
}
