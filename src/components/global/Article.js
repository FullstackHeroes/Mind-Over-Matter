import React from "react";

const Article = ({ article }) => (
  <div className="articleFullDiv">
    <a href={article.url}>{article.title}</a>
  </div>
);

export default Article;
