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
    console.log("WHOO -", article);

    return (
      <div>
        {articles.map(article => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.article
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleList: () => dispatch(getArticleList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
