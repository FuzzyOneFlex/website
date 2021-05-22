import React, {Component} from 'react';

class Widget extends Component {

    state = {
        blogs: []
    }
    componentDidMount () {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@fuzzy-one')
        .then(resp => resp.json())
        .then(blogs => this.setState({blogs}))
     
        }
        render() {
            return(
                
            <BlogEntry>{this.state.blogs.items}</BlogEntry>
        )}

}

const BlogEntry = props => {
    console.log("asd",props)

    return (
        <div>
        {/* {props.children.map(({ author, title, content, link }) => (
            <div key={title} href={link} target={"_blank"}>
              {title()}
            </div>
          ))} */}
          </div>
        // <ol>
        //   {props.children.map((child) => (<li>{child}</li>))}
        // </ol>
      );
    //     <div className="blog">
    //          <h1 className="blog-title">{props.children}</h1>
    //         {/* <div className="blog-description">
    //             {props.entry.description.slice(0,200).replace(/<.*>/g, '')}
    //             <a className="blog-link" 
    //             target= "_blank" 
    //             rel="noopener noreferrer" 
    //             href={props.entry.link}>
    //             </a>
    //         </div>
    //         <div className="blog-categories-container">
    //             <ul className="blog-categories">
    //                 {props.entry.categories.map(category => <BlogCategory key={"asd"}
    //                 category={category} />)}
    //             </ul>
    //         </div> */}
    //     </div>
    // )
}

const BlogCategory = props => {

    return(
        <li className="blog-category">{props.category.toUpperCase()}</li>
    )
}

export default Widget;