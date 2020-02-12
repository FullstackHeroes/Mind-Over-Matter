import React from "react";

const Article = ({ article }) => (
  <div className="articleFullDiv">
    <h4>{article.title}</h4>
    <h4>{article.url}</h4>
  </div>
);

export default Article;
