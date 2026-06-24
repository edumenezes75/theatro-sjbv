import type { Metadata } from 'next';
import Moderacao from '@/components/Moderacao';

export const metadata: Metadata = {
  title: 'Moderação',
  robots: { index: false, follow: false },
};

export default function ModeracaoPage() {
  return <Moderacao />;
}
