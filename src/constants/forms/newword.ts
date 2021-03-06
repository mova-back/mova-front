import IForm from './interfaceForm';

const NEWWORD_REQUIRED: IForm[] = [
  {
    id: 'wordname',
    name: 'wordname',
    type: 'text',
    placeholder: 'Увядзіце слова ці выраз',
    label: 'Новае слова ці выраз*',
    helperText: 'Абавязковае поле',
  },
  {
    id: 'meaning',
    name: 'meaning',
    type: 'text',
    placeholder: 'Увядзіце значэнне',
    label: 'Значэнне*',
    helperText: 'Абавязковае поле',
  },
];

const NEWWORD_NO_REQUIRED: IForm[] = [
  {
    id: 'extended_description',
    name: 'extended_description',
    type: 'text',
    placeholder: 'Увядзіце прыклад',
    label: 'Пашыранае апісанне',
    helperText: 'Уводзьце кірыліцу',
  },
  {
    id: 'usages',
    name: 'usages',
    type: 'text',
    placeholder: 'Столін',
    label: 'Дзе пачулі?',
    helperText: 'Уводзьце кірыліцу',
  },
  {
    id: 'tags',
    name: 'tags',
    type: 'text',
    placeholder: 'Пачніце пісаць тэг',
    label: 'Прастаўце тэгі падзяляючы коскамi',
    helperText: 'Уводзьце кірыліцу',
  },
];

export { NEWWORD_REQUIRED, NEWWORD_NO_REQUIRED };
