import { shallowMount } from '@vue/test-utils';
import DataTable from '@/components/DataTable';

const App = {
  name: 'App',
  template: '',
}

const testData = [
  {
    autor: ['Moore', 'Lloyd'],
    display_label: 'Everybody is a hero, a lover, a fool, a villain. Everybody has their story to tell.',
    legacy_pk: 5,
    text: {
      title: 'V for Vendetta',
      start_date: 1982,
      end_date: 1989,
    },
    key_word: [
      {
        stichwort: 'test1'
      },
      {
        stichwort: 'test2'
      },
    ]
  },
]

test('DataTable', () => {
  console.log('typeof App:', typeof App, 'App:', App);
  console.log('typeof DataTable:', typeof DataTable, 'App:', DataTable);
  console.log(shallowMount(App));
  const wrapper = shallowMount(DataTable, {
    propsData: {
      entries: testData,
    }
  });
  console.log(wrapper);
});
