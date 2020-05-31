import React, { Component } from "react";
import axios from "axios";
import "./Styles.css";
import moment from "moment";
// import { Router, Route, Switch } from "react-router";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: [],
    };
    this.cancel = "";
  }
  componentDidMount() {
    const searchUrl = `http://hn.algolia.com/api/v1/search?tags=front_page`;
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.hits.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results.Please check network",
          });
        }
      });
  }

  handleInputChange = (event) => {
    console.log("what's the serach term in search.js", event.target.value);
    let query = event.target.value;
    this.setState({
      query: this.state.query,
    });
    /* search url */
    const searchUrl = `https://hn.algolia.com/api/v1/search?query=${query}`;
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        console.log("response", res.data.hits);
        const resultNotFoundMsg = !res.data.hits.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results.Please check network",
          });
        }
      });
  };

  render() {
    return (
      <div className='container'>
        <div className='searchboxdiv'>
          <div className='orange p-2'>
            <div className='row'>
              <div className='col-lg-2 '>
                <h5 className='username'>Welcome, Eviilraj</h5>
              </div>
              <div className='col-lg-10 '>
                <div className='input-group mb-2'>
                  <div className='input-group-prepend'>
                    <div className='input-group-text'>
                      <i className='fas fa-search search-icon'></i>
                    </div>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    id='inlineFormInputGroup'
                    placeholder='Search stories by title, url or author'
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='resultdisplaydiv p-3'>
          {this.state.results.map((results, index) => {
            return (
              <div key={index}>
                <h6>
                  {results.title}(
                  <a className='titleLink' href={results.url}>
                    {results.url}
                  </a>
                  )
                </h6>

                <a
                  href={`https://news.ycombinator.com/item?id=${results.objectID}`}>
                  {results.points} points, |{" "}
                </a>
                <a
                  href={`https://news.ycombinator.com/user?id=${results.author}`}>
                  {results.author} |{" "}
                </a>
                <a
                  href={`https://news.ycombinator.com/item?id=${results.objectID}`}>
                  {moment(results.created_at).fromNow()} |
                </a>
                <small>
                  {" "}
                  <a
                    href={`https://news.ycombinator.com/item?id=${results.objectID}`}>
                    {results.num_comments} comments
                  </a>{" "}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
