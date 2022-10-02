import axios from "axios";
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,

  }
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // props are read only we can't change it 
  //state can be change
  constructor(props) {
    super(props);
    // console.log("constructr");
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
 
  async updateNews() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e64b989f5aa74d02ace6793c8049822a&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    .then((response) => {
        this.setState({
          articles: response.data.articles,
          totalResults: response.data.totalResults,
          loading: false
        });
        this.props.setProgress(100);
      })

  }
  async componentDidMount() {
       this.updateNews();
  }

  // handlePrevClick = () => {
  //   console.log("Prev");
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }
  // handleNextClick = () => {
  //   console.log("next");
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }
  fetchMoreData= async()=>{
    this.setState({ page: this.state.page + 1 });
    axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e64b989f5aa74d02ace6793c8049822a&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    .then((response) => {
      this.setState({
        articles: this.state.articles.concat(response.data.articles),
        totalResults: response.data.totalResults,
    
      });
    })
   

  }
  render() {
    return (
      // <div className="container my-3">
      <>
        <h1 className="text-center" style={{ margin: '30px' }}>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} Headliness</h1>
       {this.state.loading && <Spinner />} 
        {/* <div className="container d-flex justify-content-between" style={{ marginBottom: "27px" }}>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        <InfiniteScroll style={{padding:"12px"}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {
            this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newUrl={element.url}
                  publishedAt={element.publishedAt}
                  author={element.author}
                  source={element.source.name} />
              </div>
            })
          }
        </div>
        </div>
      </InfiniteScroll>
     
</>
    );
  }
}
