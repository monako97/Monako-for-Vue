<link rel="stylesheet" href="../../../../Library/Application Support/abnerworks.Typora/themes/base.user.css">
<template>
  <main class="detail-container">
    <img ref="bg" class="bg-blur" :src="$route.query.bg" alt="">
    <article v-html="md"></article>
  </main>
</template>
<script>
import hljs from 'highlight.js';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import markdownItSup from 'markdown-it-sup';
import markdownItMark from 'markdown-it-mark';
export default {
  data() {
    return {
      md: 'loading...',
    };
  },
  created(){
    let md = require(`../assets/md/${this.$route.params.id}.md`);
    this.md = require("markdown-it")({
        html: true,
        linkify: false,
        typographer: true,
        highlight: function(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code class="plaintext">' +
                hljs.highlight(lang, str, true).value +
                "</code></pre>"
              );
            } catch (e) {}
          }
          return (
            '<pre class="hljs"><code class="plaintext">' +
            this.md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        }
      })
      .use(markdownItSup)
      .use(markdownItMark)
      .use(markdownItAnchor,{
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
      })
      .use(markdownItTocDoneRight)
      .render(md);
      md = null;
  },
  mounted(){
    let times = setInterval(() => {
      if (document.readyState === 'complete') {
        this.$refs.bg.style.opacity = '0.1';
        window.clearInterval(times);
        times = null;
      }
    }, 500);
  },
  destroyed(){
    
  }
};
</script>
<style lang="scss">
.detail-container {
  >.bg-blur{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: -1;
    transition: opacity .5s;
    opacity: 0;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(25px);
  }
  >article {
    margin: 100px auto 70px;
    max-width: 1000px;
    .header-anchor{
      color: rgba(176, 139, 227, 0.5);
    }
    .table-of-contents{
      max-width: 350px;
      max-height: 75%;
      overflow-y: auto;
      position: fixed;
      left: 0;
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
      background: #ffffff;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.11);
      padding: 10px;
      transform: translateX(0);
      transition: transform 0.5s;
      border-right: 10px solid rgba(233, 136, 124, 1);
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
        padding-left: 0;
      }
    }
    a:hover,ol li a:hover{
        color: rgba(233, 136, 124, 1);
    }
    mark{
      padding: 2px 4px;
      font-size: 90%;
      color: #E9887C;
      background-color: #f9f2f4;
      border-radius: 4px;
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
      color: rgb(17, 17, 17);
      font-weight: 500;
      margin-top: 1em;
    }
    h1,h2,h3,h4,h5,p,dl {
      margin-bottom: 16px;
      padding: 0;
    }
    h1 {
      font-size: 1.6em;
      line-height: 54px;
    }
    h2 {
      font-size: 1.5em;
      line-height: 42px;
    }
    h1,h2 {
      border-bottom: 1px solid rgb(239, 234, 234);
      padding-bottom: 10px;
    }
    h3 {
      font-size: 1.4em;
      line-height: 30px;
    }
    h4 {
      font-size: 1.3em;
      line-height: 26px;
    }
    h5 {
      font-size: 1.2em;
      list-style: none;
    }

    ol {
      padding: 0 0 0 24px;
      margin: 0;
    }
    p,ul,ol {
      font-size: 14px;
    }

    pre {
      line-height: 1.7em;
      overflow-x: auto;
      padding: 6px 10px;
      border-left: 5px solid rgb(233, 136, 124);
    }

    pre > code {
      color: rgb(88, 82, 96);
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
      border-left: 0.5em solid rgb(238, 238, 238);
      padding: 0 0 0 2em;
      margin-left: 0;
    }
    blockquote cite {
      font-size: 14px;
      line-height: 20px;
      color: rgb(191, 191, 191);
    }
    blockquote cite:before {
      content: "\2014 \00A0";
    }

    blockquote p {
      color: rgb(102, 102, 102);
    }
    hr {
      text-align: left;
      color: rgb(153, 153, 153);
      height: 2px;
      padding: 0;
      margin: 16px 0;
      background-color: rgb(231, 231, 231);
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
      box-sizing: content-box;
    }

    input[type="search"] {
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
      color: rgb(128, 128, 128);
      border: 1px solid rgb(204, 204, 204);
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
      transition: border linear 0.2s, box-shadow linear 0.2s;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    input[type="text"]:focus,input[type="password"]:focus,textarea:focus {
      outline: none;
      border-color: rgba(82, 168, 236, 0.8);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
    button {
      display: inline-block;
      padding: 4px 14px;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 18px;
      border-radius: 4px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),0 1px 2px rgba(0, 0, 0, 0.05);
      background-color: rgb(0, 100, 205);
      background-repeat: repeat-x;
      background-image: linear-gradient(to top, #049cdb, #0064cd);
      color: #fff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
      border: 1px solid;
      transition: 0.1s linear all;
      border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #004b9a;
    }
    button:hover {
      color: #fff;
      background-position: 0 -15px;
      text-decoration: none;
    }
    button:active {
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
      border: solid rgba(233, 137, 124, 0.5) 0.5px;
      border-radius: 6px;
      overflow: hidden;
    }
    table tr:hover {
      background: #fbf8e9c5;
      transition: all 0.1s ease-in-out;
    }
    table td,
    .table th {
      border-left: solid rgba(233, 137, 124, 0.3) 0.1px;
      padding: 10px;
    }
    table th {
      background-color: rgba(233, 137, 124, 1);
      padding: 10px;
      color: #fff;
    }

    table td:first-child,
    table th:first-child {
      border-left: none;
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
      overflow: auto;
      background: #f7f7f7;
      color: #585260;
      padding: 0.6em;
    }
    .hljs::-webkit-scrollbar{
      height: 8px;
      display: block;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: bold;
    }
  }
  @media (max-width: 1450px) {
    >article {
      margin: 100px auto;
      .table-of-contents{
        transform: translateX(calc(-100% + 10px));
      }
      .table-of-contents:hover{
        transform: translateX(0);
      }
    }
  }
  @media (max-width: 1110px) {
    >article {
      margin: 100px 55px;
    }
  }
  @media (max-width: 880px) {
    >article {
      margin: 100px 55px;
    }
  }
  @media (max-width: 700px) {
    >article {
      margin: 100px 55px;
    }
  }
  @media (max-width: 580px) {
    >article {
      margin: 100px 20px;
    }
  }
}
</style>
