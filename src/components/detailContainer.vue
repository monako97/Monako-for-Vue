<template>
  <main class="detail-container">
    <figure>
      <img class="detailBg" :src="$route.query.bg" ref="detailBg">
    </figure>
    <article v-html="this.readme"></article>
  </main>
</template>

<script>
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
export default {
  data() {
    return {
      readme: 'loading...',
    };
  },
  created(){
    var readme = require('../public/md/Java学习笔记.md'),
        hljs = require('highlight.js');
        this.readme = require("markdown-it")({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code class="plaintext">' +
                hljs.highlight(lang, str, true).value +
                "</code></pre>"
              );
            } catch (__) {}
          }
          return (
            '<pre class="hljs"><code class="plaintext">' +
            this.readme.utils.escapeHtml(str) +
            "</code></pre>"
          );
        }
      })
      .use(markdownItAnchor,{
        permalink: true,
        permalinkBefore: true, 
        permalinkSymbol: '§',
      })
      .use(markdownItTocDoneRight)
      .render(readme);
  },
  mounted(){
    this.$refs.detailBg.onload = function(){
      let _self = this;
      // 加载完成之后需要500ms刷新时间
      let timer = setTimeout(function(){
        _self.style.opacity = 0.1;
        clearTimeout(timer);
      },500);
    };
  }
};
</script>
<style lang="scss">
.detail-container {
  figure {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    .detailBg {
      width: auto;
      height: auto;
      opacity: 0;
      filter: blur(25px);
      transition: opacity 0.5s;
    }
  }
  article {
    margin: 100px auto 70px;
    max-width: 1000px;
    .header-anchor{
      color: rgba(176, 139, 227, 0.5);
    }
    .table-of-contents{
      max-width: 350px;
      position: fixed;
      right: 0;
      margin: 110px auto 0;
      border-bottom-left-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px 10px #58526015;
      padding: 10px; 
      transform: translateX(0);
      transition: all 0.5s ease-in;
      border-left: 10px solid rgba(233, 136, 124, 1);
      ol{
        li{
          list-style-type:none;
          a{
            color: #5FA1F2;
            font-size: 12.5px;
          }
        }
      }
      ol:first-child{
        padding-left: 0px;
      }
    }
    a:hover,ol li a:hover{
        color: rgba(233, 136, 124, 1);
    }
    sup{
      background: rgba(121, 206, 237, 0.8);
      color: #fff;
      font-size: 12px;
      padding: 2px 4px;
      border-radius: 4px;
      cursor: pointer;
    }
    p{
      img{
        display: block;
        width: 100%;
        max-width: 793px;
        margin: auto;
      }
    }
    
    h1,h2,h3,h4 {
      color: #111111;
      font-weight: 400;
      margin-top: 1em;
    }
    h1,h2,h3,h4,h5,p,dl {
      margin-bottom: 16px;
      padding: 0;
    }
    h1 {
      font-size: 48px;
      line-height: 54px;
    }
    h2 {
      font-size: 36px;
      line-height: 42px;
    }
    h1,h2 {
      border-bottom: 1px solid #efeaea;
      padding-bottom: 10px;
    }
    h3 {
      font-size: 24px;
      line-height: 30px;
    }
    h4 {
      font-size: 21px;
      line-height: 26px;
    }
    h5 {
      font-size: 18px;
      list-style: 23px;
    }
    
    ul,ol {
      padding: 0;
      padding-left: 24px;
      margin: 0;
    }
    li {
      line-height: 24px;
      list-style: inherit;
    }
    p,ul,ol {
      font-size: 14px;
    }

    pre {
      line-height: 1.7em;
      overflow: auto;
      padding: 6px 10px;
      border-left: 5px solid rgba(233, 136, 124, 1);
    }

    pre > code {
      border: 0;
      display: inline;
      max-width: initial;
      padding: 0;
      margin: 0;
      overflow: initial;
      line-height: inherit;
      font-size: 0.85em;
      white-space: pre;
      background: 0 0;
    }
    aside {
      display: block;
      float: right;
      width: 390px;
    }
    blockquote {
      border-left: 0.5em solid #eee;
      padding: 0 0 0 2em;
      margin-left: 0;
    }
    blockquote cite {
      font-size: 14px;
      line-height: 20px;
      color: #bfbfbf;
    }
    blockquote cite:before {
      content: "\2014 \00A0";
    }

    blockquote p {
      color: #666;
    }
    hr {
      text-align: left;
      color: #999;
      height: 2px;
      padding: 0;
      margin: 16px 0;
      background-color: #e7e7e7;
      border: 0 none;
    }

    dl {
      padding: 0;
    }

    dl dt {
      padding: 10px 0;
      margin-top: 16px;
      font-size: 1em;
      font-style: italic;
      font-weight: bold;
    }

    dl dd {
      padding: 0 16px;
      margin-bottom: 16px;
    }

    dd {
      margin-left: 0;
    }
    button,input,select,textarea {
      font-size: 100%;
      margin: 0;
      vertical-align: baseline;
      *vertical-align: middle;
    }
    button,input {
      line-height: normal;
      *overflow: visible;
    }
    button::-moz-focus-inner,input::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
    button,input[type="button"],input[type="reset"],input[type="submit"] {
      cursor: pointer;
      -webkit-appearance: button;
    }
    input[type="checkbox"],input[type="radio"] {
      cursor: pointer;
    }
    input:not([type="image"]),textarea {
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }

    input[type="search"] {
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }
    input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    label,input,select,textarea {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: normal;
      line-height: normal;
      margin-bottom: 18px;
    }
    input[type="checkbox"],input[type="radio"] {
      cursor: pointer;
      margin-bottom: 0;
    }
    input[type="text"],input[type="password"],textarea,select {
      display: inline-block;
      width: 210px;
      padding: 4px;
      font-size: 13px;
      font-weight: normal;
      line-height: 18px;
      height: 18px;
      color: #808080;
      border: 1px solid #ccc;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }
    select,input[type="file"] {
      height: 27px;
      line-height: 27px;
    }
    textarea {
      height: auto;
    }
    :-moz-placeholder {
      color: #bfbfbf;
    }
    ::-webkit-input-placeholder {
      color: #bfbfbf;
    }
    input[type="text"],input[type="password"],select,textarea {
      -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
      -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
      transition: border linear 0.2s, box-shadow linear 0.2s;
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    input[type="text"]:focus,input[type="password"]:focus,textarea:focus {
      outline: none;
      border-color: rgba(82, 168, 236, 0.8);
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(82, 168, 236, 0.6);
      -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(82, 168, 236, 0.6);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
    button {
      display: inline-block;
      padding: 4px 14px;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 18px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),0 1px 2px rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),0 1px 2px rgba(0, 0, 0, 0.05);
      background-color: #0064cd;
      background-repeat: repeat-x;
      background-image: -khtml-gradient(
        linear,
        left top,
        left bottom,
        from(#049cdb),
        to(#0064cd)
      );
      background-image: -moz-linear-gradient(top, #049cdb, #0064cd);
      background-image: -ms-linear-gradient(top, #049cdb, #0064cd);
      background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0%, #049cdb),color-stop(100%, #0064cd));
      background-image: -webkit-linear-gradient(top, #049cdb, #0064cd);
      background-image: -o-linear-gradient(top, #049cdb, #0064cd);
      background-image: linear-gradient(top, #049cdb, #0064cd);
      color: #fff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
      border: 1px solid #004b9a;
      border-bottom-color: #003f81;
      -webkit-transition: 0.1s linear all;
      -moz-transition: 0.1s linear all;
      transition: 0.1s linear all;
      border-color: #0064cd #0064cd #003f81;
      border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    }
    button:hover {
      color: #fff;
      background-position: 0 -15px;
      text-decoration: none;
    }
    button:active {
      -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
        0 1px 2px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
        0 1px 2px rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15),
        0 1px 2px rgba(0, 0, 0, 0.05);
    }
    button::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
    
    table {
      border-spacing: 0;
      width: 100%;
      border: solid rgba(233, 137, 124, 0.8) 1px;
      -moz-border-radius: 8px;
      -webkit-border-radius: 8px;
      border-radius: 8px;
    }
    table tr:hover {
      background: #fbf8e9e5;
      -o-transition: all 0.1s ease-in-out;
      -webkit-transition: all 0.1s ease-in-out;
      -moz-transition: all 0.1s ease-in-out;
      -ms-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
    }
    table td,
    .table th {
      border-left: 1px solid rgba(233, 137, 124, 0.8);
      border-top: 1px solid rgba(233, 137, 124, 0.8);
      padding: 10px;
    }
    table th {
      background-color: #E9887C;
      border: none;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
      padding: 10px;
      color: #fff;
    }

    table td:first-child,
    table th:first-child {
      border-left: none;
    }

    table th:first-child {
      -moz-border-radius: 6px 0 0 0;
      -webkit-border-radius: 6px 0 0 0;
      border-radius: 6px 0 0 0;
    }
    table th:last-child {
      -moz-border-radius: 0 6px 0 0;
      -webkit-border-radius: 0 6px 0 0;
      border-radius: 0 6px 0 0;
    }
    table th:only-child {
      -moz-border-radius: 6px 6px 0 0;
      -webkit-border-radius: 6px 6px 0 0;
      border-radius: 6px 6px 0 0;
    }
    table tr:last-child td:first-child {
      -moz-border-radius: 0 0 0 6px;
      -webkit-border-radius: 0 0 0 6px;
      border-radius: 0 0 0 6px;
    }
    table tr:last-child td:last-child {
      -moz-border-radius: 0 0 6px 0;
      -webkit-border-radius: 0 0 6px 0;
      border-radius: 0 0 6px 0;
    }
    .hljs-comment,
    .hljs-quote {
      color: #655f6d;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #be4678;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #aa573c;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #2a9292;
    }
    .hljs-title,
    .hljs-section {
      color: #576ddb;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #955ae7;
    }
    .hljs-deletion,
    .hljs-addition {
      color: #19171c;
      display: inline-block;
      width: 100%;
    }
    .hljs-deletion {
      background-color: #be4678;
    }
    .hljs-addition {
      background-color: #2a9292;
    }
    .hljs {
      display: block;
      overflow-x: auto;
      background: #efecf4;
      color: #585260;
      padding: 0.6em;
      border-radius: 4px;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: bold;
    }
  }
  @media (max-width: 1110px) {
    article {
      margin: 100px 55px;
      .table-of-contents{
        transform: translateX(calc(100% - 10px));
        transition: transform 0.3s ease-in;
      }
      .table-of-contents:hover{
        transform: translateX(0);
      }
    }
  }
  @media (max-width: 880px) {
    article {
      margin: 100px 55px;
    }
  }
  @media (max-width: 700px) {
    article {
      margin: 100px 55px;
    }
  }
  @media (max-width: 580px) {
    article {
      margin: 100px 20px;
    }
  }
}
</style>
