import React, { Component } from 'react'

export default class NewsItem extends Component {
    
   
    
    render() {
      let { title, description, imageUrl,newUrl,publishedAt,author,source } = this.props;//object destructuring
      //let lastName = person.lastName; 
 return (
    <div>
    <div className="card" >
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{
    left: '90%' ,zIndex: '1'}}>
    {source}
    </span>
    <img src={!imageUrl?"https://c.ndtvimg.com/2022-08/6dcj3c1o_rishi-sunak_625x300_19_August_22.jpg":imageUrl} className="card-img-top" alt="..." />
    <div className="card-body">
    <h5 className="card-title">{title}....</h5>
    <p className="card-text">{description}.....</p>
    <p className="card-text"><small className="text-muted"> By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()} </small></p>
    <a href={newUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
    </div>
    </div>

</div>
        )
    }
}
