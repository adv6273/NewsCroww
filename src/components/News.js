import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
const api_key=process.env.REACT_APP_NEWS_API_KEY;

// const this.props.pageSize =this.props.pageSize;
export default class News extends Component {
  articles = [];
  static defaultProps ={
    country: "in",
    pageSize: 6,
    category:"general"
  }
  static propTypes={
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category :PropTypes.string

  }

  constructor() {
    super();
    // console.log("hi i am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page:1,
    };
  }
  async componentDidMount() {
    // console.log("cdm");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${api_key}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles,
    totalArticles: parsedData.totalResults ,

      loading:false
  });
  }
 handleNextClick= async ()=>{
    console.log("next");
  

      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${api_key}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`    ;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({ articles: parsedData.articles,
        page: this.state.page+1,
        loading:false
      })
    
    
  }
  handlePrevioudClick= async ()=>
  {
  let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${api_key}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`    ;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json();
  // console.log(parsedData);
  this.setState({ articles: parsedData.articles,
    page: this.state.page- 1,
    loading:false
   })
  
      // console.log("prev")
    }

  render() {
    return (
      <div className="container my-3 ">
        {/* <h1> .</h1> */}
          
        <h1 className="text-center" style={{ marginTop: "70px" }}> Top Headlines - {this.props.category}</h1>
        <div className="row my-3">
          { !this.state.loading &&  this.state.articles.map((element) => {
            // console.log(element)
            return (
              <div className="col-md-4  my-3 " key={element.url}>
                <NewsItem
                  // title={element.title===null?element.title: element.title.slice(0,45)}
                  title={element.title}
                  // description={element.description===null?element.description:  element.description.slice(0,88)}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  date={element.publishedAt}
                  author={element.author}
                  />
              </div>
            );
          })}
        </div>
          {  this.state.loading && <Spinner  />}
        <div className="container  d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-4" onClick={this.handlePrevioudClick}> &larr; Previous Page</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark mx-4" onClick={this.handleNextClick}>Next Page &rarr;</button>

        </div>
      </div>
    );
  }
}
