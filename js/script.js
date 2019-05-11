var data = [
  {
    title: '記事タイトル1',
    create_date: '2019-05-09',
    category: 'カテゴリー1',
    tag: ['タグ1','タグ2','タグ3']
  },
  {
    title: '記事タイトル2',
    create_date: '2019-05-09',
    category: 'カテゴリー1',
    tag: ['タグ1','タグ2','タグ3']
  }
];

var fragment = document.createDocumentFragment();//DOMの追加処理用のフラグメント


window.addEventListener('load',function () {

  for (var i = 0; i < data.length; i++) {
    var posts = document.getElementById('js-posts'),
    post = document.createElement('article'),
    post_data = document.createElement('div'),
    h2 = document.createElement('h2'),
    tags = document.createElement('ul');


    post.setAttribute('post');
    console.log(data[i].title);
  }
  
});