export const state = () => ({
    Lessons: null,
    ListVocabularyInLesson: null,
    isLoginSuccess: false,
    userLogin: null,
    openChallengeDialog: false,
    openChallengeWithComputerRoomDialog: false,
    vocabulariesChallenge: null,
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
    },
    setChallengeDialog(state, value) {
        state.openChallengeDialog = value;
    },
    setChallengeWithComputerRoomDialog(state, value) {
        state.openChallengeWithComputerRoomDialog = value;
    },
    setVocabulariesChallenge(state, value) {
        state.vocabulariesChallenge = value;
    }
}

