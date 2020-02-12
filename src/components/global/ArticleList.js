import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleList } from "../../store";
import Article from "./Article";

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticleList();
  }

  render() {
    const { articles } = this.props;
    console.log("WHOO -", articles);

    return (
      <div className="articleListFullDiv">
        {articles && articles.length ? (
          articles.map((article, idx) => (
            <Article key={article.id} article={article} idx={idx + 1} />
          ))
        ) : (
          <p>Come Back Later</p>
        )}
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
