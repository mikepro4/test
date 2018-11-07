import * as _ from "lodash";
import axios from "axios";
import bud from "basic-instagram-user-details";
import ipp from "instagram-profile-picture";

import {
	SHOW_APP,
	SHOW_GRID,
	HIDE_GRID,
	LOAD_USER_DETAILS_SUCCESS,
	LOAD_IMAGE_SUCCESS,
	UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS
} from "./types";

/////////////////////////////////////////////////

export const showApp = () => dispatch => {
	dispatch({
		type: SHOW_APP,
	});
};

export const showGrid = () => dispatch => {
	dispatch({
		type: SHOW_GRID,
	});
};

export const hideGrid = () => dispatch => {
	dispatch({
		type: HIDE_GRID,
	});
};

/////////////////////////////////////////////////

export const fetchImageDetails = (id, i) => async dispatch => {
	const response = await axios.get(`https://www.instagram.com/p/${id}/?__a=1`);

	dispatch({
		type: LOAD_IMAGE_SUCCESS,
		payload: response.data.graphql.shortcode_media,
		imageId: id,
		i: i
	});
}

/////////////////////////////////////////////////

export const fetchUserDetails = () => async dispatch => {
	let userDetails = {}

	const followers = await bud("yeah_lenka", 'followers')
	const avatarUrl = await ipp.medium("yeah_lenka")

	dispatch({
		type: LOAD_USER_DETAILS_SUCCESS,
		payload: {
			followers: followers.data,
			avatarUrl: avatarUrl
		}
	});
}

/////////////////////////////////////////////////

export const loadAllDetails = (store) => async (dispatch, getState) => {
	// console.log(getState().app.imageUrls)
	// getState().app.imageUrls.map((image, i) => {
	//     return dispatch(fetchImageDetails(image.id, i))
	// })
}

/////////////////////////////////////////////////

export const updateTotalPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_PIXELS,
		pixels: px
	});
}

export const updateTotalScrolledPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_PIXELS,
		pixels: px
	});
}
