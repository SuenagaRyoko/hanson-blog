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