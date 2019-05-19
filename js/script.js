// 記事表示用のデータ
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

// DOM(htmlの要素)が読み込まれたら処理を実行
window.addEventListener('DOMContentLoaded',function () {
  // urlにハッシュが含まれていない場合#topをつける
  if (!location.hash) {
    location.href = '#top';
  }

  // 記事一覧を表示
  create_node(data);
  article_set_click();

  window.addEventListener('hashchange',function () {

    var hash = location.hash,
    detail_fragment = document.createDocumentFragment(),
    append_detail = {
      create_date: document.querySelector('#js-create-data'),
      category: document.querySelector('#js-category'),
      title: document.querySelector('#js-title'),
      tags: document.querySelector('#js-tags'),
      contents: document.querySelector('#js-contents')
    };

    if (hash.indexOf("data") > 0 ) {

      var index = hash.replace('#data','');

      for (var node in append_detail) {

        if (node == "category") {
          var category_a = document.createElement('a');

          for (var cat in data[index][node]) {
            category_a.setAttribute('href', '#cat_' + cat);

            category_a.appendChild(document.createTextNode(data[index].category[cat]));
            append_detail[node].appendChild(category_a);
          }
          continue;

        }else if (node == "tags") {

          for (var tag_i in data[index].tag) {
            var taglink = document.createElement('li'),
            taglink_a = document.createElement('a');
    
            taglink.setAttribute('class','taglink');
            taglink_a.setAttribute('href','#tag_' + tag_i);
    
            taglink_a.appendChild(document.createTextNode(data[index]["tag"][tag_i]));
            taglink.appendChild(taglink_a);
            detail_fragment.appendChild(taglink);
          }
          append_detail[node].appendChild(detail_fragment);
          continue;

        }
        append_detail[node].appendChild(document.createTextNode(data[index][node]));
        
      }
      
      detail_fadein();

    }else if(hash.indexOf('cat') > 0) {

      var postList = document.querySelector("#js-posts"),
      cats = hash.split('_'),
      list = article_filter(cats[1],"category");

      delete_node(postList);
      create_node(list);
      article_set_click();

      detail_fadeout();

      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    }else if(hash.indexOf('tag') > 0) {

      var postList = document.querySelector("#js-posts"),
      tags = hash.split('_'),
      list = article_filter(tags[1],"tag");

      delete_node(postList);
      create_node(list);
      article_set_click();

      detail_fadeout();

      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    }else if(hash == '#top') {


      detail_fadeout();

      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    }


  });

});

// 要素の生成
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
    category_a = document.createElement('a');
    tags = document.createElement('ul');

    post.setAttribute('id','post' + i);
    post.setAttribute('class','post');
    post_data.setAttribute('class','post-data');
    create_data.setAttribute('class','create-data');
    category.setAttribute('class','category');
    tags.setAttribute('class','tags');

    create_data.appendChild(document.createTextNode(filter[i].create_date));
    h2.appendChild(document.createTextNode(filter[i].title));

    for (var cat in filter[i].category) {
      category_a.setAttribute('href','#cat_' + cat);
      category_a.appendChild(document.createTextNode(filter[i].category[cat]));
      category.appendChild(category_a);
    }

    for (var tag_i in filter[i].tag) {
      var taglink = document.createElement('li'),
      taglink_a = document.createElement('a');

      taglink.setAttribute('class','taglink');
      taglink_a.setAttribute('href','#tag_' + tag_i);
      
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

// 要素の削除
function delete_node(ele){
  if (ele.hasChildNodes()){
    while (ele.childNodes.length > 0){
      ele.removeChild(ele.lastChild);
    }
  }
}

function article_set_click() {
  // 記事がクリックされた時に、
  var post_ele = document.querySelectorAll('.post'),
  post_id;

  for (var post_i = 0; post_i < post_ele.length; post_i++) {
    post_ele[post_i].addEventListener('click',function () {
      post_id = this.getAttribute('id');
      post_id = post_id.replace('post','');
      location.hash = '#data' + post_id;
      scroll_top();
    });
  }
}

// 詳細ページのフェードインアニメーション
function detail_fadein() {
  var hide_posts = document.getElementById('js-posts'),
  show_post = document.getElementById('js-post-detail');

  hide_posts.classList.add('fadeout');
  show_post.classList.add('show-detail');

}

// 詳細ページのフェードアウトアニメーション
function detail_fadeout() {
  var hide_posts = document.getElementById('js-posts'),
  show_post = document.getElementById('js-post-detail');

  hide_posts.classList.remove('fadeout');
  show_post.classList.remove('show-detail');

}

// カテゴリやタグごとにフィルタリング
function article_filter(param,content){
  var result = [];
  for (var i = 0;i<data.length;i++) {
    if(param in data[i][content]) {
      result.push(data[i]);
    }
  }
  return result;
}

// ページトップへスクロール
function scroll_top() {
  var currentY = window.pageYOffset;
  var duration = 200;
  var step = duration / currentY > 1 ? 10 : 100;
  var timeStep = duration / currentY * step;
  var intervalID = setInterval(scrollUp, timeStep);
  function scrollUp(){
    currentY = window.pageYOffset;
    if(currentY === 0) {
    clearInterval(intervalID);
    } else {
    scrollBy( 0, -step );
    }
  }
}