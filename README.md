# Chrome Bookmark Extension with Full Text Search of Bookmarked Pages

A bookmark extension that saves the content of the page as well as the link. Find bookmarked pages by doing a full text search of page content in the Chrome omnibox: just type `bm+tab` in the omnibox and start searching. Bookmark pages by clicking the extension icon or use the keyboard shortcut for the extension: `shift+alt+b`.

![Screenshot](./screenshot.png)

# Building

```Shell
yarn build
```

Preps the extension for deployment. Output files are in the `./dist` folder and should be loaded into chrome as an unpacked extension in developer mode.

# Motivation

A proof of concept to learn more about chrome extensions and WebSQL. I've always wanted to index every page I visit like [https://worldbrain.io/](https://worldbrain.io/) and this seemed like a fun way to explore some of the concepts and possibilities.

# Implementation and Usage Notes

Implemented using WebSQL and it's native full text search implementation: FTS3 - which is the version of free text search available in SQLite when the WebSQL specification was frozen.

The FTS3 implementation lacks native support for relevancy ranking so the provided results are not always satisfying. But you can use the full syntax supported by FTS3. So for example, you can enter a complex query like:

`("sqlite database" OR "sqlite library")`

or do partial matching with:

`sq*`

# Future Directions

Implement a ranking mechanism using term and document frequencies: either directly or perhaps using a library like [YDN-DB Full Text Search](https://yathit.github.io/ydn-db/doc/full-text/index.html). Or maybe I'll just look to help out with the `worldbrain` project.
