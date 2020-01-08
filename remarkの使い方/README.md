class: center, middle

# remarkの使い方

---

## remarkとは

マークダウンで書けるシンプルなHTMLスライドショーツール

<https://github.com/gnab/remark>

---

## remark入門 - テンプレート

textareaにマークダウンを書く

```html
<!DOCTYPE html>
<html>
  <head><!-- ... --></head>
  <body>
    <textarea id="source">
      <!-- ここにマークダウンを書く -->
      # Hello
      これは例です
    </textarea>
    <script src="https://remarkjs.com/downloads/remark-latest.min.js">
    </script>
    <script>
      var slideshow = remark.create();
    </script>
  </body>
</html>
```

---

# Hello
これは例です

---

## &lt;head&gt;&lt;/head&gt;の中身

主にCSSが記載されている

```html
<head>
  <title>Title</title>
  <meta charset="utf-8">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz);
    @import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic);
    @import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700,400italic);

    body { font-family: 'Droid Serif'; }
    h1, h2, h3 {
      font-family: 'Yanone Kaffeesatz';
      font-weight: normal;
    }
    .remark-code, .remark-inline-code { font-family: 'Ubuntu Mono'; }
  </style>
</head>
```

---

## マークダウンを別ファイルにする

`sourceUrl` を明示的に指定すると可能

```js
const slideshow = remark.create({
  sourceUrl: 'README.md'
});
```

---

## ローカル環境での確認方法

サーバー経由じゃないと正常に動作しない

　→ ローカル環境にサーバーを立てる必要がある

---

### 解決策：簡易サーバーを立ち上げる

#### Pythonを利用すれば簡単にできる

```sh
python3 -m http.server 8000
```

#### 以下のURLから確認できる

<http://localhost:8000/>
