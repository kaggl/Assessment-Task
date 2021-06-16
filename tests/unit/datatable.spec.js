import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue';
import router from '@/router';

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
/*
test('DataTable', () => {
  const wrapper = shallowMount(DataTable, {
    propsData: { entries: testData },
    stubs: ['router-link', 'router-view'],
  });

  console.log(wrapper);
});
*/
test('Search', () => {
  const wrapper = shallowMount(Search);

  console.log(wrapper);
});
