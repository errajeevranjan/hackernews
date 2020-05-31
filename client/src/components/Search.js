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
        <div class='searchboxdiv'>
          <div class='orange p-2'>
            <div class='row'>
              <div class='col-lg-2 '>
                <h5 className='username'>Welcome, Eviilraj</h5>
              </div>
              <div class='col-lg-10 '>
                <div class='input-group mb-2'>
                  <div class='input-group-prepend'>
                    <div class='input-group-text'>
                      <i className='fas fa-search search-icon'></i>
                    </div>
                  </div>
                  <input
                    type='text'
                    class='form-control'
                    id='inlineFormInputGroup'
                    placeholder='Search stories by title, url or author'
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='resultdisplaydiv'>
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

                <small>{results.points} points, | </small>
                <a href={results.author}>{results.author} | </a>
                <small>{moment(results.created_at).fromNow()} |</small>
                <small>
                  {" "}
                  <a href={results.num_comments}>
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
