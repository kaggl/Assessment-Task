import { mount, createLocalVue, Wrapper, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue';

const App = {
  name: 'App',
  template: '<div />',
}

console.log(DataTable)

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
  const wrapper = mount(DataTable, {
    // props: {
    //   entries: testData,
    // }
  });
  console.log(wrapper);
});
