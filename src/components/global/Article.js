import React from "react";

const Article = ({ article, idx }) => (
  <div className="articleFullDiv">
    <h4 className="articleListText">
      {idx}.{" "}
      <a href={article.url} className="articleListText">
        {article.title.length > 85
          ? `${article.title.slice(0, 85)}...`
          : article.title}
      </a>
    </h4>
  </div>
);

export default Article;
