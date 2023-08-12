import React, { Component } from 'react'

export default class NewsItem extends Component {
  
  render() {
    let {title,description,imageurl,newsurl,date,author}=this.props;
    return (
      <div className='my-3 '>
        {/* This is news item under the component News. */}
        <div className="card" style={{width: ''}}>
  {/* <img src={imageurl} className="card-img-top" alt: "https://picsum.photos/200/300 " /> */}
  {/* <img src={imageurl==='null'?'https://picsum.photos/536/354' : imageurl} className="card-img-top" /> */}
  <img src={imageurl === null ? 'https://picsum.photos/536/354' : imageurl} className="card-img-top" alt='Nothing interesting' />
  {/* <img src={ imageurl} className="card-img-top" alt='Nothing interesting' /> */}


  <div className="card-body">
    <h4 className="card-title">{ title}<b>...</b></h4>
    <p className="card-text">{description}...</p>
    <h5>By {author===null?'Unkown':author} on {date.slice(0,10)} at </h5>
    <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
