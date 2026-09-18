import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content, image } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        {image ? <img alt={title} src={image} style={{ maxWidth: '100%' }} /> : null}
        <p>{content}</p>
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
