
export default {
  /**
   * Handle color button
   *
   * @param {object} post
   * @public
   */
  verifyUserLiked(post) {
    return post.user_liked ? 'primary' : 'secondary';
  }
}