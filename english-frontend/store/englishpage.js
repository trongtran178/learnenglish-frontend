export const state = () => ({
    Lessons: null,
    ListVocabularyInLesson: null,
    isLoginSuccess: false,
    userLogin: null
});

export const getters = {
    
}; 
export const mutations =  {
    setLessons(state, value) {
        state.Lessons = value;
    },
    setListVocabularyInLesson(state, value) {
        state.ListVocabularyInLesson = value;
    },
    setLoginSuccess(state, value) {
        state.isLoginSuccess = value;
    },
    setUserLogin(state, value) {
        state.userLogin = value;
    }
}

