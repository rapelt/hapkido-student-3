export enum TechniquesStoreActions {
    Get = '[Techniques] GET_TECHNIQUES',
    InitializeState = '[Authentication] AUTH_INIT_STATE',
    resetState = '[Authentication] RESET_STATE',
    setPlaylist = '[Techniques] Set playlist',
    setTechniqueFilter = '[Techniques] Set Technique Filter',
    setUnLearnTechnique = '[Techniques] Set unlearnt technique',
    setLearntTechnique = '[Techniques] Set learn technique',
    setUnLearnTechniqueError = '[Techniques] Set unlearnt technique',
    setLearntTechniqueError = '[Techniques] Set learn technique',

    setFavourite = '[Techniques] Set as favourite',
    removeFavourite = '[Techniques] remove as favouite',
    setFavouriteError = '[Techniques] set as favourite error',
    removeFavouriteError = '[Techniques] remove as favourite error',

    updateViews = '[Media] update views',
    updateViewsError = '[Media] update views error',

    addQuestion = '[Question] add question',
    addQuestionError = '[Question] add question error',

    like = '[Question] like question',
    likeError = '[Question] like question error',
    removeLike = '[Question] remove like',
    removeLikeError = '[Question] remove like error',
}
