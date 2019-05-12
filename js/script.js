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
  },
  {
    title: '記事タイトル2',
    create_date: '2019-05-09',
    category: 'カテゴリー1',
    tag: ['タグ1','タグ2','タグ3']
  },
  {
    title: '記事タイトル2',
    create_date: '2019-05-09',
    category: 'カテゴリー1',
    tag: ['タグ1','タグ2','タグ3']
  },
  {
    title: '記事タイトル2',
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

var fragment = document.createDocumentFragment();


window.addEventListener('DOMContentLoaded',function () {
  var posts = document.getElementById('js-posts');

  for (var i = 0; i < data.length; i++) {
    var post = document.createElement('article'),
    a = document.createElement('a'),
    post_data = document.createElement('div'),
    h2 = document.createElement('h2'),
    create_data = document.createElement('div'),
    category = document.createElement('div'),
    tags = document.createElement('ul');

    post.setAttribute('class','post');
    post_data.setAttribute('class','post-data');
    a.setAttribute('href','#post' + i);
    create_data.setAttribute('class','create-data');
    category.setAttribute('class','category');
    tags.setAttribute('class','tags');

    h2.appendChild(document.createTextNode(data[i].title));
    create_data.appendChild(document.createTextNode(data[i].create_date));
    category.appendChild(document.createTextNode(data[i].category));

    for (var tag_i = 0; tag_i < data[i].tag.length; tag_i++) {
      var taglink = document.createElement('li'),
      taglink_a = document.createElement('a');

      taglink.setAttribute('class','taglink');

      taglink_a.appendChild(document.createTextNode(data[i].tag[tag_i]));
      taglink.appendChild(taglink_a);
      tags.appendChild(taglink);
    }


    post_data.appendChild(create_data);
    post_data.appendChild(category);

    a.appendChild(post_data);
    a.appendChild(h2);
    a.appendChild(tags);
    post.appendChild(a);
    posts.appendChild(post);
    fragment.appendChild(post);

  }
  
  posts.appendChild(fragment);

  window.addEventListener('hashchange',function () {
    var hash = location.hash;
    console.log(hash);
    
  });

});