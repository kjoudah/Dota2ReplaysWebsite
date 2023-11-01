import ProSelector from '@/components/ProSelector/ProSelector';

const proList = [
  {
    label: 'Safelane',
    players: [{ label: 'Yatoro', value: 'Yatoro' }],
  },
  {
    label: 'Mid',
    players: [
      { label: 'Sumail', value: 'Sumail' },
      { label: 'Miracle (smurf 6)', value: 'Miracle (smurf 6)' },
      { label: 'TOPSON', value: 'TOPSON' },
      { label: 'Parker', value: 'Parker' },
      { label: 'Quinn', value: 'Quinn' },
      { label: 'Mikey', value: 'Mikey' },
      { label: 'Nisha (smurf 2)', value: 'Nisha (smurf 2)' },
      { label: 'Abed', value: 'Abed' },
    ],
  },
  {
    label: 'Offlane',
    players: [{ label: 'Collapse', value: 'Collapse' }],
  },
];

export default function HomePage() {
  return (
    <main>
      <ProSelector proList={proList} />
    </main>
  );
}
