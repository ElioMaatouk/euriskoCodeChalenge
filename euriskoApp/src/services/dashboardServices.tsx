import * as OpResult from './base/operationResult';
import {extractError, requestFromServer} from './base/baseServices'
async function fetchArticles(data:{page:number, token:string}){
    let result = OpResult.failed('')
    try{
        const fetchArticlesReponse = await requestFromServer({
            token:data.token,
            body:undefined,
            headers:undefined,
            method:'GET',
            uri:`articles?page=${data.page}`
        })
        const responseBody = await fetchArticlesReponse.json()
        console.log(responseBody,'reponseBody.fetchArticles')
            if(responseBody.status == "OK") {
                result = OpResult.success(responseBody.response)
            } else {
                result = OpResult.failed(responseBody.message)
            }
    } catch(e) {
        console.log(e,'error.fetchArticles')
        result = OpResult.failed(e)
    }
    return result
}

export default {
    fetchArticles
}