import React, { Component } from "react";
import NewItem from "./NewItem";

export class News extends Component {
  articles = [
    // Dummy data for initial rendering
  ];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true, // Set loading to true initially
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=75978c3488c243829540d152a3e89075";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    // Update the state with the articles from API response
    this.setState({ articles: parseData.articles, loading: false });
  }

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="container my-3">
        <h2>New Top Headlines</h2>
        {loading && <p>Loading...</p>}
        <div className="row">
          {articles.length === 0 && !loading && <p>No articles found.</p>}
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewItem
                title={element.title ? element.title.slice(0, 25) : " "}
                description={
                  element.description ? element.description.slice(0, 88) : " "
                }
                imageUrl={element.urlToImage || "default_image_url_here"} // Add a default image URL if needed
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
