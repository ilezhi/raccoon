export const toolbar: Toolbar = {
  'bold': {
    prefix: '**',
    subfix: '**',
    text: '粗体'
  },
  'italic': {
    prefix: '*',
    subfix: '*',
    text: '斜体'
  },
  'header1': {
    prefix: '# ',
    subfix: '',
    text: '一级标题'
  },
  'header2': {
    prefix: '## ',
    subfix: '',
    text: '二级标题'
  },
  'header3': {
    prefix: '### ',
    subfix: '',
    text: '三级标题'
  },
  'header4': {
    prefix: '#### ',
    subfix: '',
    text: '四级标题'
  },
  'header5': {
    prefix: '##### ',
    subfix: '',
    text: '五级标题'
  },
  'header6': {
    prefix: '###### ',
    subfix: '',
    text: '六级标题'
  },
  'underline': {
    prefix: '++',
    subfix: '++',
    text: '下划线'
  },
  'strikethrough': {
    prefix: '~~',
    subfix: '~~',
    text: '中划线'
  },
  'mark': {
    prefix: '==',
    subfix: '==',
    text: '标记'
  },
  'alignleft': {
    prefix: '::: hljs-left\n\n',
    subfix: '\n\n:::\n',
    text: '居左'
  },
  'aligncenter': {
    prefix: '::: hljs-center\n\n',
    subfix: '\n\n:::\n',
    text: '居中'
  },
  'alignright': {
    prefix: '::: hljs-right\n\n',
    subfix: '\n\n:::\n',
    text: '居右'
  },
  'quote': {
    prefix: '> ',
    subfix: '',
    text: '段落引用'
  },
  'ol': {
    prefix: '1. ',
    subfix: '',
    text: ''
  },
  'ul': {
    prefix: '- ',
    subfix: '',
    text: ''
  },
  'link': {
    prefix: '[文本](',
    subfix: ')',
    text: '链接'
  },
  'imageLink': {
    prefix: '![图片描述](',
    subfix: ')',
    text: '添加图片链接'
  },
  'code': {
    prefix: '```',
    subfix: '\n\n```\n',
    text: 'language'
  },
  'table': {
    prefix: '',
    subfix: '',
    text: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
  }
};
