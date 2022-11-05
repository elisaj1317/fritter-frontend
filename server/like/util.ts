import type {HydratedDocument} from 'mongoose';
import type {Like, PopulatedFreetLike, PopulatedCommentLike} from './model';
import type {PopulatedFreet} from '../freet/model';
import type {PopulatedComment} from '../comment/model';

/**
 * Return the liked object from a raw Like object.
 *
 * @param {HydratedDocument<Like>} like - A like object
 * @returns {PopulatedFreet} - The freet object associated with the like
 */
const getPopulatedFreetFromLike = (like: HydratedDocument<Like>): PopulatedFreet => {
  const likeCopy: PopulatedFreetLike = {
    ...like.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return likeCopy.likedObject;
};

/**
 * Return the liked object from a raw Like object.
 *
 * @param {HydratedDocument<Like>} like - A like object
 * @returns {PopulatedComment} - The comment object associated with the like
 */
 const getPopulatedCommentFromLike = (like: HydratedDocument<Like>): PopulatedComment => {
  const likeCopy: PopulatedCommentLike = {
    ...like.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return likeCopy.likedObject;
};

export {
  getPopulatedFreetFromLike,
  getPopulatedCommentFromLike
};

