
export class UserService {


    getAUser(id) {
        return fetch(`https://backend.missingpets.art/user/userDetail/${id}`).then(res => res.json()).then(d => d.data);
    }
    

}
