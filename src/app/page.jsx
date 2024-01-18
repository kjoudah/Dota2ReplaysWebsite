import ProSelector from '@/components/ProSelector/ProSelector';

// TODO: dynamically get this list
const proList = [
  {
    label: 'Safelane',
    players: [
      { label: 'Yatoro', value: ['Yatoro', 'Yatoro (smurf)'] },
      { label: 'Butterfly', value: ['Butterfly'] }
    ],
  },
  {
    label: 'Mid',
    players: [
      { label: 'Sumail', value: ['Sumail, Sumail (smurf)'] },
      {
        label: 'Miracle',
        value: [
          'Miracle',
          'Miracle (smurf)',
          'Miracle (smurf 2)',
          'Miracle (smurf 3)',
          'Miracle (smurf 4)',
          'Miracle (smurf 5)',
          'Miracle (smurf 6)',
        ],
      },
      { label: 'TOPSON', value: ['TOPSON'] },
      { label: 'Parker', value: ['Parker'] },
      { label: 'Quinn', value: ['Quinn', 'Quinn (smurf)'] },
      { label: 'w33', value: ['w33'] },
      { label: 'Mikey', value: ['Mikey'] },
      {
        label: 'Nisha',
        value: [
          'Nisha',
          'Nisha (smurf)',
          'Nisha (smurf 2)',
          'Nisha (smurf 3)',
          'Nisha (smurf 4)',
        ],
      },
      { label: 'Abed', value: ['Abed', 'Abed (smurf)'] },
    ],
  },
  {
    label: 'Offlane',
    players: [{ label: 'Collapse', value: ['Collapse'] }],
  },
];

export default function HomePage() {
  return (
    <main>
      <ProSelector proList={proList} />
    </main>
  );
}
