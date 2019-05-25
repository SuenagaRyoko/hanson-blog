// 記事表示用のデータ
var data = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

  // 記事一覧を表示し、記事画面表示のイベントを登録
  create_node(data);
  article_set_click();

  // ハッシュが変更されたら処理を実行
  window.addEventListener('hashchange',function () {
    var hash = location.hash,//ハッシュ
    posts = document.querySelector("#js-posts"),
    detail_fragment = document.createDocumentFragment(),//DOM追加時のフラグメント
    append_detail = {//値追加用のDOMを取得
      create_date: document.querySelector('#js-create-data'),
      category: document.querySelector('#js-category'),
      title: document.querySelector('#js-title'),
      tags: document.querySelector('#js-tags'),
      contents: document.querySelector('#js-contents')
    };

    if (hash.indexOf("data") > 0 ) {

      var index = hash.replace('#data_','');//ハッシュから数字部分を取得

      // append_detailのプロパティ分、値の追加処理を行う
      for (var node in append_detail) {

        // カテゴリー出力の処理
        if (node == "category") {

          for (var cat in data[index][node]) {
            append_detail[node].setAttribute('href', '#cat_' + cat);
            append_detail[node].appendChild(document.createTextNode(data[index].category[cat]));
          }
          continue;

        // タグ出力の処理
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

        // append_detailの要素に値を出力
        append_detail[node].appendChild(document.createTextNode(data[index][node]));
      }
      // フェードインアニメーションの実行
      detail_fadein();

    // カテゴリを選択した場合の処理
    }else if(hash.indexOf('cat') > 0) {

      // データのフィルタリング
      var cats = hash.replace('#cat_',''),
      data_list = filter_post(cats,'category');

      // 記事一覧を削除し、フィルタリングしたデータを表示
      delete_node(posts);
      create_node(data_list);
      article_set_click();

      // 記事詳細をフェードアウト
      detail_fadeout();

      // 記事詳細の表示データを削除
      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    // タグを選択した場合の処理
    }else if(hash.indexOf('tag') > 0) {

      // データのフィルタリング
      var tags = hash.replace('#tag_',''),
      data_list = filter_post(tags,"tag");

      // 記事一覧を削除し、フィルタリングしたデータを表示
      delete_node(posts);
      create_node(data_list);
      article_set_click();

      // 記事詳細をフェードアウト
      detail_fadeout();

      // 記事詳細の表示データを削除
      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    // サイト名のBLOGのリンクをクリックした場合の処理
    }else if(hash == '#all'){

      // 記事一覧を削除し、フィルタリングしたデータを表示
      delete_node(posts);
      create_node(data);
      article_set_click();

      // 記事詳細をフェードアウト
      detail_fadeout();

      // 記事詳細の表示データを削除
      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    // 記事詳細画面から一覧画面に戻る場合の処理
    }else if(hash == '#top') {

      // 記事詳細をフェードアウト
      detail_fadeout();

      // 記事詳細の表示データを削除
      for (var node in append_detail) {
        delete_node(append_detail[node]);
      }

    }


  });

});

// DOMの生成
function create_node(filter_data) {

  var fragment = document.createDocumentFragment(),//DOM追加時のフラグメント
  posts = document.getElementById('js-posts');//記事を追加するN要素

  for (var i = 0; i < filter_data.length; i++) {
    // 要素の生成
    var post = document.createElement('article'),
    a = document.createElement('a'),
    post_data = document.createElement('div'),
    h2 = document.createElement('h2'),
    create_data = document.createElement('div'),
    category = document.createElement('div'),
    category_a = document.createElement('a');
    tags = document.createElement('ul');

    // 属性の追加
    post.setAttribute('id','post' + filter_data[i].id);
    post.setAttribute('class','post');
    post_data.setAttribute('class','post-data');
    create_data.setAttribute('class','create-data');
    category.setAttribute('class','category');
    tags.setAttribute('class','tags');

    // 日付・タイトルのデータを出力
    create_data.appendChild(document.createTextNode(filter_data[i].create_date));
    h2.appendChild(document.createTextNode(filter_data[i].title));

    // カテゴリの生成
    for (var cat in filter_data[i].category) {
      category_a.setAttribute('href','#cat_' + cat);
      category_a.appendChild(document.createTextNode(filter_data[i].category[cat]));
      category.appendChild(category_a);
    }

    // タグリストの生成
    for (var tag_i in filter_data[i].tag) {
      var taglink = document.createElement('li'),
      taglink_a = document.createElement('a');

      taglink.setAttribute('class','taglink');
      taglink_a.setAttribute('href','#tag_' + tag_i);

      taglink_a.appendChild(document.createTextNode(filter_data[i]["tag"][tag_i]));
      taglink.appendChild(taglink_a);
      tags.appendChild(taglink);
    }

    // DOMの階層構造を生成
    post_data.appendChild(create_data);
    post_data.appendChild(category);

    a.appendChild(post_data);
    a.appendChild(h2);
    a.appendChild(tags);
    post.appendChild(a);
    posts.appendChild(post);
    fragment.appendChild(post);

  }

  // DOMの出力
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

// 記事にhash変更のクリックイベントを登録する
function article_set_click() {
  var post_ele = document.querySelectorAll('.post'),//記事一覧の要素を取得
  post_id;

  // 記事一覧の要素にハッシュ変更のイベントを登録
  for (var post_i = 0; post_i < post_ele.length; post_i++) {
    post_ele[post_i].addEventListener('click',function (e) {
      // ハッシュを変更して、ページトップまでスクロール
      set_hash(e);
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
function filter_post(param,content){
  var filter = [];
  for (var i = 0;i<data.length;i++) {
    if(param in data[i][content]) {
      filter.push(data[i]);
    }
  }
  return filter;
}

// ハッシュを変更する
function set_hash(e) {
  var post_id = e.currentTarget.getAttribute('id');
  post_id = post_id.replace('post','');
  location.hash = '#data_' + post_id;
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