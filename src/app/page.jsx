import ProSelector from '@/components/Table/ProSelector/ProSelector';

const proList = ['Sumail', 'Miracle', 'Topson'];

export default function HomePage() {
  return (
    <main>
      <ProSelector proList={proList} />
    </main>
  );
}
