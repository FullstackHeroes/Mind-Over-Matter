import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleList } from "../../store";
import Article from "./Article";

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticleList();
  }

  componentDidUpdate() {
    if (!this.props.articles.length) this.props.getArticleList();
  }

  render() {
    const { articles } = this.props;

    return (
      <div className="articleListFullDiv">
        <h3 className="articleHeader">
          Come check out some top{" "}
          <span className="articleHeaderSpot">Mental Health</span> articles!
        </h3>

        {articles && articles.length ? (
          articles.map((article, idx) => (
            <Article key={article.id} article={article} idx={idx + 1} />
          ))
        ) : (
          <p>Sorry, please come back later</p>
        )}

        {articles && articles.length ? (
          <p className="articleCredit">
            Thanks and credits to <strong>Science Daily</strong>
          </p>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.article.articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleList: () => dispatch(getArticleList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
