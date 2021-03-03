const initState = {
    posts: [],
    post: null,
    repository: null,
    isLoading: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.data,
                repository: null,
                isLoading: false
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts: [action.data, ...state.posts]
            }
        case 'UPDATE_LIKES':
            const postId = action.data.id;
            const updateLikes = action.data.likes;
            let post = state.posts.find(post => post._id === postId);
            let postIndex = state.posts.findIndex(post => post._id === postId);
            post.likes = [...updateLikes];
            const update = [...state.posts];
            update[postIndex] = post;
            return {
                ...state,
                posts: update,
                isLoading: false
            }
        case 'REMOVE_POST':
            const IdDelete = action.data;
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== IdDelete),
                isLoading: false
            }
        case 'GET_POST_BY_ID': 
        return {
            ...state,
            repository: action.data,
            isLoading: false
        }
        case 'ADD_COMMENT':
            const post_Id = action.data.id;
            const updateComments = action.data.comment;
            let post_ = state.posts.find(post => post._id === post_Id);
            let post_Index = state.posts.findIndex(post => post._id === post_Id);
            post_.comments = [...updateComments];
            const update_ = [...state.posts];
            update_[post_Index] = post_;
            return {
                ...state,
                posts: update_,
                repository: post_,
                isLoading: false
            }
        default: return state;
    }
}

export default reducer;