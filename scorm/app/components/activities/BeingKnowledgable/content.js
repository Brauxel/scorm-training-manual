import fttp from './fttp.png';
import fttn from './fttn.png';
import fttb from './fttb.png';
import satellite from './satellite.png';
import wireless from './wireless.png';
import hfc from './hfc.png';

export const descriptions = [
  {
    key: 'fttpnb',
    title: 'FTTP/FTTN/FTTB',
    content: `
      <p>Fibre optic cable technology is capable of supporting high bandwidth. The fibre may run directly to the premise, building basements or to nodes / pillars in the neighbourhood.</p>
    `,
  },
  {
    key: 'hfc',
    title: 'HFC',
    content: `
      <p>Hybrid Fibre Coaxial will utilise and upgrade the existing pay TV cables.</p>
    `,
  },
  {
    key: 'wireless',
    title: 'Fixed wireless',
    content: `
      <p>Fixed wireless transmits data at fast speeds using radio signals sent from fixed transmission towers or base stations to communicate ‘over the air’ with <span class="nbnMention">nbn</span>™ supplied equipment in the home or business.</p>
    `,
  },
  {
    key: 'satellite',
    title: 'Satellite',
    content: `
      <p>Used mainly in rural or remote areas, satellite equipment is installed in the home or business in order to transmit and receive data via a satellite orbiting the Earth.</p>
    `,
  },
];

export const technologies = [
  {
    key: 'fttp',
    icon: fttp,
    description: 'fttpnb',
    caption: 'Fibre to the premise (FTTP)',
  },
  {
    key: 'fttn',
    icon: fttn,
    description: 'fttpnb',
    caption: 'Fibre to the node (FTTN)',
  },
  {
    key: 'fttb',
    icon: fttb,
    description: 'fttpnb',
    caption: 'Fibre to the basement (FTTB)',
  },
  {
    key: 'hfc',
    icon: hfc,
    description: 'hfc',
    caption: 'Hybrid Fibre Coaxial (HFC)',
  },
  {
    key: 'wireless',
    icon: wireless,
    description: 'wireless',
    caption: 'Fixed wireless',
  },
  {
    key: 'satellite',
    icon: satellite,
    description: 'satellite',
    caption: 'Satellite',
  },
];
