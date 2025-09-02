import { ItemListI } from '../components/shared/itemList';

const homeNavegation: ItemListI[] = [
  {
    label: 'All Notes',
    icon: 'home',
    path: '/',
  },
  {
    label: 'Archived Notes',
    icon: 'archived',
    path: '/archived',
  },
];

const tagsNavegation: ItemListI[] = [
  {
    label: 'React',
    icon: 'tags',
    path: '/dsdsd',
  },
  {
    label: 'Javascript',
    icon: 'tags',
    path: '/archived',
  },
];

export { homeNavegation, tagsNavegation };
