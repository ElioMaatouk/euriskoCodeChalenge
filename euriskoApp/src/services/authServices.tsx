import * as OpResult from './base/operationResult';
import {extractError, requestFromServer} from './base/baseServices'
async function Login(data:{username:string, password:string}){
    let result = OpResult.failed('')
    try{
        const loginReponse = await requestFromServer({
            token:undefined,
            body:JSON.stringify(data),
            headers:undefined,
            method:'POST',
            uri:`auth/signin`
        })
        const responseBody = await loginReponse.json()
        console.log(responseBody,'reponseBody.login')
        if(responseBody.statusCode == 401){
            result = OpResult.failed(extractError(responseBody.message))
        }else {
            if(responseBody.statusCode == 500) {
                result = OpResult.failed(extractError(responseBody.message))
            } else {
                result = OpResult.success(responseBody)
            }
        }
    } catch(e) {
        console.log(e,'error.login')
        result = OpResult.failed(e)
    }
    return result
}

export default {
    Login
}