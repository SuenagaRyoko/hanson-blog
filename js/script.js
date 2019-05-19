var data = [
  {
    title: '記事タイトル1',
    create_date: '2019-05-09',
    category: {'category0':'カテゴリー1'},
    tag: {
      tag0: 'タグ1',
      tag1: 'タグ2',
      tag2: 'タグ3'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    title: '記事タイトル2',
    create_date: '2019-05-09',
    category: {'category1':'カテゴリー2'},
    tag: {
      tag0: 'タグ1',
      tag1: 'タグ2',
      tag2: 'タグ3'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    title: '記事タイトル3',
    create_date: '2019-05-09',
    category: {'category2':'カテゴリー3'},
    tag: {
      tag0: 'タグ1',
      tag1: 'タグ2',
      tag3: 'タグ4'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\nテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\nテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\nテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\nテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\n'
  },
  {
    title: '記事タイトル4',
    create_date: '2019-05-09',
    category: {'category0':'カテゴリー1'},
    tag: {
      tag0: 'タグ1',
      tag2: 'タグ3',
      tag4: 'タグ5'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    title: '記事タイトル5',
    create_date: '2019-05-09',
    category: {'category1':'カテゴリー2'},
    tag: {
      tag0: 'タグ1',
      tag1: 'タグ2',
      tag4: 'タグ5'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    title: '記事タイトル6',
    create_date: '2019-05-09',
    category: {'category2':'カテゴリー3'},
    tag: {
      tag0: 'タグ1',
      tag1: 'タグ2',
      tag4: 'タグ5'
    },
    contents: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  }
];

window.addEventListener('DOMContentLoaded',function () {
  create_node(data);

  window.addEventListener('hashchange',function () {

    var hash = location.hash,
    show_post = document.getElementById('js-post-detail'),
    hide_posts = document.querySelectorAll('.post:not(#js-post-detail)'),
    overray = document.getElementById('js-overray');

    var detail_fragment = document.createDocumentFragment(),
    detail_create_data = document.querySelector('#js-create-data'),
    detail_category = document.querySelector('#js-category'),
    detail_title = document.querySelector('#js-title'),
    detail_tags = document.querySelector('#js-tags'),
    detail_contents = document.querySelector('#js-contents');

    if (hash.indexOf("data") > 0 ) {
      var index = hash.replace('#data','');
      detail_title.appendChild(document.createTextNode(data[index].title));
      detail_create_data.appendChild(document.createTextNode(data[index].create_date));
      detail_category.appendChild(document.createTextNode(data[index].category));
      detail_contents.appendChild(document.createTextNode(data[index].contents));

      for (tag_i in data[index].tag) {
        var taglink = document.createElement('li'),
        taglink_a = document.createElement('a');

        taglink.setAttribute('class','taglink');

        taglink_a.appendChild(document.createTextNode(data[index]["tag"][tag_i]));
        taglink.appendChild(taglink_a);
        detail_fragment.appendChild(taglink);
      }

      detail_tags.appendChild(detail_fragment);

      for (var i = 0; i < hide_posts.length; i++) {
          hide_posts[i].classList.add('fadeout');
      };

      show_post.classList.add('show-detail');
      overray.classList.remove('hide-overay');
      overray.classList.add('show-overray');

    }else if(hash == '#top') {

      show_post.classList.remove('show-detail');
      overray.classList.add('hide-overay');
      overray.classList.remove('show-overray');

      for (var i = 0; i < hide_posts.length; i++) {
        hide_posts[i].classList.remove('fadeout');
      };

      detail_create_data.removeChild(detail_create_data.lastChild);
      detail_category.removeChild(detail_category.lastChild);
      detail_contents.removeChild(detail_contents.lastChild);
      deleteNode(detail_title);
      deleteNode(detail_tags);

      return;

    }else if(hash.indexOf('cat') > 0) {
      var postList = document.querySelector("#js-posts"),
      cats = hash.split('_'),
      list = articleFilter(cats[1],"category");
      deleteNode(postList);
      create_node(list);
    }else if(hash.indexOf('tag') > 0) {
      var postList = document.querySelector("#js-posts"),
      tags = hash.split('_'),
      list = articleFilter(tags[1],"tag");
      deleteNode(postList);
      create_node(list);
    }


  });

});

function create_node(filter) {

  var fragment = document.createDocumentFragment(),
  posts = document.getElementById('js-posts');

  for (var i = 0; i < filter.length; i++) {
    var post = document.createElement('article'),
    a = document.createElement('a'),
    post_data = document.createElement('div'),
    h2 = document.createElement('h2'),
    create_data = document.createElement('div'),
    category = document.createElement('div'),
    tags = document.createElement('ul');

    post.setAttribute('id','post' + i);
    post.setAttribute('class','post');
    post_data.setAttribute('class','post-data');
    a.setAttribute('href','#data' + i);
    create_data.setAttribute('class','create-data');
    category.setAttribute('class','category');
    tags.setAttribute('class','tags');

    var catname = "";
    for(cat in filter[i].category){
      catname = filter[i].category[cat];
      break;
    }

    create_data.appendChild(document.createTextNode(filter[i].create_date));
    category.appendChild(document.createTextNode(catname));
    h2.appendChild(document.createTextNode(filter[i].title));

    for (tag_i in filter[i].tag) {
      var taglink = document.createElement('li'),
      taglink_a = document.createElement('a');

      taglink.setAttribute('class','taglink');
      taglink_a.appendChild(document.createTextNode(filter[i]["tag"][tag_i]));
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

}

function deleteNode(ele){
  if (ele.hasChildNodes()){
    while (ele.childNodes.length > 0){
      ele.removeChild(ele.lastChild);
    }
  }
}

function articleFilter(param,content){
  var result = [];
  for(var i = 0;i<data.length;i++){
    if(param in data[i][content]){
      result.push(data[i]);
    }
  }
  return result;
}