import ProSelector from '@/components/Table/ProSelector/ProSelector';

const proList = [
  'Sumail',
  'Miracle (smurf 6)',
  'TOPSON',
  'Parker',
  'Quinn',
  'Mikey',
  'Nisha (smurf 2)',
  'Abed',
  'Abed (smurf)',
];

export default function HomePage() {
  return (
    <main>
      <ProSelector proList={proList} />
    </main>
  );
}
