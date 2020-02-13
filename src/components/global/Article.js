import React from "react";

const Article = ({ article, idx }) => (
  <div className="articleFullDiv">
    <h4 className="articleListText">
      {idx}.&nbsp;&nbsp;&nbsp;
      <a href={article.url} target="_blank" className="articleListText">
        {article.title.length > 85
          ? `${article.title.slice(0, 85)}...`
          : article.title}
      </a>
    </h4>
  </div>
);

export default Article;
