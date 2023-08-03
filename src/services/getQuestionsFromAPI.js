async function fetchQuestionsFromAPI(apiParams) {

    const {amount, difficulty, type, category} = apiParams


    let amountProp = ''
    let diffProp = ''
    let typeProp = ''
    let categoryProp = ''
    if (amount !== '') {
        amountProp = `amount=${amount}`
    }
    if (category !== '') {
        categoryProp = `&category=${category}`
    }
    if (difficulty !== '') {
        diffProp = `&difficulty=${difficulty}`
    }
    if (type !== '') {
        typeProp = `&type=${type}`
    }

    let apiURL = `https://opentdb.com/api.php?${amountProp}${categoryProp}${diffProp}${typeProp}`

    return await fetch(apiURL).then(res => res.json()).then(data => data.results)
}

export default fetchQuestionsFromAPI;